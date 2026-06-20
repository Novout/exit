<template>
  <div class="naval-wrap">
    <!-- Ocean background SVG -->
    <svg class="naval-bg" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="nb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a3a5c"/>
          <stop offset="100%" stop-color="#2a5a8a"/>
        </linearGradient>
        <linearGradient id="nb-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a5a90"/>
          <stop offset="100%" stop-color="#0d3a60"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="600" fill="url(#nb-sky)"/>
      <rect x="0" y="280" width="1200" height="320" fill="url(#nb-sea)"/>
      <g stroke="#4a90c0" stroke-width="1.2" fill="none" opacity="0.5">
        <path d="M0,310 Q80,300 160,310 Q240,320 320,310 Q400,300 480,310 Q560,320 640,310 Q720,300 800,310 Q880,320 960,310 Q1040,300 1120,310 Q1160,320 1200,310"/>
        <path d="M0,350 Q90,340 180,350 Q270,360 360,350 Q450,340 540,350 Q630,360 720,350 Q810,340 900,350 Q990,360 1080,350 Q1140,340 1200,350"/>
        <path d="M0,400 Q100,390 200,400 Q300,410 400,400 Q500,390 600,400 Q700,410 800,400 Q900,390 1000,400 Q1100,410 1200,400"/>
        <path d="M0,460 Q110,450 220,460 Q330,470 440,460 Q550,450 660,460 Q770,470 880,460 Q990,450 1100,460 Q1150,470 1200,460"/>
      </g>
      <rect x="0" y="270" width="1200" height="20" fill="#2a6a9a" opacity="0.4"/>
    </svg>

    <!-- Battle panel -->
    <div class="battle-panel">
      <!-- Attacker fleet -->
      <div class="fleet-section">
        <h3 class="fleet-title">{{ BATTLE.base.playerSide === 'attacker' ? 'Your Fleet' : 'Enemy Fleet' }}</h3>
        <div class="stacks-row">
          <template v-for="(unit, key) in attacker" :key="key">
            <template v-for="(count, si) in getStacks(unit)" :key="si">
              <div v-if="si <= 2 && unit[1] !== 'disabled' && unit[2] > 0" class="unit-stack attacker-stack">
                <component :is="iconFor(unit[0])" class="w-6 h-6" />
                <span>{{ count }}/{{ unit[3] }}</span>
              </div>
            </template>
          </template>
        </div>
      </div>

      <div class="battle-divider">
        <span class="vs-badge">⚓ VS ⚓</span>
      </div>

      <!-- Defender fleet -->
      <div class="fleet-section">
        <h3 class="fleet-title">{{ BATTLE.base.playerSide === 'defender' ? 'Your Fleet' : 'Enemy Fleet' }}</h3>
        <div class="stacks-row">
          <template v-for="(unit, key) in defender" :key="key">
            <template v-for="(count, si) in getStacks(unit)" :key="si">
              <div v-if="si <= 2 && unit[1] !== 'disabled' && unit[2] > 0" class="unit-stack defender-stack">
                <component :is="iconFor(unit[0])" class="w-6 h-6" />
                <span>{{ count }}/{{ unit[3] }}</span>
              </div>
            </template>
          </template>
        </div>
      </div>
    </div>

    <!-- Round counter -->
    <div class="round-badge">Round {{ round }}</div>

    <!-- Winner banner -->
    <div v-if="winner" class="winner-banner">
      <span v-if="winner === BATTLE.base.playerSide">Victory!</span>
      <span v-else>Defeat!</span>
    </div>

    <!-- Totals bar -->
    <div class="totals-bar">
      <div class="totals-side">
        <span class="totals-label">Attacker</span>
        <div v-for="(unit, k) in attacker" :key="k" class="totals-unit">
          <component :is="iconFor(unit[0])" class="w-4 h-4" />
          <span>{{ unit[2] }}/{{ unit[3] }}</span>
        </div>
      </div>
      <div class="totals-side right">
        <span class="totals-label">Defender</span>
        <div v-for="(unit, k) in defender" :key="k" class="totals-unit">
          <component :is="iconFor(unit[0])" class="w-4 h-4" />
          <span>{{ unit[2] }}/{{ unit[3] }}</span>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="controls">
      <Button v-if="!isFinished" @click="onNextRound">Next Round</Button>
      <Button v-else @click="CYCLE.type = 'city'">Close</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { UnitBattleContext } from "../types";
import { useBattle } from "../use/battle";
import { useBattleStore } from "../store/battle";
import { useCycleStore } from "../store/cycle";
import { usePlayerStore } from "../store/player";

const BATTLE = useBattleStore();
const CYCLE = useCycleStore();
const PLAYER = usePlayerStore();

const battle = useBattle();

const round       = ref(0);
const isFinished  = ref(false);
const winner      = ref<"attacker" | "defender" | null>(null);

const clearLoserFleet = (loser: "attacker" | "defender") => {
  if (loser !== BATTLE.base.playerSide) return;
  PLAYER.activeCity.navySoldiers = PLAYER.activeCity.navySoldiers.map((s) => ({ ...s, units: 0 }));
};

const attacker = ref<UnitBattleContext>();
const defender = ref<UnitBattleContext>();

let initialAttacker: { type: string; initial: number; final: number }[] = [];
let initialDefender: { type: string; initial: number; final: number }[] = [];

onMounted(() => {
  attacker.value = [...(BATTLE.base.attacker ?? [])];
  defender.value = [...(BATTLE.base.defender ?? [])];
  initialAttacker = (attacker.value).map((u) => ({ type: u[0] as string, initial: u[2] as number, final: u[2] as number }));
  initialDefender = (defender.value).map((u) => ({ type: u[0] as string, initial: u[2] as number, final: u[2] as number }));
});

