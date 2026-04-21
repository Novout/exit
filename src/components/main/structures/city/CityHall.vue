<template>
  <StructureModal name="city Hall">
    <div class="flex flex-col gap-2 w-full">
      <input
        class="p-2 text-lg hover:bg-neutral shadow-lg hover:text-white bg-coolGray rounded-full border-2 border-b-amber text-md"
        v-model="PLAYER.activeCity.cityhall.name"
      />
      <div class="flex w-full justify-between">
        <p>Level: {{ PLAYER.activeCity.cityhall.level }}</p>
        <p>
          Population: {{ PLAYER.activeCity.cityhall.population.acc }} /
          {{ PLAYER.activeCity.cityhall.population.maxAcc }}
        </p>
        <p class="bg-yellow p-2 rounded-full">
          Happy:
          {{
            Number((PLAYER.activeCity.tavern.workers * 12).toFixed()) +
            50 -
            PLAYER.activeCity.cityhall.population.acc
          }}
        </p>
      </div>
      <div class="flex w-full items-center justify-between">
        <ResourcesBar :resources="resources" />
        <Button @click="onUpgrade">Upgrade</Button>
      </div>
      <p v-if="cityhall.start && !cityhall.finish">
        {{
          computed(() =>
            format(cityhall.level[PLAYER.activeCity.cityhall.level + 1]),
          )
        }}
      </p>
    </div>
  </StructureModal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { CityhallUpgrade } from "../../../../defines/upgrades";
import { usePlayerStore } from "../../../../store/player";
import { useControllerStore } from "../../../../store/controller";
import { format } from "../../../../utils";
import type { ConstructionTime } from "../../../../types";

const PLAYER = usePlayerStore();
const CONTROLLER = useControllerStore();

const resources = ref(CityhallUpgrade(PLAYER.activeCity.cityhall.level + 1));
const cityhall = computed(
  () =>
    CONTROLLER.constructions.find(
      (item) => item.id === `cityhall_${PLAYER.activeCity.id}`,
    ) as ConstructionTime,
);

const onUpgrade = () => {
  const levelTarget = PLAYER.activeCity.cityhall.level + 1;

  const upg = CityhallUpgrade(levelTarget);

  if (upg) {
    const dmgWood = upg.wood;
    const dmgStone = upg.stone;

    if (
      !cityhall.value.start &&
      PLAYER.activeCity.cityhall.wood.acc >= dmgWood &&
      PLAYER.activeCity.cityhall.stone.acc >= dmgStone
    ) {
      PLAYER.activeCity.cityhall.wood.acc -= upg.wood;
      PLAYER.activeCity.cityhall.stone.acc -= upg.stone;

      const city = CONTROLLER.constructions.find(
        (item) => item.id === `cityhall_${PLAYER.activeCity.id}`,
      ) as ConstructionTime;
      const cityIndex = CONTROLLER.constructions.indexOf(city);

      CONTROLLER.constructions[cityIndex]!.finish = false;
      CONTROLLER.constructions[cityIndex]!.start = true;

      resources.value = CityhallUpgrade(PLAYER.activeCity.cityhall.level + 1);
    }
  }
};
</script>
