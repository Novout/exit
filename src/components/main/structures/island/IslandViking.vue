<template>
  <StructureModal name="vikings">
    <div class="flex flex-col gap-2 w-full">
      <p>Level: {{ PLAYER.data.island.vikingLevel }}</p>
      <div class="flex gap-5 w-full items-center">
        <p>Enemies:</p>
        <div class="flex flex-col items-center">
          <IconViking class="w-12 h-12" />
          <p>{{ vikingLevelDifficult.soldiers }}</p>
        </div>
        <div class="flex flex-col items-center">
          <IconArcher class="w-12 h-12" />
          <p>{{ vikingLevelDifficult.long }}</p>
        </div>
      </div>
      <ResourcesBar description="Gain" :resources="vikingLevelGain" />
      <Button @click="onPreSetAttack">Attack</Button>
    </div>
  </StructureModal>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePlayerStore } from "../../../../store/player";
import { vikingDifficult, VikingGain } from "../../../../defines/difficults";
import { useBattleStore } from "../../../../store/battle";
import { useBattle } from "../../../../use/battle";
import { useCycleStore } from "../../../../store/cycle";
import type { Resources } from "../../../../types";

const PLAYER = usePlayerStore();
const BATTLE = useBattleStore();
const CYCLE = useCycleStore();

const battle = useBattle();

const vikingLevelDifficult = computed(() =>
  vikingDifficult(PLAYER.data.island.vikingLevel),
);
const vikingLevelGain = computed(() =>
  VikingGain(PLAYER.data.island.vikingLevel),
);

const onPreSetAttack = () => {
  BATTLE.base.defender = battle.getUnitsCounter(
    {
      wall: 0,
      mech: 0,
      viking: vikingLevelDifficult.value.soldiers,
      catapult: 0,
      archer: vikingLevelDifficult.value.long,
      hoplita: 0,
      spearman: 0,
    },
    "defender",
    true,
  );

  const city = PLAYER.activeCity;

  const set = {
    mech: 0,
    archer: 0,
    catapult: 0,
    hoplita: 0,
    spearman: 0,
  };

  city?.soldiers.forEach((soldier) => {
    if (soldier.type === "spearman") set.spearman = soldier.units;
    if (soldier.type === "archer") set.archer = soldier.units;
    if (soldier.type === "hoplita") set.hoplita = soldier.units;
    if (soldier.type === "catapult") set.catapult = soldier.units;
    if (soldier.type === "mech") set.mech = soldier.units;
  });

  BATTLE.base.attacker = battle.getUnitsCounter(
    {
      ...set,
      wall: 0,
      viking: 0,
    },
    "attacker",
    true,
  );

  BATTLE.base.winBonus = {
    ...(vikingLevelGain.value as Resources),
  };

  BATTLE.base.city = undefined;
  BATTLE.base.playerSide = "attacker";
  BATTLE.base.isViking = true;

  CYCLE.type = "battle";
};
</script>
