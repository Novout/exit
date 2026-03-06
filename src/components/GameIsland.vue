<template>
  <div class="overflow-scroll min-h-100vh w-full">
    <div class="absolute" :style="{ left: `${city.x * 50}px`, top: `${(city.y * 50) + 200}px`, color: `${city.owner === 'main' ? 'green' : 'black'}` }" v-for="(city, index) in cities" :key="index">
      <p v-if="city.name && city.owner">{{ city.name }}</p>
      <IconCityHall class="h-20 w-20 cursor-pointer" />
    </div>
    <div class="absolute left-100 top-100">
      <IconWood class="w-20 h-20" />
    </div>
    <div class="absolute left-150 top-100">
      <IconStone v-if="PLAYER.data.island.type === 'stone'" class="w-20 h-20" />
      <IconWine v-else-if="PLAYER.data.island.type === 'wine'" class="w-20 h-20" />
      <IconCrystal v-else-if="PLAYER.data.island.type === 'crystal'" class="w-20 h-20" />
      <IconSulfur v-else-if="PLAYER.data.island.type === 'sulfur'" class="w-20 h-20" />
    </div>
    <Modal>
      <CityHall v-if="STRUCTURE.wood.modal" />
      <Military v-else-if="STRUCTURE.resource.modal" />
    </Modal>
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