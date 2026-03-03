<template>
  <div class="w-full">
    <GameMainButton @click="STRUCTURE.cityhall.modal = true" class="absolute left-200 top-120 bg-emerald">
      Prefeitura
    </GameMainButton>
    <GameMainButton @click="STRUCTURE.store.modal = true" class="absolute left-300 top-150 bg-cyan">
      Armazen
    </GameMainButton>
     <GameMainButton @click="STRUCTURE.military.modal = true" class="absolute left-110 top-120 bg-gradient-from-lime">
      Área Militar
    </GameMainButton>
  </div>
  <Modal>
    <CityHall v-if="STRUCTURE.cityhall.modal" />
    <Military v-else-if="STRUCTURE.military.modal" />
  </Modal>
</template>

<script setup lang="ts">
import { usePlayerStore } from '../store/player';
import { useStructureStore } from '../store/structure';

const STRUCTURE = useStructureStore()
const PLAYER = usePlayerStore()
</script>