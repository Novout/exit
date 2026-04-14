<template>
  <StructureModal name="Military Base">
    <div class="flex flex-col gap-2 w-full">
      <p>Level: {{ PLAYER.activeCity.military.level }}</p>
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
        v-model="units.spearman"
        :min="0"
        :max="10"
      />
      <label for="volume">{{ units.spearman }} / {{ 10 }} Spearmans</label>
      <input
        :disabled="PLAYER.activeCity.military.level < 2"
        type="range"
        id="volume"
        name="volume"
        v-model="units.archer"
        :min="0"
        :max="10"
      />
      <label for="volume">{{ units.archer }} / {{ 10 }} Archer</label>
      <input
        :disabled="PLAYER.activeCity.military.level < 3"
        type="range"
        id="volume"
        name="volume"
        v-model="units.catapult"
        :min="0"
        :max="10"
      />
      <label for="volume">{{ units.catapult }} / {{ 10 }} Catapult</label>
      <input
        :disabled="PLAYER.activeCity.military.level < 4"
        type="range"
        id="volume"
        name="volume"
        v-model="units.hoplita"
        :min="0"
        :max="10"
      />
      <label for="volume">{{ units.hoplita }} / {{ 10 }} Hoplita</label>
      <input
        :disabled="PLAYER.activeCity.military.level < 5"
        type="range"
        id="volume"
        name="volume"
        v-model="units.mech"
        :min="0"
        :max="10"
      />
      <label for="volume">{{ units.mech }} / {{ 10 }} Mech</label>
      <ResourcesBar
        :resources="{
          wood:
            Number(units.spearman) * 30 +
            Number(units.archer) * 40 +
            Number(units.catapult) * 120 +
            Number(units.hoplita) * 50 +
            Number(units.mech * 250),
          stone:
            Number(units.spearman) * 0 +
            Number(units.archer) * 0 +
            Number(units.catapult) * 80 +
            Number(units.hoplita) * 0 +
            Number(units.mech * 180),
          sulfur:
            Number(units.spearman) * 0 +
            Number(units.archer) * 0 +
            Number(units.catapult) * 60 +
            Number(units.hoplita) * 50 +
            Number(units.mech * 250),
          wine:
            Number(units.spearman) * 0 +
            Number(units.archer) * 0 +
            Number(units.catapult) * 0 +
            Number(units.hoplita) * 0 +
            Number(units.mech * 0),
          crystal:
            Number(units.spearman) * 0 +
            Number(units.archer) * 0 +
            Number(units.catapult) * 0 +
            Number(units.hoplita) * 0 +
            Number(units.mech * 120),
        }"
      />
      <Button @click="onSet">Set</Button>
      <p v-if="def.start && !def.finish">
        {{
          computed(() =>
            format(def.level[PLAYER.activeCity.military.level + 1]),
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
import { MilitaryUpgrade } from "../../../../defines/upgrades";
import { usePlayerStore } from "../../../../store/player";
import type { ConstructionTime } from "../../../../types";
import { format } from "../../../../utils";
import { useControllerStore } from "../../../../store/controller";

const PLAYER = usePlayerStore();
const CONTROLLER = useControllerStore();

const resources = ref(MilitaryUpgrade(PLAYER.activeCity.military.level + 1));

const def = computed(
  () =>
    CONTROLLER.constructions.find(
      (item) => item.id === "military",
    ) as ConstructionTime,
);

const units = reactive({
  spearman: 0,
  archer: 0,
  hoplita: 0,
  mech: 0,
  catapult: 0,
});

const onSet = () => {
  const wood =
    Number(units.spearman) * 30 +
    Number(units.archer) * 40 +
    Number(units.catapult) * 120 +
    Number(units.hoplita) * 50 +
    Number(units.mech * 250);
  const stone =
    Number(units.spearman) * 0 +
    Number(units.archer) * 0 +
    Number(units.catapult) * 80 +
    Number(units.hoplita) * 0 +
    Number(units.mech * 180);
  const sulfur =
    Number(units.spearman) * 0 +
    Number(units.archer) * 0 +
    Number(units.catapult) * 60 +
    Number(units.hoplita) * 50 +
    Number(units.mech * 250);
  const crystal =
    Number(units.spearman) * 0 +
    Number(units.archer) * 0 +
    Number(units.catapult) * 0 +
    Number(units.hoplita) * 0 +
    Number(units.mech * 120);

  if (
    PLAYER.activeCity.cityhall.wood.acc >= wood &&
    PLAYER.activeCity.cityhall.stone.acc >= stone &&
    PLAYER.activeCity.cityhall.crystal.acc >= crystal &&
    PLAYER.activeCity.cityhall.sulfur.acc >= sulfur
  ) {
    PLAYER.activeCity.cityhall.wood.acc -= wood;
    PLAYER.activeCity.cityhall.stone.acc -= stone;
    PLAYER.activeCity.cityhall.sulfur.acc -= sulfur;
    PLAYER.activeCity.cityhall.crystal.acc -= crystal;

    PLAYER.activeCity.soldiers = PLAYER.activeCity.soldiers.map((soldier) => {
      if (soldier.type === "spearman") soldier.units += Number(units.spearman);
      if (soldier.type === "archer") soldier.units += Number(units.archer);
      if (soldier.type === "hoplita") soldier.units += Number(units.hoplita);
      if (soldier.type === "catapult") soldier.units += Number(units.catapult);
      if (soldier.type === "mech") soldier.units += Number(units.mech);

      return soldier;
    });
  }

  units.spearman = 0;
  units.archer = 0;
  units.hoplita = 0;
  units.mech = 0;
  units.catapult = 0;
};

const onUpgrade = () => {
  const levelTarget = PLAYER.activeCity.military.level + 1;

  const upg = MilitaryUpgrade(levelTarget);

  if (upg) {
    const dmgWood = upg.wood;
    const dmgStone = upg.stone;

    if (
      !def.value.start &&
      PLAYER.activeCity.cityhall.wood.acc >= dmgWood &&
      PLAYER.activeCity.cityhall.stone.acc >= dmgStone
    ) {
      PLAYER.activeCity.cityhall.wood.acc -= upg.wood;
      PLAYER.activeCity.cityhall.stone.acc -= upg.stone;

      const city = CONTROLLER.constructions.find(
        (item) => item.id === "military",
      ) as ConstructionTime;
      const cityIndex = CONTROLLER.constructions.indexOf(city);

      CONTROLLER.constructions[cityIndex]!.finish = false;
      CONTROLLER.constructions[cityIndex]!.start = true;

      resources.value = MilitaryUpgrade(levelTarget + 1);
    }
  }
};
</script>
