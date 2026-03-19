<template>
  <div class="overflow-scroll min-h-100vh w-full">
    <div class="absolute flex flex-col justify-center items-center cursor-pointer" :style="{ left: `${city.x * 70}px`, top: `${(city.y * 70) + 150}px`, color: `${city.owner === 'main' ? 'green' : 'black'}` }" v-for="(city, index) in cities" :key="index">
      <p v-if="city.name && city.owner">{{ city.name }}</p>
      <IconCityHall v-if="city.owner" @click="WORLD.cityActive = city" class="h-20 w-20 cursor-pointer" />
      <IconTerrain v-else @click="WORLD.cityActive = city" class="h-20 w-20 cursor-pointer" />
    </div>
    <div v-if="cities.some((city) => city.owner === 'main')" @click="STRUCTURE.wood.modal = true" class="absolute left-100 top-100 cursor-pointer">
      <IconWood class="w-20 h-20" />
    </div>
    <div @click="STRUCTURE.viking.modal = true" class="absolute left-160 top-150 cursor-pointer">
      <IconViking class="w-20 h-20" />
    </div>
    <div v-if="cities.some((city) => city.owner === 'main')" @click="STRUCTURE.resource.modal = true" class="absolute left-150 top-100 cursor-pointer">
      <IconStone v-if="PLAYER.data.island.type === 'stone'" class="w-20 h-20" />
      <IconWine v-else-if="PLAYER.data.island.type === 'wine'" class="w-20 h-20" />
      <IconCrystal v-else-if="PLAYER.data.island.type === 'crystal'" class="w-20 h-20" />
      <IconSulfur v-else-if="PLAYER.data.island.type === 'sulfur'" class="w-20 h-20" />
    </div>
    <Modal>
      <IslandWood v-if="STRUCTURE.wood.modal" />
      <IslandBonus v-else-if="STRUCTURE.resource.modal" />
      <IslandViking v-else-if="STRUCTURE.viking.modal" />
    </Modal>
    <IslandView />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePlayerStore } from '../store/player';
import { useWolrdStore } from '../store/world';
import type { IslandCity } from '../types';
import { useStructureStore } from '../store/structure';

const WORLD = useWolrdStore()
const PLAYER = usePlayerStore()
const STRUCTURE = useStructureStore()

const cities = ref<IslandCity[]>([])

onMounted(() => {
  const island = WORLD.islands.find((island) => island.x === PLAYER.data.island.x && PLAYER.data.island.y === island.y)

  if(island) cities.value = island?.cities
})
</script>