<template>
  <StructureModal name="Shipyard">
    <div class="flex flex-col gap-3 w-full">
      <p class="text-xs text-gray-400 uppercase tracking-widest">Shipyard Lv. {{ PLAYER.activeCity.shipyard.level }}</p>

      <!-- Fleet summary -->
      <div class="fleet-summary">
        <div v-for="ship in PLAYER.activeCity.navySoldiers" :key="ship.type" class="fleet-row">
          <component :is="iconFor(ship.type)" class="w-5 h-5" />
          <span class="fleet-label">{{ ship.type }}</span>
          <span class="fleet-count">{{ ship.units }}</span>
        </div>
      </div>

      <div class="divider" />

      <!-- Naval unit recruitment -->
      <p class="section-title">Recruit Fleet</p>

      <div class="unit-row">
        <IconGalley class="w-5 h-5" />
        <div class="flex-1">
          <input type="range" v-model="recruit.galley" :min="0" :max="10" class="w-full" />
          <label class="unit-label">
            {{ recruit.galley }} Galleys
            <span class="cost-chip">{{ recruit.galley * 80 }}w / {{ recruit.galley * 20 }}s</span>
          </label>
        </div>
      </div>

      <div class="unit-row" :class="{ 'opacity-40': PLAYER.activeCity.shipyard.level < 2 }">
        <IconTrireme class="w-5 h-5" />
        <div class="flex-1">
          <input type="range" v-model="recruit.trireme" :min="0" :max="10"
            :disabled="PLAYER.activeCity.shipyard.level < 2" class="w-full" />
          <label class="unit-label">
            {{ recruit.trireme }} Triremes
            <span class="cost-chip">{{ recruit.trireme * 200 }}w / {{ recruit.trireme * 60 }}s / {{ recruit.trireme * 30 }}st</span>
          </label>
        </div>
      </div>

      <div class="unit-row" :class="{ 'opacity-40': PLAYER.activeCity.shipyard.level < 4 }">
        <IconWarship class="w-5 h-5" />
        <div class="flex-1">
          <input type="range" v-model="recruit.warship" :min="0" :max="5"
            :disabled="PLAYER.activeCity.shipyard.level < 4" class="w-full" />
          <label class="unit-label">
            {{ recruit.warship }} Warships
            <span class="cost-chip">{{ recruit.warship * 400 }}w / {{ recruit.warship * 120 }}s / {{ recruit.warship * 80 }}st / {{ recruit.warship * 40 }}cr</span>
          </label>
        </div>
      </div>

      <ResourcesBar :resources="recruitCost" />
      <Button @click="onRecruit">Recruit</Button>

      <p v-if="CONTROLLER.units[2]!.start && !CONTROLLER.units[2]!.finish" class="text-xs text-gray-400">
        {{ format(CONTROLLER.units[2]!.value) }}
      </p>

      <div class="divider" />

      <!-- Boats (transport) -->
      <p class="section-title">Transport Boats</p>
      <input type="range" v-model="boats.count" :min="0" :max="10" class="w-full" />
      <label class="unit-label">
        {{ boats.count }} / 10 Boats
        <span class="cost-chip">{{ boats.count * 200 }}w / {{ boats.count * 50 }}s</span>
      </label>
      <ResourcesBar :resources="{ wood: boats.count * 200, stone: 0, sulfur: boats.count * 50, wine: 0, crystal: 0 }" />
      <Button @click="onBoats">Set Boats</Button>

      <p v-if="CONTROLLER.units[1]!.value > 0" class="text-xs text-gray-400">
        {{ format(CONTROLLER.units[1]!.value) }}
      </p>

      <div class="divider" />

      <!-- Upgrade -->
      <div class="flex pt-1 w-full justify-between items-center">
        <ResourcesBar :resources="upgradeResources" />
        <Button @click="onUpgrade">Upgrade</Button>
      </div>
      <p v-if="upgradeDef.start && !upgradeDef.finish" class="text-xs text-gray-400">
        {{ format(upgradeDef.level[PLAYER.activeCity.shipyard.level + 1]) }}
      </p>
    </div>
  </StructureModal>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { ShipyardUpgrade, NavalUnitCost } from "../../../../defines/upgrades";
import { usePlayerStore } from "../../../../store/player";
import { useControllerStore } from "../../../../store/controller";
import type { ConstructionTime } from "../../../../types";
import { format } from "../../../../utils";

const PLAYER = usePlayerStore();
const CONTROLLER = useControllerStore();

