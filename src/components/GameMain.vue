<template>
  <div class="w-full">
    <div class="flex flex-col gap-5">
      <p class="absolute left-204 top-100 text-black">Vida {{ PLAYER.fortress.life }} / 50</p>
      <p class="absolute left-204 top-105 text-black">Nível {{ PLAYER.fortress.level }} / 5</p>
      <p class="absolute left-204 top-110 text-black">Jogadas {{ PLAYER.turn.acc }} / {{ PLAYER.turn.max }}</p>
      <GameMainButton @click="STRUCTURE.fortress.modal = true" class="absolute left-200 top-120 bg-emerald">
        Fortaleza
      </GameMainButton>
    </div>
    <GameMainButton @click="STRUCTURE.void.modal = true" class="absolute left-300 top-150 bg-cyan">
      Terreno Vazio
    </GameMainButton>
     <GameMainButton @click="STRUCTURE.hospital.modal = true" class="absolute left-100 top-50 bg-bluegray">
      Hospital
    </GameMainButton>
     <GameMainButton @click="STRUCTURE.education.modal = true" class="absolute left-50 top-120 bg-blue">
      Escola
    </GameMainButton>
    <GameMainButton @click="STRUCTURE.marketplace_right.modal = true" class="absolute left-300 top-50 bg-amber">
      Supermecado Leste
    </GameMainButton>
    <GameMainButton @click="STRUCTURE.marketplace_left.modal = true" class="absolute left-50 top-160 bg-amber">
      Supermercado Oeste
    </GameMainButton>
     <GameMainButton @click="STRUCTURE.military.modal = true" class="absolute left-110 top-120 bg-gradient-from-lime">
      Área Militar
    </GameMainButton>
  </div>
  <Modal>
    <Fortress v-if="STRUCTURE.fortress.modal" />
    <Hospital v-if="STRUCTURE.hospital.modal" />
  </Modal>
  <div class="absolute bottom-15 right-15">
    <button @click="next()" class="p-4">Novo Turno</button>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '../store/player';
import { useStructureStore } from '../store/structure';
import { useCycle } from '../use/cycle';

const STRUCTURE = useStructureStore()
const PLAYER = usePlayerStore()

const cycle = useCycle()

const next = () => {
  cycle.run()
}
</script>