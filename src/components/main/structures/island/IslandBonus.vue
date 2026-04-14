<template>
  <StructureModal :name="PLAYER.data.island.type">
    <div class="flex flex-col gap-2 w-full">
      <p>Level: {{ PLAYER.activeCity.bonus.level }}</p>
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
          computed(() => format(def.level[PLAYER.activeCity.bonus.level + 1]))
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
import { BonusUpgrade } from "../../../../defines/upgrades";
import { usePlayerStore } from "../../../../store/player";
import { format } from "../../../../utils";
import { useControllerStore } from "../../../../store/controller";
import type { ConstructionTime } from "../../../../types";

const PLAYER = usePlayerStore();
const CONTROLLER = useControllerStore();

const resources = ref(BonusUpgrade(PLAYER.activeCity.bonus.level + 1));

const def = computed(
  () =>
    CONTROLLER.constructions.find(
      (item) => item.id === "bonus_0",
    ) as ConstructionTime,
);

const set = ref(PLAYER.activeCity.bonus.workers);
const max = computed(() => PLAYER.activeCity.bonus.level * 7);

const onSetWorkers = () => {
  const pop =
    PLAYER.activeCity.cityhall.population.acc -
    Number(PLAYER.activeCity.bonus.workers);

  if (pop < set.value) {
    set.value = PLAYER.activeCity.bonus.workers;
    return;
  }

  PLAYER.activeCity.bonus.workers = set.value;
};

const onUpgrade = () => {
  const levelTarget = PLAYER.activeCity.bonus.level + 1;

  const upg = BonusUpgrade(levelTarget);

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
        (item) => item.id === "bonus_0",
      ) as ConstructionTime;
      const cityIndex = CONTROLLER.constructions.indexOf(city);

      CONTROLLER.constructions[cityIndex]!.finish = false;
      CONTROLLER.constructions[cityIndex]!.start = true;

      resources.value = BonusUpgrade(levelTarget + 1);
    }
  }
};
</script>
