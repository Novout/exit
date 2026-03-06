<template>
  <div class="overflow-scroll min-h-100vh w-full">
    <div class="absolute" :style="{ left: `${city.x * 50}px`, top: `${(city.y * 50) + 200}px`, color: `${city.owner === 'main' ? 'green' : 'black'}` }" v-for="(city, index) in cities" :key="index">
      <p v-if="city.name && city.owner">{{ city.name }}</p>
      <IconCityHall class="h-20 w-20 cursor-pointer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePlayerStore } from '../store/player';
import { useWolrdStore } from '../store/world';
import type { IslandCity } from '../types';

const WORLD = useWolrdStore()
const PLAYER = usePlayerStore()

const cities = ref<IslandCity[]>([])

onMounted(() => {
  const island = WORLD.islands.find((island) => island.x === PLAYER.data.island.x && PLAYER.data.island.y === island.y)

  if(island) cities.value = island?.cities
})
</script>