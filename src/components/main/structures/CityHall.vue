<template>
  <StructureModal name="prefeitura">
    <div class="flex flex-col gap-2 w-full">
      <div class="flex w-full justify-between">
        <p>Level: {{ PLAYER.activeCity.cityhall.level }}</p>
        <p>Population: {{ PLAYER.activeCity.cityhall.population.acc }} / {{ PLAYER.activeCity.cityhall.population.maxAcc }}</p>
        <p>Pop per birth: {{ PLAYER.activeCity.cityhall.population.time / 1000 }}</p>
      </div>
      <div class="flex w-full justify-between"><ResourcesBar :resources="resources" /><Button @click="onUpgrade">Upgrade</Button></div>
    </div>
  </StructureModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CityhallUpgrade } from '../../../defines/upgrades';
import { usePlayerStore } from '../../../store/player';
import { useStructureStore } from '../../../store/structure';

const PLAYER = usePlayerStore()
const STRUCTURE = useStructureStore()

const resources = ref(CityhallUpgrade(PLAYER.activeCity.cityhall.level + 1))

const onUpgrade = () => {
  const levelTarget = PLAYER.activeCity.cityhall.level + 1

  const upg = CityhallUpgrade(levelTarget)

  if(upg) {
    const dmgWood = upg.wood
    const dmgStone = upg.stone 

    if(PLAYER.activeCity.cityhall.wood.acc >= dmgWood && PLAYER.activeCity.cityhall.stone.acc >= dmgStone) {
      PLAYER.activeCity.cityhall.wood.acc -= upg.wood
      PLAYER.activeCity.cityhall.stone.acc -= upg.stone
      PLAYER.activeCity.cityhall.level++
    }
  }
}
</script>