<template>
  <div class="bg-blue overflow-scroll min-h-100vh w-full">
    <div class="absolute" :style="{ left: `${island.x * 50}px`, top: `${(island.y * 50) + 200}px`, color: `${PLAYER.data.island.x === island.x && PLAYER.data.island.y === island.y ? 'green' : 'black'}`}" v-for="island in WORLD.islands">
      <IconIsland class="h-20 w-20  cursor-pointer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '../store/player';
import { useWolrdStore } from '../store/world';

const WORLD = useWolrdStore()
const PLAYER = usePlayerStore()
</script>