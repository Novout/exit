<template>
  <div class="w-full bg-1 h-100vh">
    <GameMainButton
      @click="STRUCTURE.cityhall.modal = true"
      class="absolute left-200 top-120 bg-emerald"
    >
      City Hall
    </GameMainButton>
    <GameMainButton
      @click="STRUCTURE.storage.modal = true"
      class="absolute left-300 top-150 bg-cyan"
    >
      Storage
    </GameMainButton>
    <GameMainButton
      @click="STRUCTURE.market.modal = true"
      class="absolute left-270 top-70 bg-amber"
    >
      Market
    </GameMainButton>
    <GameMainButton
      @click="STRUCTURE.military.modal = true"
      class="absolute left-110 top-120 bg-red"
    >
      Military
    </GameMainButton>
    <GameMainButton
      @click="STRUCTURE.science.modal = true"
      class="absolute left-140 top-70 bg-lime"
    >
      Science
    </GameMainButton>
    <GameMainButton
      @click="STRUCTURE.tavern.modal = true"
      class="absolute left-80 top-150 bg-pink"
    >
      Tavern
    </GameMainButton>
    <GameMainButton
      @click="STRUCTURE.navy.modal = true"
      class="absolute left-200 top-200 bg-blue"
    >
      Shipyard
    </GameMainButton>
    <GameMainButton
      @click="STRUCTURE.palace.modal = true"
      class="absolute left-190 top-50 bg-purple"
    >
      Palace
    </GameMainButton>
    <GameMainButton
      @click="STRUCTURE.wall.modal = true"
      class="absolute left-100 top-45 bg-yellow"
    >
      Wall
    </GameMainButton>
  </div>
  <Modal>
    <CityHall v-if="STRUCTURE.cityhall.modal" />
    <Military v-else-if="STRUCTURE.military.modal" />
    <Storage v-else-if="STRUCTURE.storage.modal" />
    <Science v-else-if="STRUCTURE.science.modal" />
    <Tavern v-else-if="STRUCTURE.tavern.modal" />
    <Navy v-else-if="STRUCTURE.navy.modal" />
    <Market v-else-if="STRUCTURE.market.modal" />
    <Palace v-else-if="STRUCTURE.palace.modal" />
    <Wall v-else-if="STRUCTURE.wall.modal" />
    <Points v-else-if="STRUCTURE.points.modal" />
    <Events v-else-if="STRUCTURE.notifies.modal" />
  </Modal>
</template>

<script setup lang="ts">
import { useStructureStore } from "../store/structure";

const STRUCTURE = useStructureStore();
</script>

<style lang="css">
.bg-1 {
  background: #bd9960;
  background: linear-gradient(
    180deg,
    rgb(231, 187, 116) 0%,
    rgb(206, 168, 112) 49%,
    rgba(166, 156, 83, 1) 62%,
    rgba(91, 125, 144, 1) 70%,
    rgba(55, 65, 81, 1) 100%
  );
}
</style>
