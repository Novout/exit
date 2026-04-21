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
      <label class="flex gap-4" for="volume"
        >{{ units.spearman }} / {{ 10 }} Spearmans
        <div class="flex items-center gap-1">
          <IconMoney class="w-6 h-6" />1
        </div></label
      >
      <input
        :disabled="
          PLAYER.activeCity.military.level < 2 && !CONTROLLER?.points[1]?.finish
        "
        type="range"
        id="volume"
        name="volume"
        v-model="units.archer"
        :min="0"
        :max="10"
      />
      <label class="flex gap-4" for="volume"
        >{{ units.archer }} / {{ 10 }} Archer
        <div class="flex items-center gap-1">
          <IconMoney class="w-6 h-6" />2
        </div></label
      >
      <input
        :disabled="
          PLAYER.activeCity.military.level < 3 && !CONTROLLER?.points[4]?.finish
        "
        type="range"
        id="volume"
        name="volume"
        v-model="units.catapult"
        :min="0"
        :max="10"
      />
      <label class="flex gap-4" for="volume"
        >{{ units.hoplita }} / {{ 10 }} Hoplita
        <div class="flex items-center gap-1">
          <IconMoney class="w-6 h-6" />4
        </div></label
      >
      <input
        :disabled="
          PLAYER.activeCity.military.level < 5 && !CONTROLLER?.points[5]?.finish
        "
        type="range"
        id="volume"
        name="volume"
        v-model="units.mech"
        :min="0"
        :max="10"
      />
      <label class="flex gap-4" for="volume"
        >{{ units.catapult }} / {{ 10 }} Catapult
        <div class="flex items-center gap-1">
          <IconMoney class="w-6 h-6" />6
        </div></label
      >
      <input
        :disabled="
          PLAYER.activeCity.military.level < 4 && !CONTROLLER?.points[3]?.finish
        "
        type="range"
        id="volume"
        name="volume"
        v-model="units.hoplita"
        :min="0"
        :max="10"
      />
      <label class="flex gap-4" for="volume"
        >{{ units.mech }} / {{ 10 }} Mech
        <div class="flex items-center gap-1">
          <IconMoney class="w-6 h-6" />10
        </div></label
      >
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
      <p v-if="CONTROLLER.units[0]!.value > 0">
        {{ computed(() => format(CONTROLLER.units[0]!.value as any)) }}
      </p>
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
      (item) => item.id === `military_${PLAYER.activeCity.id}`,
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
    Number(units.archer) * 20 +
    Number(units.catapult) * 70 +
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
    const index = PLAYER.activeCity.id;
    CONTROLLER.units[index]!.finish = false;
    CONTROLLER.units[index]!.start = true;

    let value = 0;
    value += Number(units.spearman) * 3;
    value += Number(units.archer) * 4;
    value += Number(units.hoplita) * 6;
    value += Number(units.catapult) * 10;
    value += Number(units.mech) * 37;

    CONTROLLER.units[index]!.value = value;

    CONTROLLER.units[index]!.values = {
      wood,
      stone,
      sulfur,
      crystal,
      spearman: Number(units.spearman),
      archer: Number(units.archer),
      hoplita: Number(units.hoplita),
      catapult: Number(units.catapult),
      mech: Number(units.mech),
    };
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
        (item) => item.id === `military_${PLAYER.activeCity.id}`,
      ) as ConstructionTime;
      const cityIndex = CONTROLLER.constructions.indexOf(city);

      CONTROLLER.constructions[cityIndex]!.finish = false;
      CONTROLLER.constructions[cityIndex]!.start = true;

      resources.value = MilitaryUpgrade(levelTarget + 1);
    }
  }
};
</script>
