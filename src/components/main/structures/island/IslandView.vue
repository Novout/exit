<template>
  <div class="absolute z-99 p-4 top-40 left-10 text-md font-poppins flex items-center flex-col w-20 bg-gray text-white rounded-lg">
    <p v-if="world.cityActive?.name">{{ world.cityActive!.name }}</p>
    <p>{{ world.cityActive!.owner || 'None' }}</p>
    <p>{{ world.cityActive!.type }}</p>
    <p>x: {{ world.cityActive!.x }} y {{ world!.cityActive!.y }}</p>
    <Button v-if="!world.cityActive?.owner">Colonize</Button>
    <Button v-else-if="world.cityActive?.owner !== 'main'">Attack</Button>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '../../../../store/player';
import { useWolrdStore } from '../../../../store/world';

const PLAYER = usePlayerStore()

const world = useWolrdStore()
</script>