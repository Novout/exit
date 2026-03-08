<template>
  <StructureModalFull name="points">
    <div class="flex flex-1 w-full">
      <p>Points {{ PLAYER.data.science.points }}</p>
      <div class="flex flex-col flex-1 w-60 h-70vh">
        <button @click="set = 'economy'" class="px-5 py-20 w-80">Economy</button>
        <button @click="set = 'battlefield'" class="px-5 py-20 w-80">Battlefield</button>
        <button @click="set = 'travel'" class="px-5 py-20 w-80">Wolrd Travel</button>
      </div>
      <div class="flex flex-col flex-1 w-full h-70vh
      ">
        <div class="overflow-y-auto flex shadow-md flex-col bg-yellow gap-2 p-2" v-if="set === 'economy'">
          <button :class="[POINTS.economy.the_beginning ? 'opacity-50' : '']" @click="onEconomy1" class="p-5 flex items-center">The beginning: Evolve the first storage one to two level. 14<IconPoints class="w-5 h-5 pl-1" /></button>
        </div>
        <div class="overflow-y-auto flex shadow-md flex-col bg-red gap-2 p-2" v-else-if="set === 'battlefield'">
          <button :class="[POINTS.battlefield.distance ? 'opacity-50' : '']" @click="onBattlefield1" class="p-5 flex items-center">Distance: Releases the first character at a distance. 45<IconPoints class="w-5 h-5 pl-1" /></button>
        </div>
        <div class="overflow-y-auto flex shadow-md flex-col bg-blue gap-2 p-2" v-else-if="set === 'travel'">
          <button :class="[POINTS.travel.out_to_sea ? 'opacity-50' : '']" @click="onTravel1" class="p-5 flex items-center">Out to sea: You can build the first warship. 28<IconPoints class="w-5 h-5 pl-1" /></button>
        </div>
      </div>
    </div>
  </StructureModalFull>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePlayerStore } from '../../../../store/player';
import { usePointsStore } from '../../../../store/points';

const PLAYER = usePlayerStore()
const POINTS = usePointsStore()

const set = ref('economy')

const onEconomy1 = () => {
  if(PLAYER.data.science.points >= 14 && !POINTS.economy.the_beginning) { 
    if(PLAYER.activeCity.storage.level === 1) {
      PLAYER.activeCity.storage.level++ 
      PLAYER.data.science.points -= 14
    }
      
    POINTS.economy.the_beginning = true
  }
}

const onBattlefield1 = () => {
  if(PLAYER.data.science.points >= 45 && !POINTS.battlefield.distance) {   
    PLAYER.data.science.points -= 45
    POINTS.battlefield.distance = true
  }
}

const onTravel1 = () => {
  if(PLAYER.data.science.points >= 28 && !POINTS.travel.out_to_sea) {   
    PLAYER.data.science.points -= 28
    POINTS.travel.out_to_sea = true
  }
}
</script>