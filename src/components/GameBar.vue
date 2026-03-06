<template>
  <div class="flex w-full items-center justify-between p-2 bg-bar">
    <div class="font-poppins flex items-center text-lg w-600">
    <div class="flex flex-col w-30">
      <button class="p-5 flex items-center gap-5"><IconNavy class="w-6 h-6" /> {{ PLAYER.activeCity.navy.length }}</button>
      <button class="p-5 flex items-center gap-5 justify-center"><IconGold class="w-6 h-6" /> {{ PLAYER.data.gold.acc }} {{ PLAYER.data.gold.set }}</button>
    </div>
    <div class="flex items-center flex-col pl-5">
      <select id="city-select" class="flex items-center flex-col pl-5" v-model="PLAYER.activeCityName">
        <option v-for="(city, index) in PLAYER.data.cities" :value="city" :key="index">
          {{ city.cityhall.name }}
        </option>
      </select>
      <p class="text-sm">Population {{ PLAYER.activeCity.cityhall.population.acc }} / {{ PLAYER.activeCity.cityhall.population.maxAcc }} Workers {{ workers }} </p>
      <div class="flex items-center justify-between gap-5 text-sm">
        <p class="flex items-center"><IconWood class="w-6 h-6" />{{ PLAYER.activeCity.cityhall.wood.acc }} / {{ PLAYER.activeCity.cityhall.wood.maxAcc }}</p>
        <p class="flex items-center"><IconStone class="w-6 h-6" />{{ PLAYER.activeCity.cityhall.stone.acc }} / {{ PLAYER.activeCity.cityhall.stone.maxAcc }}</p>
        <p class="flex items-center"><IconWine class="w-6 h-6" />{{ PLAYER.activeCity.cityhall.wine.acc }} / {{ PLAYER.activeCity.cityhall.wine.maxAcc }}</p>
        <p class="flex items-center"><IconCrystal class="w-6 h-6" />{{ PLAYER.activeCity.cityhall.crystal.acc }} / {{ PLAYER.activeCity.cityhall.crystal.maxAcc }}</p>
        <p class="flex items-center"><IconSulfur class="w-6 h-6" />{{ PLAYER.activeCity.cityhall.sulfur.acc }} / {{ PLAYER.activeCity.cityhall.sulfur.maxAcc }}</p>
      </div>
    </div>
    <div class="pl-5">
      <button class="p-2"><IconWorld @click="CYCLE.type = 'world'" class="h-20 w-20"/></button>
      <button class="p-2"><IconIsland @click="CYCLE.type = 'island'" class="h-20 w-20"/></button>
      <button class="p-2"><IconCityHall @click="CYCLE.type = 'city'" class="h-20 w-20"/></button>
    </div>
  </div>
  <div class="w-full">
    <button class="p-2"><IconEvents class="h-20 w-20"/></button>
    <button class="p-2"><IconMilitary class="h-20 w-20"/></button>
    <button class="p-2"><IconScience class="h-20 w-20"/></button>
  </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { usePlayerStore } from '../store/player';
import { useCycleStore } from '../store/cycle';

const PLAYER = usePlayerStore()
const CYCLE = useCycleStore()

const workers = computed(() => Number(PLAYER.activeCity.tavern.workers) + Number(PLAYER.activeCity.science.workers))
</script>

<style lang="css">
.bg-bar {
  background: rgb(231, 187, 116);
}
</style>