const upgradeResources = ref(ShipyardUpgrade(PLAYER.activeCity.shipyard.level + 1));

const upgradeDef = computed(
  () =>
    CONTROLLER.constructions.find(
      (item) => item.id === `navy_${PLAYER.activeCity.id}`,
    ) as ConstructionTime,
);

const recruit = reactive({ galley: 0, trireme: 0, warship: 0 });
const boats = reactive({ count: 0 });

const recruitCost = computed(() => {
  const g = NavalUnitCost("galley",  recruit.galley);
  const t = NavalUnitCost("trireme", recruit.trireme);
  const w = NavalUnitCost("warship", recruit.warship);
  return {
    wood:    g.wood    + t.wood    + w.wood,
    sulfur:  g.sulfur  + t.sulfur  + w.sulfur,
    stone:   g.stone   + t.stone   + w.stone,
    wine:    0,
    crystal: g.crystal + t.crystal + w.crystal,
  };
});

const iconFor = (type: string) => {
  if (type === "galley")  return "IconGalley";
  if (type === "trireme") return "IconTrireme";
  return "IconWarship";
};

const onRecruit = () => {
  const cost = recruitCost.value;
  const city = PLAYER.activeCity;

  if (
    city.cityhall.wood.acc    >= cost.wood    &&
    city.cityhall.sulfur.acc  >= cost.sulfur  &&
    city.cityhall.stone.acc   >= cost.stone   &&
    city.cityhall.crystal.acc >= cost.crystal &&
    !CONTROLLER.units[2]!.start
  ) {
    const trainTime =
      recruit.galley  * 8  +
      recruit.trireme * 18 +
      recruit.warship * 35;

    CONTROLLER.units[2]!.finish = false;
    CONTROLLER.units[2]!.start  = true;
    CONTROLLER.units[2]!.value  = trainTime;
    CONTROLLER.units[2]!.values = {
      galley:  recruit.galley,
      trireme: recruit.trireme,
      warship: recruit.warship,
      wood:    cost.wood,
      sulfur:  cost.sulfur,
      stone:   cost.stone,
      crystal: cost.crystal,
    };

    city.cityhall.wood.acc    -= cost.wood;
    city.cityhall.sulfur.acc  -= cost.sulfur;
    city.cityhall.stone.acc   -= cost.stone;
    city.cityhall.crystal.acc -= cost.crystal;

    recruit.galley = recruit.trireme = recruit.warship = 0;
  }
};

const onBoats = () => {
  const wood   = boats.count * 200;
  const sulfur = boats.count * 50;
  const city   = PLAYER.activeCity;

  if (city.cityhall.wood.acc >= wood && city.cityhall.sulfur.acc >= sulfur) {
    const index = PLAYER.activeCity.id + 1;
    CONTROLLER.units[index]!.finish = false;
    CONTROLLER.units[index]!.start  = true;
    CONTROLLER.units[index]!.value  = boats.count * 15;
    CONTROLLER.units[index]!.values = { wood, stone: 0, sulfur, crystal: 0, boats: boats.count };
    boats.count = 0;
  }
};

const onUpgrade = () => {
  const levelTarget = PLAYER.activeCity.shipyard.level + 1;
  const upg = ShipyardUpgrade(levelTarget);
  if (!upg) return;

  const city = PLAYER.activeCity;
  if (
    !upgradeDef.value.start &&
    city.cityhall.wood.acc  >= upg.wood &&
    city.cityhall.stone.acc >= upg.stone
  ) {
    city.cityhall.wood.acc  -= upg.wood;
    city.cityhall.stone.acc -= upg.stone;

    const idx = CONTROLLER.constructions.indexOf(upgradeDef.value);
    CONTROLLER.constructions[idx]!.finish = false;
    CONTROLLER.constructions[idx]!.start  = true;

    upgradeResources.value = ShipyardUpgrade(levelTarget + 1);
  }
};
</script>

<style scoped>
.divider {
  border-top: 1px solid #3a3a3a;
  margin: 0.25rem 0;
}

.section-title {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #888;
}

.fleet-summary {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.fleet-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
}

.fleet-label {
  flex: 1;
  color: #aaa;
  text-transform: capitalize;
}

.fleet-count {
  color: #d0d0d0;
  font-variant-numeric: tabular-nums;
}

.unit-row {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.unit-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #aaa;
}

.cost-chip {
  font-size: 0.7rem;
  color: #666;
}
</style>
