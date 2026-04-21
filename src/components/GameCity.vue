<template>
  <div
    class="grid px-5 py-10 grid-cols-5 grid-rows-7 gap-10 w-full bg-1 h-90vh"
  >
    <p></p>
    <GameMainButton @click="STRUCTURE.cityhall.modal = true" class="bg-emerald">
      City Hall
    </GameMainButton>
    <GameMainButton @click="STRUCTURE.storage.modal = true" class="bg-cyan">
      Storage
    </GameMainButton>
    <GameMainButton @click="STRUCTURE.market.modal = true" class="bg-amber">
      Market
    </GameMainButton>
    <p></p>
    <p></p>
    <p></p>
    <GameMainButton @click="STRUCTURE.military.modal = true" class="bg-red">
      Military
    </GameMainButton>
    <p></p>
    <p></p>
    <p></p>
    <GameMainButton @click="STRUCTURE.science.modal = true" class="bg-lime">
      Science
    </GameMainButton>
    <GameMainButton @click="STRUCTURE.tavern.modal = true" class="bg-pink">
      Tavern
    </GameMainButton>
    <p></p>
    <p></p>
    <GameMainButton @click="STRUCTURE.palace.modal = true" class="bg-purple">
      Palace
    </GameMainButton>
    <p></p>
    <GameMainButton @click="STRUCTURE.wall.modal = true" class="bg-yellow">
      Wall
    </GameMainButton>
    <p></p>
    <p></p>
    <p></p>
    <GameMainButton @click="STRUCTURE.navy.modal = true" class="bg-blue">
      Shipyard
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
    rgba(166, 156, 83, 1) 55%,
    rgba(91, 125, 144, 1) 60%,
    rgba(55, 65, 81, 1) 100%
  );
}
</style>