const iconFor = (type: string) => {
  if (type === "galley")  return "IconGalley";
  if (type === "trireme") return "IconTrireme";
  if (type === "warship") return "IconWarship";
  return "IconNavy";
};

const getStacks = (unit: any[]) => battle.splitUnitsByStack(unit[2], unit[3]);

const recordWar = (w: "attacker" | "defender") => {
  BATTLE.wars.unshift({
    id: BATTLE.wars.length + 1,
    round: round.value,
    winner: w,
    playerSide: BATTLE.base.playerSide ?? "attacker",
    isViking: false,
    winBonus: BATTLE.base.winBonus,
    attackerUnits: initialAttacker.map((u) => ({
      ...u,
      final: (attacker.value?.find((a) => a[0] === u.type)?.[2] as number) ?? 0,
    })),
    defenderUnits: initialDefender.map((u) => ({
      ...u,
      final: (defender.value?.find((d) => d[0] === u.type)?.[2] as number) ?? 0,
    })),
  });
};

const applyBonus = (side: "attacker" | "defender") => {
  const bonus = BATTLE.base.winBonus;
  if (!bonus || BATTLE.base.playerSide !== side) return;
  const city = PLAYER.activeCity.cityhall;
  if (city.wood.acc    + bonus.wood    <= city.wood.maxAcc)    city.wood.acc    += bonus.wood;
  if (city.stone.acc   + bonus.stone   <= city.stone.maxAcc)   city.stone.acc   += bonus.stone;
  if (city.wine.acc    + bonus.wine    <= city.wine.maxAcc)    city.wine.acc    += bonus.wine;
  if (city.sulfur.acc  + bonus.sulfur  <= city.sulfur.maxAcc)  city.sulfur.acc  += bonus.sulfur;
  if (city.crystal.acc + bonus.crystal <= city.crystal.maxAcc) city.crystal.acc += bonus.crystal;
};

const onNextRound = () => {
  if (!attacker.value || !defender.value) return;

  let atkDmg = battle.getTotalDamage(attacker.value);
  let defDmg = battle.getTotalDamage(defender.value, true);

  // Damage to defender
  let defenderBroken = false;
  const defLine = battle.getLineSequence(defender.value);
  const defItem  = defender.value.find((u) => u[1] === defLine);
  if (defItem) {
    const defIdx = defender.value.indexOf(defItem);
    const defAcc = battle.acceptDamage(defItem);

    while (atkDmg > 0) {
      defItem[2]--;
      atkDmg -= defAcc.acc_raw_hp;
      defAcc.acc_units--;
      if (defItem[2] <= 0) {
        defenderBroken = true;
        defender.value = defender.value.filter((u) => u[0] !== defItem[0]);
        break;
      }
    }
    if (!defenderBroken) defender.value[defIdx] = defItem;
  }

  if (battle.getTotalDamage(defender.value, true) <= 0) {
    isFinished.value = true;
    winner.value = "attacker";
    clearLoserFleet("defender");
    applyBonus("attacker");
    recordWar("attacker");
    return;
  }

  // Damage to attacker
  let attackerBroken = false;
  const atkLine = battle.getLineSequence(attacker.value);
  const atkItem  = attacker.value.find((u) => u[1] === atkLine);
  if (atkItem) {
    const atkIdx = attacker.value.indexOf(atkItem);
    const atkAcc = battle.acceptDamage(atkItem);

    while (defDmg > 0) {
      atkItem[2]--;
      defDmg -= atkAcc.acc_raw_hp;
      atkAcc.acc_units--;
      if (atkItem[2] <= 0) {
        attackerBroken = true;
        attacker.value = attacker.value.filter((u) => u[0] !== atkItem[0]);
        break;
      }
    }
    if (!attackerBroken) attacker.value[atkIdx] = atkItem;
  }

  if (battle.getTotalDamage(attacker.value, true) <= 0) {
    isFinished.value = true;
    winner.value = "defender";
    clearLoserFleet("attacker");
    applyBonus("defender");
    recordWar("defender");
    return;
  }

  round.value++;
};
</script>

<style scoped>
.naval-wrap {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.naval-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.battle-panel {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: rgba(10, 30, 50, 0.7);
  border: 1px solid #2a6a9a;
  border-radius: 0.75rem;
  padding: 1.5rem 2rem;
  min-width: 320px;
  max-width: 520px;
  width: 90%;
}

.fleet-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.fleet-title {
  font-family: "Cinzel", serif;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #90c8e0;
}

.stacks-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.unit-stack {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  border: 1px solid;
}

.attacker-stack {
  background: rgba(30, 80, 140, 0.5);
  border-color: #4a90c8;
  color: #c0dff0;
}

.defender-stack {
  background: rgba(140, 50, 30, 0.5);
  border-color: #c86040;
  color: #f0c0a0;
}

.battle-divider {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.vs-badge {
  font-size: 0.9rem;
  color: #6ab0d0;
  letter-spacing: 0.5em;
}

.round-badge {
  position: absolute;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  font-family: "Cinzel", serif;
  font-size: 0.85rem;
  color: #90c8e0;
  letter-spacing: 0.1em;
}

.winner-banner {
  position: relative;
  z-index: 2;
  margin-top: 1rem;
  font-family: "Cinzel", serif;
  font-size: 1.5rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #f0e080;
  text-shadow: 0 0 20px rgba(240, 224, 128, 0.6);
}

.totals-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background: rgba(10, 25, 45, 0.8);
  border-top: 1px solid #1a4a70;
}

.totals-side {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.totals-side.right {
  flex-direction: row-reverse;
}

.totals-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6a90a8;
}

.totals-unit {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.78rem;
  color: #a0c0d8;
}

.controls {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  z-index: 2;
}
</style>
