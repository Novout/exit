<template>
  <StructureModal name="wall">
    <div class="flex flex-col gap-2 w-full">
      <div class="flex w-full justify-between">
        <p>Level: {{ PLAYER.activeCity.wall.level }}</p>
      </div>
      <p v-if="def.start && !def.finish">
        {{
          computed(() => format(def.level[PLAYER.activeCity.wall.level + 1]))
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
import { WallUpgrade } from "../../../../defines/upgrades";
import { usePlayerStore } from "../../../../store/player";
import { format } from "../../../../utils";
import { useControllerStore } from "../../../../store/controller";
import type { ConstructionTime } from "../../../../types";

const PLAYER = usePlayerStore();
const CONTROLLER = useControllerStore();

const resources = ref(WallUpgrade(PLAYER.activeCity.wall.level + 1));

const def = computed(
  () =>
    CONTROLLER.constructions.find(
      (item) => item.id === `wall_${PLAYER.activeCity.id}`,
    ) as ConstructionTime,
);

const onUpgrade = () => {
  const levelTarget = PLAYER.activeCity.wall.level + 1;

  const upg = WallUpgrade(levelTarget);

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
        (item) => item.id === `wall_${PLAYER.activeCity.id}`,
      ) as ConstructionTime;
      const cityIndex = CONTROLLER.constructions.indexOf(city);

      CONTROLLER.constructions[cityIndex]!.finish = false;
      CONTROLLER.constructions[cityIndex]!.start = true;

      resources.value = WallUpgrade(levelTarget + 1);
    }
  }
};
</script>
