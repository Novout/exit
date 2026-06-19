import { useIAStore } from "../store/ia";
import { getNewCity } from "../defines/player";
import { ARCHETYPE_WEIGHTS, ARCHETYPES } from "../defines/bot";
import { random } from "../utils";
import type {
  Bot,
  BotArchetype,
  BotDifficulty,
  BotState,
  City,
  UnitBattleAcc,
} from "../types";

const DIFFICULTY_AGGRESSIVENESS: Record<BotDifficulty, number> = {
  easy: 0.5,
  medium: 1.0,
  hard: 1.4,
};

const DIFFICULTY_STARTING_RESOURCES: Record<BotDifficulty, { wood: number; stone: number; military: number }> = {
  easy:   { wood: 150, stone:  75, military: 1 },
  medium: { wood: 300, stone: 150, military: 1 },
  hard:   { wood: 600, stone: 350, military: 2 },
};

type BotAction = "build_military" | "build_economy" | "recruit_units" | "recover";

export const useBotAI = () => {
  const IA = useIAStore();

  // 1. Aggressiveness curve — passive early game, escalates over time; scaled by difficulty
  const aggressiveness = (tick: number, archetype: BotArchetype): number => {
    const phase =
      tick < 200 ? "passive" : tick < 600 ? "active" : "aggressive";
    const base: Record<BotArchetype, number> = {
      militarist: 0.8,
      economist: 0.2,
      colonizer: 0.4,
      balanced: 0.5,
    };
    const multiplier: Record<string, number> = {
      passive: 0.5,
      active: 1.0,
      aggressive: 1.4,
    };
    const difficultyScale = DIFFICULTY_AGGRESSIVENESS[IA.difficulty];
    return Math.min(1, base[archetype] * multiplier[phase] * difficultyScale);
  };

  // 2. Threat score — combines military delta, proximity, and attack history
  const threatScore = (bot: Bot, target: Bot): number => {
    const militaryDelta = target.city.military.level - bot.city.military.level;
    const dx = target.islandX - bot.islandX;
    const dy = target.islandY - bot.islandY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const history = bot.attacksReceived.filter(
      (a) => a.from === target.id,
    ).length;
    return militaryDelta * 0.4 + (1 / dist) * 0.35 + history * 0.25;
  };

  // 3. Adaptive army — adjusts composition based on the target's defenses
  const adaptiveArmy = (bot: Bot, targetCity?: City): UnitBattleAcc => {
    const base = bot.city.soldiers;
    const spearman = base.find((s) => s.type === "spearman")?.units ?? 0;
    const archer = base.find((s) => s.type === "archer")?.units ?? 0;
    const hoplita = base.find((s) => s.type === "hoplita")?.units ?? 0;
    const catapult = base.find((s) => s.type === "catapult")?.units ?? 0;
    const mech = base.find((s) => s.type === "mech")?.units ?? 0;

    let _catapult = catapult;
    let _hoplita = hoplita;
    let _spearman = spearman;

    if (targetCity) {
      const targetWall = targetCity.wall.level;
      const targetArchers =
        targetCity.soldiers.find((s) => s.type === "archer")?.units ?? 0;

      // High wall → prioritize catapults to breach it
      if (targetWall >= 3) _catapult = Math.max(catapult, 3);
      // Many archers in target → bring hoplites (priority flag absorbs ranged)
      if (targetArchers > 20) _hoplita = Math.min(hoplita + 5, 30);
    }

    // Defensive posture: fortifying/recovering bots keep more spearmen behind wall
    if (bot.state === "fortifying" || bot.state === "recovering") {
      _spearman = Math.max(spearman, 10);
    }

    return {
      wall: Math.max(1, bot.city.wall.level),
      mech: Math.floor(mech),
      catapult: Math.floor(_catapult),
      archer: Math.floor(archer),
      hoplita: Math.floor(_hoplita),
      spearman: Math.floor(_spearman),
    };
  };

  // 4. FSM — resolve state transition based on current conditions
  const resolveFSMTransition = (bot: Bot): BotState => {
    const recentAttacks = bot.attacksReceived.filter(
      (a) => IA.tick - a.tick < 100,
    ).length;

    switch (bot.state) {
      case "expanding":
        if (recentAttacks > 0) return "fortifying";
        break;
      case "fortifying":
        if (bot.city.military.level >= 3 && bot.stateTicks > 50)
          return "attacking";
        if (recentAttacks === 0 && bot.stateTicks > 80) return "expanding";
        break;
      case "attacking":
        if (bot.unitLossRatio > 0.5) return "recovering";
        break;
      case "recovering":
        if (bot.unitLossRatio < 0.2) return "expanding";
        break;
    }
    return bot.state;
  };

  // 5. Utility AI — score each possible action and pick the highest
  const pickAction = (bot: Bot, tick: number): BotAction => {
    const agg = aggressiveness(tick, bot.archetype);
    const woodRatio = bot.city.cityhall.wood.acc / bot.city.cityhall.wood.maxAcc;
    const stoneRatio =
      bot.city.cityhall.stone.acc / bot.city.cityhall.stone.maxAcc;
    const economyRatio = (woodRatio + stoneRatio) / 2;

    const militaryMultiplier =
      bot.state === "attacking" || bot.state === "fortifying" ? 1.5 : 0.8;
    const recruitMultiplier =
      bot.state === "attacking" || bot.state === "fortifying" ? 1.5 : 0.5;

    const scores: Record<BotAction, number> = {
      build_economy: bot.weights.build_economy * (1 - economyRatio),
      build_military: bot.weights.build_military * agg * militaryMultiplier,
      recruit_units: bot.weights.attack * agg * recruitMultiplier,
      recover: bot.state === "recovering" ? 1.5 : 0,
    };

    return (Object.entries(scores) as [BotAction, number][]).reduce((a, b) =>
      b[1] > a[1] ? b : a,
    )[0];
  };

  const applyAction = (bot: Bot, action: BotAction): void => {
    // Easy bots have a 40% chance to idle each tick — they progress slower
    if (IA.difficulty === "easy" && Math.random() < 0.4) return;

    const MAX_LEVEL = 5;

    switch (action) {
      case "build_economy":
        if (bot.city.storage.level < MAX_LEVEL) bot.city.storage.level++;
        else if (bot.city.tavern.level < MAX_LEVEL) bot.city.tavern.level++;
        else if (bot.city.market.level < MAX_LEVEL) bot.city.market.level++;
        break;

      case "build_military":
        if (bot.city.military.level < MAX_LEVEL) bot.city.military.level++;
        else if (bot.city.wall.level < MAX_LEVEL) bot.city.wall.level++;
        break;

      case "recruit_units": {
        const cap = 5 + bot.city.military.level * 3;
        const army = adaptiveArmy(bot);
        bot.city.soldiers = bot.city.soldiers.map((s) => {
          if (s.type === "spearman")
            return { ...s, units: Math.min(s.units + Math.ceil(army.spearman / 4), cap * 6) };
          if (s.type === "archer")
            return { ...s, units: Math.min(s.units + Math.ceil(army.archer / 4), cap * 6) };
          if (s.type === "hoplita")
            return { ...s, units: Math.min(s.units + Math.ceil(army.hoplita / 4), cap * 3) };
          if (s.type === "catapult")
            return { ...s, units: Math.min(s.units + 1, cap) };
          if (s.type === "mech")
            return { ...s, units: Math.min(s.units + 0.3, Math.floor(cap / 3)) };
          return s;
        });
        break;
      }

      case "recover":
        bot.unitLossRatio = Math.max(0, bot.unitLossRatio - 0.05);
        break;
    }
  };

  // Evaluate if this bot should launch an invasion against the player
  const canInvadePlayer = (bot: Bot, tick: number): boolean => {
    if (bot.state !== "attacking") return false;
    if (IA.pendingBotAttack !== null) return false;

    const agg = aggressiveness(tick, bot.archetype);
    const totalUnits = bot.city.soldiers.reduce((sum, s) => sum + s.units, 0);
    const hasArmy = totalUnits >= 10;
    const roll = Math.random();

    return hasArmy && roll < agg * bot.weights.attack * 0.15;
  };

  // Full tick for one bot
  const botTick = (bot: Bot): void => {
    const newState = resolveFSMTransition(bot);
    if (newState !== bot.state) {
      bot.state = newState;
      bot.stateTicks = 0;
    } else {
      bot.stateTicks++;
    }

    const action = pickAction(bot, IA.tick);
    applyAction(bot, action);

    if (canInvadePlayer(bot, IA.tick)) {
      IA.pendingBotAttack = bot.id;
    }
  };

  // Initialize bots from the world state after world.create()
  const init = (
    islands: {
      x: number;
      y: number;
      cities: { owner?: string; name?: string }[];
    }[],
    difficulty: BotDifficulty = "medium",
  ): void => {
    IA.bots = [];
    IA.tick = 0;
    IA.difficulty = difficulty;

    const res = DIFFICULTY_STARTING_RESOURCES[difficulty];

    islands.forEach((island) => {
      island.cities.forEach((city) => {
        if (!city.owner?.startsWith("bot-")) return;

        const archetype = random(ARCHETYPES) as BotArchetype;
        const botCity = getNewCity();
        botCity.cityhall.wood.acc = res.wood;
        botCity.cityhall.stone.acc = res.stone;
        botCity.military.level = res.military;

        IA.bots.push({
          id: city.owner,
          name: city.name ?? city.owner,
          archetype,
          state: "expanding",
          weights: { ...ARCHETYPE_WEIGHTS[archetype] },
          city: botCity,
          islandX: island.x,
          islandY: island.y,
          attacksReceived: [],
          unitLossRatio: 0,
          stateTicks: 0,
        });
      });
    });
  };

  // Advance all bots one tick — call from game loop every N seconds
  const advance = (): void => {
    IA.tick++;
    IA.bots.forEach((bot) => botTick(bot));
  };

  // Register that a bot was attacked by the player (triggers FSM reaction)
  const registerAttack = (botId: string): void => {
    const bot = IA.bots.find((b) => b.id === botId);
    if (!bot) return;
    bot.attacksReceived.push({ from: "player", tick: IA.tick });
  };

  // Consume the pending invasion and return the attacker army
  const consumePendingInvasion = (targetCity?: City): { botId: string; army: UnitBattleAcc } | null => {
    const botId = IA.pendingBotAttack;
    if (!botId) return null;
    IA.pendingBotAttack = null;
    const army = getBotArmy(botId, targetCity);
    return { botId, army };
  };

  // Returns the bot's actual live army for battle resolution
  const getBotArmy = (ownerId: string, targetCity?: City): UnitBattleAcc => {
    const bot = IA.bots.find((b) => b.id === ownerId);
    if (!bot) {
      return { wall: 3, mech: 0, catapult: 0, archer: 10, hoplita: 0, spearman: 10 };
    }
    return adaptiveArmy(bot, targetCity);
  };

  return {
    init,
    advance,
    botTick,
    aggressiveness,
    threatScore,
    adaptiveArmy,
    getBotArmy,
    registerAttack,
    consumePendingInvasion,
  };
};
