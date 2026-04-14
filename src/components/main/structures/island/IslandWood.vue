<template>
  <StructureModal name="locksmith">
    <div class="flex flex-col gap-2 w-full">
      <p>Level: {{ PLAYER.activeCity.locksmith.level }}</p>
      <div class="flex w-full justify-between gap-5 pb-10 items-center">
        <input
          type="range"
          id="volume"
          name="volume"
          v-model="set"
          :min="0"
          :max="max"
        />
        <label for="volume">{{ set }} / {{ max }} Workers</label>
        <p
          class="p-1"
          :class="[PLAYER.data.gold.set >= 0 ? 'bg-yellow' : 'bg-red']"
        >
          Gold {{ PLAYER.data.gold.set }}
        </p>
        <Button @click="onSetWorkers">Set</Button>
      </div>
      <p v-if="def.start && !def.finish">
        {{
          computed(() =>
            format(def.level[PLAYER.activeCity.locksmith.level + 1]),
          )
        }}
      </p>
      <div class="flex w-full justify-between">
        <ResourcesBar :resources="resources" /><Button @click="onUpgrade"
          >Upgrade</Button
        >
      </div>
    </div>
  </StructureModal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { LocksmithUpgrade } from "../../../../defines/upgrades";
import { usePlayerStore } from "../../../../store/player";
import type { ConstructionTime } from "../../../../types";
import { useControllerStore } from "../../../../store/controller";
import { format } from "../../../../utils";

const PLAYER = usePlayerStore();
const CONTROLLER = useControllerStore();

const resources = ref(LocksmithUpgrade(PLAYER.activeCity.locksmith.level + 1));

const def = computed(
  () =>
    CONTROLLER.constructions.find(
      (item) => item.id === "wood_0",
    ) as ConstructionTime,
);

const set = ref(PLAYER.activeCity.locksmith.workers);
const max = computed(() => PLAYER.activeCity.locksmith.level * 7);

const onSetWorkers = () => {
  const pop =
    PLAYER.activeCity.cityhall.population.acc -
    Number(PLAYER.activeCity.locksmith.workers);

  if (pop < set.value) {
    set.value = PLAYER.activeCity.locksmith.workers;
    return;
  }

  PLAYER.activeCity.locksmith.workers = set.value;
};

const onUpgrade = () => {
  const levelTarget = PLAYER.activeCity.locksmith.level + 1;

  const upg = LocksmithUpgrade(levelTarget);

  if (upg) {
    const dmgWood = upg.wood;
    const dmgStone = upg.stone;

    if (
      PLAYER.activeCity.cityhall.wood.acc >= dmgWood &&
      PLAYER.activeCity.cityhall.stone.acc >= dmgStone
    ) {
      PLAYER.activeCity.cityhall.wood.acc -= upg.wood;
      PLAYER.activeCity.cityhall.stone.acc -= upg.stone;

      const city = CONTROLLER.constructions.find(
        (item) => item.id === "wood_0",
      ) as ConstructionTime;
      const cityIndex = CONTROLLER.constructions.indexOf(city);

      CONTROLLER.constructions[cityIndex]!.finish = false;
      CONTROLLER.constructions[cityIndex]!.start = true;

      resources.value = LocksmithUpgrade(levelTarget + 1);
    }
  }
};
</script>
