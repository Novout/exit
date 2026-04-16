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
      <p v-if="CONTROLLER.travel[0]!.value > 0">
        {{ computed(() => format(CONTROLLER.travel[0]!.value)) }}
      </p>
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
import { useControllerStore } from "../../../../store/controller";
import { format } from "../../../../utils";
import type { TravelTime } from "../../../../types";

const PLAYER = usePlayerStore();
const CONTROLLER = useControllerStore();
const BATTLE = useBattleStore();
const CYCLE = useCycleStore();

const battle = useBattle();

const vikingLevelDifficult = computed(() =>
  vikingDifficult(PLAYER.data.island.vikingLevel),
);
const vikingLevelGain = computed(() =>
  VikingGain(PLAYER.data.island.vikingLevel),
);

const def = computed(
  () => CONTROLLER.travel.find((item) => item.id === "viking_0") as TravelTime,
);

const onPreSetAttack = () => {
  if (def.value.start) return;

  CONTROLLER.travel[0]!.finish = false;
  CONTROLLER.travel[0]!.start = true;

  CONTROLLER.travel[0]!.value = PLAYER.data.island.vikingLevel * 8;
};
</script>
