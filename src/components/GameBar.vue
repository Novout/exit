<template>
  <div class="flex w-full items-center p-2 bg-bar">
    <div class="font-poppins flex items-center text-lg w-full">
      <div class="flex flex-col w-30">
        <button class="font-poppins p-5 flex items-center gap-5">
          <IconNavy class="w-6 h-6" /> {{ PLAYER.data.boats }}
        </button>
        <button class="p-5 font-poppins flex items-center gap-5 justify-center">
          <div>
            <IconGold class="w-6 h-6" />
            {{ PLAYER.data.gold.acc }}
          </div>
          <p
            class="px-2 rounded-full"
            :class="[PLAYER.data.gold.set >= 0 ? 'bg-green' : 'bg-red']"
          >
            {{ PLAYER.data.gold.set }}
          </p>
        </button>
      </div>
      <div class="flex items-center flex-col pl-5">
        <select
          id="city-select"
          class="flex items-center flex-col pl-5 p-2 w-40 border-none shadow-xl"
          v-model="cityActive"
        >
          <option class="bg-white" :value="PLAYER.activeCity.cityhall.name">
            {{ PLAYER.activeCity.cityhall.name }}
          </option>
          <option
            class="bg-white"
            v-for="(city, index) in PLAYER.data.cities"
            :value="city.cityhall.name"
            :key="index"
          >
            {{ city.cityhall.name }}
          </option>
        </select>
        <p class="text-sm">
          Population: {{ PLAYER.activeCity.cityhall.population.acc }} /
          {{ PLAYER.activeCity.cityhall.population.maxAcc }} | Workers:
          {{ workers }}
        </p>
        <div
          class="flex px-5 flex-wrap justify-center items-center gap-5 text-sm"
        >
          <p class="flex items-center">
            <IconWood class="w-6 h-6" />{{
              PLAYER.activeCity.cityhall.wood.acc
            }}
            / {{ PLAYER.activeCity.cityhall.wood.maxAcc }} / +{{
              PLAYER.activeCity.locksmith.workers * 4
            }}
          </p>
          <p class="flex items-center">
            <IconStone class="w-6 h-6" />{{
              PLAYER.activeCity.cityhall.stone.acc
            }}
            / {{ PLAYER.activeCity.cityhall.stone.maxAcc }} / +{{
              PLAYER.activeCity.type === "stone"
                ? PLAYER.activeCity.bonus.workers * 4
                : 0
            }}
          </p>
          <p class="flex items-center">
            <IconWine class="w-6 h-6" />{{
              PLAYER.activeCity.cityhall.wine.acc
            }}
            / {{ PLAYER.activeCity.cityhall.wine.maxAcc }} / +{{
              PLAYER.activeCity.type === "wine"
                ? PLAYER.activeCity.bonus.workers * 4
                : 0
            }}
          </p>
          <p class="flex items-center">
            <IconCrystal class="w-6 h-6" />{{
              PLAYER.activeCity.cityhall.crystal.acc
            }}
            / {{ PLAYER.activeCity.cityhall.crystal.maxAcc }} / +{{
              PLAYER.activeCity.type === "crystal"
                ? PLAYER.activeCity.bonus.workers * 4
                : 0
            }}
          </p>
          <p class="flex items-center">
            <IconSulfur class="w-6 h-6" />{{
              PLAYER.activeCity.cityhall.sulfur.acc
            }}
            / {{ PLAYER.activeCity.cityhall.sulfur.maxAcc }} / +{{
              PLAYER.activeCity.type === "sulfur"
                ? PLAYER.activeCity.bonus.workers * 4
                : 0
            }}
          </p>
        </div>
      </div>
      <div>
        <button class="p-2">
          <IconWorld
            @click="CYCLE.type = 'world'"
            class="h-10 w-10 md:w-13 md:h-13 2xl:h-18 2xl:w-18"
          />
        </button>
        <button class="p-2">
          <IconIsland
            @click="CYCLE.type = 'island'"
            class="h-10 w-10 md:w-13 md:h-13 2xl:h-18 2xl:w-18"
          />
        </button>
        <button class="p-2">
          <IconCityHall
            @click="CYCLE.type = 'city'"
            class="h-10 w-10 md:w-13 md:h-13 2xl:h-18 2xl:w-18"
          />
        </button>
      </div>
    </div>
    <div class="w-120">
      <button @click="STRUCTURE.notifies.modal = true" class="p-2">
        <IconEvents class="h-10 w-10 md:w-13 md:h-13 2xl:h-18 2xl:w-18" />
        <p
          v-if="PLAYER.data.notifies > 0"
          class="absolute flex items-center justify-center px-2 top-23 text-md rounded-full bg-red-4 text-white p-1 w-4"
        >
          {{ PLAYER.data.notifies }}
        </p>
      </button>
      <button @click="STRUCTURE.military_base.modal = true" class="p-2">
        <IconMilitary class="h-10 w-10 md:w-13 md:h-13 2xl:h-18 2xl:w-18" />
      </button>
      <button @click="STRUCTURE.points.modal = true" class="p-2">
        <IconScience class="h-10 w-10 md:w-13 md:h-13 2xl:h-18 2xl:w-18" />
        <p
          v-if="PLAYER.data.science.points > 0"
          class="absolute flex items-center justify-center px-2 top-23 text-md rounded-full bg-blue-4 text-white p-1 w-4"
        >
          {{ PLAYER.data.science.points }}
        </p>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { usePlayerStore } from "../store/player";
import { useCycleStore } from "../store/cycle";
import { useStructureStore } from "../store/structure";

const PLAYER = usePlayerStore();
const CYCLE = useCycleStore();
const STRUCTURE = useStructureStore();

const cityActive = ref(PLAYER.activeCityName);

const workers = computed(
  () =>
    Number(PLAYER.activeCity.tavern.workers) +
    Number(PLAYER.activeCity.science.workers),
);

watch(
  computed(() => PLAYER.activeCity.cityhall.name),
  (name) => {
    cityActive.value = name;
  },
);

watch(cityActive, (cityName) => {
  const oldCity = PLAYER.activeCity;
  PLAYER.data.cities.unshift(oldCity);

  const newCity = PLAYER.data.cities.find(
    (city) => city.cityhall.name === cityName,
  );
  PLAYER.data.cities = PLAYER.data.cities.filter(
    (city) => city.cityhall.name !== cityName,
  );

  if (newCity) PLAYER.activeCity = newCity;
});
</script>

<style lang="css">
.bg-bar {
  background: rgb(231, 187, 116);
}
</style>
