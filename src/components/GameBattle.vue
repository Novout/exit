<template>
  <div
    :style="{ backgroundImage: `url('/background.png')` }"
    class="flex bg-cover text-white flex-col w-full justify-center items-center pt-10 min-h-100vh"
  >
    <div
      class="flex flex-col bg-white bg-opacity-50 rounded-xl p-5 items-center justify-center w-30%"
    >
      <div
        class="flex flex-col items-center justify-center flex-1 gap-3 w-full"
      >
        <div
          v-for="(atk, key) in attacker"
          :key="key"
          class="flex flex-row items-center gap-3"
        >
          <div v-for="(value, index) in getStacks(atk)" :key="index">
            <div v-if="index <= 2">
              <div
                class="flex flex-row items-center gap-2 rounded-xl bg-dark text-white px-1 border-black border-2"
                v-if="
                  atk[0] === 'spearman' &&
                  atk[1] !== 'disabled' &&
                  !attacker?.some(
                    (item) =>
                      (item[0] === 'hoplita' && item[2] !== 0) ||
                      (item[0] === 'mech' && item[2] !== 0),
                  )
                "
              >
                <IconSpearman class="w-5 h-5" />
                <p>{{ value }} / {{ atk[3] }}</p>
              </div>
              <div
                class="flex flex-row items-center gap-2 rounded-xl bg-dark text-white px-1 border-black border-2"
                v-else-if="
                  atk[0] === 'hoplita' &&
                  atk[1] !== 'disabled' &&
                  !attacker?.some((item) => item[0] === 'mech' && item[2] !== 0)
                "
              >
                <IconHoplita class="w-5 h-5" />
                <p>{{ value }} / {{ atk[3] }}</p>
              </div>
              <div
                class="flex flex-row items-center gap-2 rounded-xl bg-dark text-white px-1 border-black border-2"
                v-else-if="atk[0] === 'mech' && atk[1] !== 'disabled'"
              >
                <IconMech class="w-5 h-5" />
                <p>{{ value }} / {{ atk[3] }}</p>
              </div>
              <div
                class="flex flex-row items-center gap-2 rounded-xl bg-dark text-white px-1 border-black border-2"
                v-else-if="atk[0] === 'archer' && atk[1] !== 'disabled'"
              >
                <IconArcher class="w-5 h-5" />
                <p>{{ value }} / {{ atk[3] }}</p>
              </div>
              <div
                class="flex flex-row items-center gap-2 rounded-xl bg-dark text-white px-1 border-black border-2"
                v-else-if="atk[0] === 'viking' && atk[1] !== 'disabled'"
              >
                <IconViking class="w-5 h-5" />
                <p>{{ value }} / {{ atk[3] }}</p>
              </div>
              <div
                class="flex flex-row items-center gap-2 rounded-xl bg-dark text-white px-1 border-black border-2"
                v-else-if="atk[0] === 'catapult' && atk[1] !== 'disabled'"
              >
                <IconCatapult class="w-5 h-5" />
                <p>{{ value }} / {{ atk[3] }}</p>
              </div>
              <div
                class="flex flex-row items-center gap-2 rounded-xl bg-dark text-white px-1 border-black border-2"
                v-else-if="atk[0] === 'wall' && atk[1] !== 'disabled'"
              >
                <IconWall class="w-5 h-5" />
                <p>{{ value }} / {{ atk[3] }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="px-1 border-2 border-black border-solid w-90% mt-5"></div>
      <div
        class="flex flex-col items-center justify-center flex-1 pt-5 gap-3 w-full"
      >
        <div
          v-for="(atk, key) in defender"
          :key="key"
          class="flex flex-row items-center gap-3"
        >
          <div v-for="(value, index) in getStacks(atk)" :key="index">
            <div v-if="index <= 2">
              <div
                class="flex flex-row items-center gap-2 rounded-xl bg-dark text-white px-1 border-black border-2"
                v-if="
                  atk[0] === 'spearman' &&
                  atk[1] !== 'disabled' &&
                  !defender?.some(
                    (item) =>
                      (item[0] === 'hoplita' && item[2] !== 0) ||
                      (item[0] === 'mech' && item[2] !== 0),
                  )
                "
              >
                <IconSpearman class="w-5 h-5" />
                <p>{{ value }} / {{ atk[3] }}</p>
              </div>
              <div
                class="flex flex-row items-center gap-2 rounded-xl bg-dark text-white px-1 border-black border-2"
                v-else-if="
                  atk[0] === 'hoplita' &&
                  atk[1] !== 'disabled' &&
                  !defender?.some((item) => item[0] === 'mech' && item[2] !== 0)
                "
              >
                <IconHoplita class="w-5 h-5" />
                <p>{{ value }} / {{ atk[3] }}</p>
              </div>
              <div
                class="flex flex-row items-center gap-2 rounded-xl bg-dark text-white px-1 border-black border-2"
                v-else-if="atk[0] === 'mech' && atk[1] !== 'disabled'"
              >
                <IconMech class="w-5 h-5" />
                <p>{{ value }} / {{ atk[3] }}</p>
              </div>
              <div
                class="flex flex-row items-center gap-2 rounded-xl bg-dark text-white px-1 border-black border-2"
                v-else-if="atk[0] === 'archer' && atk[1] !== 'disabled'"
              >
                <IconArcher class="w-5 h-5" />
                <p>{{ value }} / {{ atk[3] }}</p>
              </div>
              <div
                class="flex flex-row items-center gap-2 rounded-xl bg-dark text-white px-1 border-black border-2"
                v-else-if="atk[0] === 'viking' && atk[1] !== 'disabled'"
              >
                <IconViking class="w-5 h-5" />
                <p>{{ value }} / {{ atk[3] }}</p>
              </div>
              <div
                class="flex flex-row items-center gap-2 rounded-xl bg-dark text-white px-1 border-black border-2"
                v-else-if="atk[0] === 'catapult' && atk[1] !== 'disabled'"
              >
                <IconCatapult class="w-5 h-5" />
                <p>{{ value }} / {{ atk[3] }}</p>
              </div>
              <div
                class="flex flex-row items-center gap-2 rounded-xl bg-dark text-white px-1 border-black border-2"
                v-else-if="atk[0] === 'wall' && atk[1] !== 'disabled'"
              >
                <IconWall class="w-5 h-5" />
                <p>{{ value }} / {{ atk[3] }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute left-10 flex flex-col bottom-0">
      <h2 class="font-poppins">Attacker</h2>
      <div class="flex flex-row items-center gap-3">
        <div
          v-for="(atk, key) in attacker"
          :key="key"
          class="flex flex-row items-center gap-3"
        >
          <IconSpearman class="w-5 h-5" v-if="atk[0] === 'spearman'" />
          <IconArcher class="w-5 h-5" v-else-if="atk[0] === 'archer'" />
          <IconViking class="w-5 h-5" v-else-if="atk[0] === 'viking'" />
          <IconHoplita class="w-5 h-5" v-else-if="atk[0] === 'hoplita'" />
          <IconCatapult class="w-5 h-5" v-else-if="atk[0] === 'catapult'" />
          <IconMech class="w-5 h-5" v-else-if="atk[0] === 'mech'" />
          <IconWall class="w-5 h-5" v-else-if="atk[0] === 'wall'" />
          <p>{{ atk[2] }} / {{ atk[3] }}</p>
        </div>
      </div>
    </div>
    <div class="absolute right-10 flex flex-col bottom-0">
      <h2 class="font-poppins">Defender</h2>
      <div class="flex flex-row items-center gap-3">
        <div
          v-for="(atk, key) in defender"
          :key="key"
          class="flex flex-row items-center gap-3"
        >
          <IconSpearman class="w-5 h-5" v-if="atk[0] === 'spearman'" />
          <IconArcher class="w-5 h-5" v-else-if="atk[0] === 'archer'" />
          <IconViking class="w-5 h-5" v-else-if="atk[0] === 'viking'" />
          <IconHoplita class="w-5 h-5" v-else-if="atk[0] === 'hoplita'" />
          <IconCatapult class="w-5 h-5" v-else-if="atk[0] === 'catapult'" />
          <IconMech class="w-5 h-5" v-else-if="atk[0] === 'mech'" />
          <IconWall class="w-5 h-5" v-else-if="atk[0] === 'wall'" />
          <p>{{ atk[2] }} / {{ atk[3] }}</p>
        </div>
      </div>
    </div>
    <h2 @click="onNextRound" class="absolute top-6.5 right-40">
      Round {{ round }}
    </h2>
    <Button
      v-if="!isFinished"
      @click="onNextRound"
      class="absolute top-10 right-10"
      >Next Round</Button
    >
    <Button class="absolute top-10 right-10" @click="CYCLE.type = 'city'" v-else
      >Close</Button
    >
    <h1 class="font-poppins" v-if="winner">
      {{ winner.toUpperCase() }} Winner!
    </h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { UnitBattleContext } from "../types";
import { useBattle } from "../use/battle";
import { useBattleStore } from "../store/battle";
import { getBattleValues } from "../defines/battle";
import { useCycleStore } from "../store/cycle";
import { usePlayerStore } from "../store/player";
import { useBotAI } from "../use/ia";

const BATTLE = useBattleStore();
const CYCLE = useCycleStore();
const PLAYER = usePlayerStore();

const battle = useBattle();
const defines = getBattleValues();
const botAI = useBotAI();

const round = ref(0);
const isFinished = ref(false);
const winner = ref<"attacker" | "defender" | null>(null);

const clearLoserTroops = (loser: "attacker" | "defender") => {
  if (loser !== BATTLE.base.playerSide) return;
  PLAYER.activeCity.soldiers = PLAYER.activeCity.soldiers.map((s) => ({ ...s, units: 0 }));
};

// Reflect battle result back into the bot's persistent army
const applyBotOutcome = (botSide: "attacker" | "defender", botWon: boolean) => {
  const botId = BATTLE.base.botId;
  if (!botId || BATTLE.base.isViking) return;
  const survivors = botWon
    ? (botSide === "attacker" ? attacker.value : defender.value)
    : null;
  if (!survivors) {
    botAI.clearBotArmy(botId);
    return;
  }
  const acc = {
    wall: 0, mech: 0, catapult: 0, archer: 0, hoplita: 0, spearman: 0,
  };
  survivors.forEach((u) => {
    const key = u[0] as keyof typeof acc;
    if (key in acc) acc[key] = u[2] as number;
  });
  botAI.applyBotLosses(botId, acc);
};

const attacker = ref<UnitBattleContext>();
const defender = ref<UnitBattleContext>();

let initialAttacker: { type: string; initial: number; final: number }[] = [];
let initialDefender: { type: string; initial: number; final: number }[] = [];

onMounted(() => {
  attacker.value = BATTLE.base.attacker?.reverse() || [];
  defender.value = BATTLE.base.defender || [];

  initialAttacker = (attacker.value ?? []).map((u) => ({ type: u[0] as string, initial: u[2] as number, final: u[2] as number }));
  initialDefender = (defender.value ?? []).map((u) => ({ type: u[0] as string, initial: u[2] as number, final: u[2] as number }));
});

const recordWar = (w: "attacker" | "defender") => {
  const finalAttacker = initialAttacker.map((u) => ({
    ...u,
    final: (attacker.value?.find((a) => a[0] === u.type)?.[2] as number) ?? 0,
  }));
  const finalDefender = initialDefender.map((u) => ({
    ...u,
    final: (defender.value?.find((d) => d[0] === u.type)?.[2] as number) ?? 0,
  }));

  BATTLE.wars.unshift({
    id: BATTLE.wars.length + 1,
    round: round.value,
    winner: w,
    playerSide: BATTLE.base.playerSide ?? "attacker",
    isViking: BATTLE.base.isViking ?? false,
    winBonus: BATTLE.base.winBonus,
    attackerUnits: finalAttacker,
    defenderUnits: finalDefender,
  });
};

const getStacks = (atk: any[]) => {
  return battle.splitUnitsByStack(atk[2], atk[3]);
};

const onNextRound = () => {
  let attackerDmg = battle.getTotalDamage(attacker.value as UnitBattleContext);
  let defenderDmg = battle.getTotalDamage(
    defender.value as UnitBattleContext,
    true,
  );

  const asWall = battle.asType(defender.value as UnitBattleContext, "wall");
  const wallLevel = BATTLE.base.city?.wall.level || 1;

  if (asWall) {
    const hp = wallLevel * defines.wall().hp;
    const total = asWall[2] * hp;

    if (attackerDmg >= total) {
      defender.value = defender.value?.filter((item) => item[0] !== "wall");
    } else {
      defender.value = defender.value?.map((item) => {
        let damage = attackerDmg;
        while (damage > 0) {
          if (item[0] === "wall" && attackerDmg >= hp) {
            item[2]--;
          }
          damage -= hp;
        }

        return item;
      });
    }
  }

  if (!defender.value) return;

  let breakLoop = false;
  const line = battle.getLineSequence(defender.value);
  const defenderItem = defender.value.find((item) => item[1] === line);
  if (!defenderItem) return;
  const defenderIndex = defender.value.indexOf(defenderItem);

  const defenderAcc = battle.acceptDamage(defenderItem);

  if (!asWall) {
    while (attackerDmg > 0) {
      defenderItem[2]--;
      attackerDmg -= defenderAcc.acc_raw_hp;
      defenderAcc.acc_units -= 1;

      if (defenderItem[2] <= 0) {
        breakLoop = true;
        defender.value = defender.value?.filter(
          (item) => item[0] !== defenderItem[0],
        );
        attackerDmg = 0;
      }
    }

    if (!breakLoop) defender.value[defenderIndex] = defenderItem;

    const attDefender = battle.getTotalDamage(
      defender.value as UnitBattleContext,
      true,
    );
    if (attDefender <= 0) {
      isFinished.value = true;

      if (BATTLE.base.playerSide === "attacker" && BATTLE.base.winBonus) {
        if (
          PLAYER.activeCity.cityhall.stone.acc + BATTLE.base.winBonus.stone <=
          PLAYER.activeCity.cityhall.stone.maxAcc
        )
          PLAYER.activeCity.cityhall.stone.acc += BATTLE.base.winBonus.stone;
        if (
          PLAYER.activeCity.cityhall.wine.acc + BATTLE.base.winBonus.wine <=
          PLAYER.activeCity.cityhall.wine.maxAcc
        )
          PLAYER.activeCity.cityhall.wine.acc += BATTLE.base.winBonus.wine;
        if (
          PLAYER.activeCity.cityhall.wood.acc + BATTLE.base.winBonus.wood <=
          PLAYER.activeCity.cityhall.wood.maxAcc
        )
          PLAYER.activeCity.cityhall.wood.acc += BATTLE.base.winBonus.wood;
        if (
          PLAYER.activeCity.cityhall.sulfur.acc + BATTLE.base.winBonus.sulfur <=
          PLAYER.activeCity.cityhall.sulfur.maxAcc
        )
          PLAYER.activeCity.cityhall.sulfur.acc += BATTLE.base.winBonus.sulfur;
        if (
          PLAYER.activeCity.cityhall.crystal.acc +
            BATTLE.base.winBonus.crystal <=
          PLAYER.activeCity.cityhall.crystal.maxAcc
        )
          PLAYER.activeCity.cityhall.crystal.acc +=
            BATTLE.base.winBonus.crystal;
      }

      // Bot won the invasion — deduct resources from player
      if (BATTLE.base.playerSide === "defender" && BATTLE.base.winBonus) {
        PLAYER.activeCity.cityhall.stone.acc = Math.max(
          0,
          PLAYER.activeCity.cityhall.stone.acc - BATTLE.base.winBonus.stone,
        );
        PLAYER.activeCity.cityhall.wine.acc = Math.max(
          0,
          PLAYER.activeCity.cityhall.wine.acc - BATTLE.base.winBonus.wine,
        );
        PLAYER.activeCity.cityhall.wood.acc = Math.max(
          0,
          PLAYER.activeCity.cityhall.wood.acc - BATTLE.base.winBonus.wood,
        );
        PLAYER.activeCity.cityhall.sulfur.acc = Math.max(
          0,
          PLAYER.activeCity.cityhall.sulfur.acc - BATTLE.base.winBonus.sulfur,
        );
        PLAYER.activeCity.cityhall.crystal.acc = Math.max(
          0,
          PLAYER.activeCity.cityhall.crystal.acc - BATTLE.base.winBonus.crystal,
        );
      }

      if (BATTLE.base.isViking) PLAYER.data.island.vikingLevel++;

      winner.value = "attacker";
      clearLoserTroops("defender");
      // attacker wins: bot is defender if playerSide=attacker (bot lost), or bot is attacker if playerSide=defender (bot won)
      applyBotOutcome(
        BATTLE.base.playerSide === "attacker" ? "defender" : "attacker",
        BATTLE.base.playerSide === "defender",
      );
      recordWar("attacker");

      return;
    }
  }

  if (!attacker.value) return;

  const lineAttack = battle.getLineSequence(attacker.value);
  const attackItem = attacker.value.find((item) => item[1] === lineAttack);
  if (!attackItem) return;
  const attackIndex = attacker.value.indexOf(attackItem);

  const attackerAcc = battle.acceptDamage(attackItem);

  breakLoop = false;
  while (defenderDmg > 0) {
    attackItem[2]--;
    defenderDmg -= attackerAcc.acc_raw_hp;
    attackerAcc.acc_units -= 1;

    if (attackItem[2] <= 0) {
      breakLoop = true;
      attacker.value = attacker.value?.filter(
        (item) => item[0] !== defenderItem[0],
      );
      defenderDmg = 0;
    }
  }

  if (!breakLoop) defender.value[attackIndex] = attackItem;

  const attAttack = battle.getTotalDamage(
    attacker.value as UnitBattleContext,
    true,
  );
  if (attAttack <= 0) {
    isFinished.value = true;

    if (BATTLE.base.playerSide === "defender" && BATTLE.base.winBonus) {
      if (
        PLAYER.activeCity.cityhall.stone.acc + BATTLE.base.winBonus.stone <=
        PLAYER.activeCity.cityhall.stone.maxAcc
      )
        PLAYER.activeCity.cityhall.stone.acc += BATTLE.base.winBonus.stone;
      if (
        PLAYER.activeCity.cityhall.wine.acc + BATTLE.base.winBonus.wine <=
        PLAYER.activeCity.cityhall.wine.maxAcc
      )
        PLAYER.activeCity.cityhall.wine.acc += BATTLE.base.winBonus.wine;
      if (
        PLAYER.activeCity.cityhall.wood.acc + BATTLE.base.winBonus.wood <=
        PLAYER.activeCity.cityhall.wood.maxAcc
      )
        PLAYER.activeCity.cityhall.wood.acc += BATTLE.base.winBonus.wood;
      if (
        PLAYER.activeCity.cityhall.sulfur.acc + BATTLE.base.winBonus.sulfur <=
        PLAYER.activeCity.cityhall.sulfur.maxAcc
      )
        PLAYER.activeCity.cityhall.sulfur.acc += BATTLE.base.winBonus.sulfur;
      if (
        PLAYER.activeCity.cityhall.crystal.acc + BATTLE.base.winBonus.crystal <=
        PLAYER.activeCity.cityhall.crystal.maxAcc
      )
        PLAYER.activeCity.cityhall.crystal.acc += BATTLE.base.winBonus.crystal;
    }

    winner.value = "defender";
    clearLoserTroops("attacker");
    // defender wins: bot is attacker if playerSide=attacker (bot lost), or bot is defender if playerSide=defender (bot won)
    applyBotOutcome(
      BATTLE.base.playerSide === "attacker" ? "attacker" : "defender",
      BATTLE.base.playerSide === "defender",
    );
    recordWar("defender");

    return;
  }

  round.value++;
};
</script>
