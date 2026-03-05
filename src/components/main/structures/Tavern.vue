<template>
  <StructureModal name="tavern">
    <div class="flex flex-col gap-2 w-full">
      <p>Level: {{ PLAYER.activeCity.tavern.level }}</p>
      <div class="flex w-full justify-between gap-5 pb-10 items-center">
        <input type="range" id="volume" name="volume" v-model="set" :min="0" :max="max" />
        <label for="volume">{{ set }} / {{ max }} Workers</label>
        <Button @click="onSetWorkers">Set</Button>
      </div>
      <div class="flex w-full justify-between"><ResourcesBar :resources="resources" /><Button @click="onUpgrade">Upgrade</Button></div>
    </div>
  </StructureModal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { CityhallUpgrade, TavernUpgrade } from '../../../defines/upgrades';
import { usePlayerStore } from '../../../store/player';

const PLAYER = usePlayerStore()

const resources = ref(TavernUpgrade(PLAYER.activeCity.tavern.level + 1))

const set = ref(PLAYER.activeCity.tavern.workers)
const max = computed(() => PLAYER.activeCity.tavern.level * 7)

const onSetWorkers = () => {
  const pop = PLAYER.activeCity.cityhall.population.acc - (Number(PLAYER.activeCity.science.workers))

  if(pop < set.value) {
    set.value = PLAYER.activeCity.tavern.workers
    return
  }

  PLAYER.activeCity.tavern.workers = set.value
}

const onUpgrade = () => {
  const levelTarget = PLAYER.activeCity.tavern.level + 1

  const upg = CityhallUpgrade(levelTarget)

  if(upg) {
    const dmgWood = upg.wood
    const dmgStone = upg.stone 

    if(PLAYER.activeCity.cityhall.wood.acc >= dmgWood && PLAYER.activeCity.cityhall.stone.acc >= dmgStone) {
      PLAYER.activeCity.cityhall.wood.acc -= upg.wood
      PLAYER.activeCity.cityhall.stone.acc -= upg.stone
      PLAYER.activeCity.tavern.level++
    }
  }
}
</script>