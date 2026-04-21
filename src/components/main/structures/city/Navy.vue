<template>
  <StructureModal name="Military Base">
    <div class="flex flex-col gap-2 w-full">
      <p>Level: {{ PLAYER.activeCity.shipyard.level }}</p>
      <div class="flex justify-between items-center w-full">
        <p
          class="flex w-full items-center"
          v-for="soldier in PLAYER.activeCity.soldiers"
        >
          {{ Number(soldier.units) }} {{ soldier.type }}
        </p>
      </div>
      <input
        type="range"
        id="volume"
        name="volume"
        v-model="units.boats"
        :min="0"
        :max="10"
      />
      <label for="volume">{{ units.boats }} / {{ 10 }} Boats</label>
      <ResourcesBar
        :resources="{
          wood: Number(units.boats) * 200,
          stone: Number(units.boats) * 0,
          sulfur: Number(units.boats) * 50,
          wine: Number(units.boats) * 0,
          crystal: Number(units.boats) * 0,
        }"
      />
      <Button @click="onSet">Set</Button>
      <p v-if="CONTROLLER.units[1]!.value > 0">
        {{ computed(() => format(CONTROLLER.units[1]!.value as any)) }}
      </p>
      <p v-if="def.start && !def.finish">
        {{
          computed(() =>
            format(def.level[PLAYER.activeCity.shipyard.level + 1]),
          )
        }}
      </p>
      <div class="flex pt-5 w-full justify-between">
        <ResourcesBar :resources="resources" /><Button @click="onUpgrade"
          >Upgrade</Button
        >
      </div>
    </div>
  </StructureModal>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { NavyUpgrade, ShipyardUpgrade } from "../../../../defines/upgrades";
import { usePlayerStore } from "../../../../store/player";
import { useControllerStore } from "../../../../store/controller";
import type { ConstructionTime } from "../../../../types";
import { format } from "../../../../utils";

const PLAYER = usePlayerStore();
const CONTROLLER = useControllerStore();

const resources = ref(NavyUpgrade(PLAYER.activeCity.shipyard.level + 1));

const def = computed(
  () =>
    CONTROLLER.constructions.find(
      (item) => item.id === `navy_${PLAYER.activeCity.id}`,
    ) as ConstructionTime,
);

const units = reactive({
  boats: 0,
});

const onSet = () => {
  const wood = Number(units.boats) * 200;
  const stone = Number(units.boats) * 0;
  const sulfur = Number(units.boats) * 50;
  const crystal = Number(units.boats) * 0;

  if (
    PLAYER.activeCity.cityhall.wood.acc >= wood &&
    PLAYER.activeCity.cityhall.stone.acc >= stone &&
    PLAYER.activeCity.cityhall.crystal.acc >= crystal &&
    PLAYER.activeCity.cityhall.sulfur.acc >= sulfur
  ) {
    const index = PLAYER.activeCity.id + 1;
    CONTROLLER.units[index]!.finish = false;
    CONTROLLER.units[index]!.start = true;

    let value = 0;
    value += Number(units.boats) * 15;

    CONTROLLER.units[index]!.value = value;

    CONTROLLER.units[index]!.values = {
      wood,
      stone,
      sulfur,
      crystal,
      boats: Number(units.boats),
    };
  }

  units.boats = 0;
};

const onUpgrade = () => {
  const levelTarget = PLAYER.activeCity.cityhall.level + 1;

  const upg = ShipyardUpgrade(levelTarget);

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
        (item) => item.id === `navy_${PLAYER.activeCity.id}`,
      ) as ConstructionTime;
      const cityIndex = CONTROLLER.constructions.indexOf(city);

      CONTROLLER.constructions[cityIndex]!.finish = false;
      CONTROLLER.constructions[cityIndex]!.start = true;

      resources.value = NavyUpgrade(levelTarget + 1);
    }
  }
};
</script>
