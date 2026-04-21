<template>
  <StructureModal name="storage">
    <div class="flex flex-col gap-2 w-full">
      <p>Level: {{ PLAYER.activeCity.storage.level }}</p>
      <ResourcesBar description="Actually" :resources="actually" />
      <ResourcesBar description="Next" :resources="next" />
      <p v-if="def.start && !def.finish">
        {{
          computed(() => format(def.level[PLAYER.activeCity.storage.level + 1]))
        }}
      </p>
      <div class="flex w-full justify-between pt-20">
        <ResourcesBar :resources="cost" /><Button @click="onUpgrade"
          >Upgrade</Button
        >
      </div>
    </div>
  </StructureModal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { StorageCost, StorageUpgrade } from "../../../../defines/upgrades";
import { usePlayerStore } from "../../../../store/player";
import { format } from "../../../../utils";
import type { ConstructionTime } from "../../../../types";
import { useControllerStore } from "../../../../store/controller";

const PLAYER = usePlayerStore();
const CONTROLLER = useControllerStore();

const actually = ref(StorageUpgrade(PLAYER.activeCity.storage.level));
const next = ref(StorageUpgrade(PLAYER.activeCity.storage.level + 1));
const cost = ref(StorageCost(PLAYER.activeCity.storage.level + 1));

const def = computed(
  () =>
    CONTROLLER.constructions.find(
      (item) => item.id === `storage_${PLAYER.activeCity.id}`,
    ) as ConstructionTime,
);

const onUpgrade = () => {
  const levelTarget = PLAYER.activeCity.storage.level + 1;

  const upg = StorageCost(levelTarget);

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
        (item) => item.id === "storage",
      ) as ConstructionTime;
      const cityIndex = CONTROLLER.constructions.indexOf(city);

      CONTROLLER.constructions[cityIndex]!.finish = false;
      CONTROLLER.constructions[cityIndex]!.start = true;

      const stg = StorageUpgrade(PLAYER.activeCity.storage.level);

      if (stg) {
        PLAYER.activeCity.cityhall.stone.maxAcc = stg.stone;
        PLAYER.activeCity.cityhall.wood.maxAcc = stg.wood;
        PLAYER.activeCity.cityhall.sulfur.maxAcc = stg.sulfur;
        PLAYER.activeCity.cityhall.wine.maxAcc = stg.wine;
        PLAYER.activeCity.cityhall.crystal.maxAcc = stg.crystal;

        next.value = stg;
        actually.value = StorageUpgrade(PLAYER.activeCity.storage.level);
        cost.value = StorageCost(PLAYER.activeCity.storage.level);
      }
    }
  }
};
</script>
