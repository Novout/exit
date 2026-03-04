<template>
  <div class="w-full">
    <GameMainButton @click="STRUCTURE.cityhall.modal = true" class="absolute left-200 top-120 bg-emerald">
      City Hall
    </GameMainButton>
    <GameMainButton @click="STRUCTURE.storage.modal = true" class="absolute left-300 top-150 bg-cyan">
      Storage
    </GameMainButton>
     <GameMainButton @click="STRUCTURE.military.modal = true" class="absolute left-110 top-120 bg-gradient-from-lime">
      Military
    </GameMainButton>
    <GameMainButton @click="STRUCTURE.science.modal = true" class="absolute left-140 top-70 bg-blue">
      Science
    </GameMainButton>
     <GameMainButton @click="STRUCTURE.tavern.modal = true" class="absolute left-80 top-150 bg-pink">
      Tavern
    </GameMainButton>
  </div>
  <Modal>
    <CityHall v-if="STRUCTURE.cityhall.modal" />
    <Military v-else-if="STRUCTURE.military.modal" />
    <Storage v-else-if="STRUCTURE.storage.modal" />
    <Science v-else-if="STRUCTURE.science.modal" />
    <Tavern v-else-if="STRUCTURE.tavern.modal" />
  </Modal>
</template>

<script setup lang="ts">
import { useStructureStore } from '../store/structure';

const STRUCTURE = useStructureStore()
</script>