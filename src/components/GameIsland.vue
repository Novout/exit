<template>
  <div
    class="grid grid-cols-5 grid-rows-3 bg-bar overflow-scroll min-h-100vh w-full"
  >
    <div
      class="justify-center cursor-pointer"
      :style="{
        color: `${city.owner === 'main' ? 'green' : 'black'}`,
      }"
      v-for="(city, index) in cities"
      :key="index"
    >
      <p v-if="city.name && city.owner">{{ city.name }}</p>
      <IconCityHall
        v-if="city.owner"
        @click="WORLD.cityActive = city"
        :class="city.owner !== 'main' ? 'text-red' : ''"
        class="h-20 w-20 cursor-pointer"
      />
      <IconTerrain
        v-else
        @click="WORLD.cityActive = city"
        class="h-20 w-20 cursor-pointer"
      />
    </div>
    <div
      v-if="cities.some((city) => city.owner === 'main')"
      @click="STRUCTURE.wood.modal = true"
      class="cursor-pointer"
    >
      <IconWood class="w-20 h-20" />
    </div>
    <div
      v-if="cities.some((city) => city.owner === 'main')"
      @click="STRUCTURE.viking.modal = true"
      class="cursor-pointer"
    >
      <IconViking class="w-20 h-20" />
    </div>
    <div
      @click="STRUCTURE.resource.modal = true"
      v-if="cities.some((city) => city.owner === 'main')"
      class="cursor-pointer"
    >
      <IconStone v-if="PLAYER.data.island.type === 'stone'" class="w-20 h-20" />
      <IconWine
        v-else-if="PLAYER.data.island.type === 'wine'"
        class="w-20 h-20"
      />
      <IconCrystal
        v-else-if="PLAYER.data.island.type === 'crystal'"
        class="w-20 h-20"
      />
      <IconSulfur
        v-else-if="PLAYER.data.island.type === 'sulfur'"
        class="w-20 h-20"
      />
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
import { onMounted, ref } from "vue";
import { usePlayerStore } from "../store/player";
import { useWolrdStore } from "../store/world";
import type { IslandCity } from "../types";
import { useStructureStore } from "../store/structure";

const WORLD = useWolrdStore();
const PLAYER = usePlayerStore();
const STRUCTURE = useStructureStore();

const cities = ref<IslandCity[]>([]);

onMounted(() => {
  const island = WORLD.islands.find(
    (island) =>
      island.x === PLAYER.data.island.x && PLAYER.data.island.y === island.y,
  );

  if (island) cities.value = island?.cities;
});
</script>

<style lang="css">
.bg-bar {
  background: rgb(231, 187, 116);
}
</style>
