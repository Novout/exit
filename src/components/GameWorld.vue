<template>
  <div class="bg-blue overflow-scroll min-h-100vh w-full">
    <div
      @click="onIsland(island)"
      class="absolute"
      :style="{
        left: `${island.x * 50}px`,
        top: `${island.y * 50 + 200}px`,
        color: `${island.cities.some((city) => city.owner === 'main') ? 'green' : 'black'}`,
      }"
      v-for="island in WORLD.islands"
    >
      <IconIsland class="h-20 w-20 cursor-pointer" />
      <IconStone v-if="island.type === 'stone'" class="w-7 h-7" />
      <IconWine v-else-if="island.type === 'wine'" class="w-7 h-7" />
      <IconCrystal v-else-if="island.type === 'crystal'" class="w-7 h-7" />
      <IconSulfur v-else-if="island.type === 'sulfur'" class="w-7 h-7" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCycleStore } from "../store/cycle";
import { usePlayerStore } from "../store/player";
import { useWolrdStore } from "../store/world";
import type { Island } from "../types";

const WORLD = useWolrdStore();
const PLAYER = usePlayerStore();
const CYCLE = useCycleStore();

const onIsland = (island: Island) => {
  PLAYER.data.island = island;

  CYCLE.type = "island";
};
</script>
