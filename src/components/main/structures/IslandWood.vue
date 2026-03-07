<template>
  <StructureModal name="locksmith">
    <div class="flex flex-col gap-2 w-full">
      <p>Level: {{ PLAYER.activeCity.locksmith.level }}</p>
      <div class="flex w-full justify-between gap-5 pb-10 items-center">
        <input type="range" id="volume" name="volume" v-model="set" :min="0" :max="max" />
        <label for="volume">{{ set }} / {{ max }} Workers</label>
        <p class="p-1" :class="[PLAYER.data.gold.set >= 0 ? 'bg-yellow' : 'bg-red']">Gold {{ PLAYER.data.gold.set }}</p>
        <Button @click="onSetWorkers">Set</Button>
      </div>
      <div class="flex w-full justify-between"><ResourcesBar :resources="resources" /><Button @click="onUpgrade">Upgrade</Button></div>
    </div>
  </StructureModal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { LocksmithUpgrade, ScienceUpgrade } from '../../../defines/upgrades';
import { usePlayerStore } from '../../../store/player';

const PLAYER = usePlayerStore()

const resources = ref(ScienceUpgrade(PLAYER.activeCity.locksmith.level + 1))

const set = ref(PLAYER.activeCity.locksmith.workers)
const max = computed(() => PLAYER.activeCity.locksmith.level * 7)

const onSetWorkers = () => {
  const pop = PLAYER.activeCity.cityhall.population.acc - (Number(PLAYER.activeCity.locksmith.workers))

  if(pop < set.value) {
    set.value = PLAYER.activeCity.locksmith.workers
    return
  }

  PLAYER.activeCity.locksmith.workers = set.value
}

const onUpgrade = () => {
  const levelTarget = PLAYER.activeCity.locksmith.level + 1

  const upg = LocksmithUpgrade(levelTarget)

  if(upg) {
    const dmgWood = upg.wood
    const dmgStone = upg.stone 

    if(PLAYER.activeCity.cityhall.wood.acc >= dmgWood && PLAYER.activeCity.cityhall.stone.acc >= dmgStone) {
      PLAYER.activeCity.cityhall.wood.acc -= upg.wood
      PLAYER.activeCity.cityhall.stone.acc -= upg.stone
      PLAYER.activeCity.locksmith.level++
    }
  }
}
</script>