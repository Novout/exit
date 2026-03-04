<template>
  <StructureModal name="tavern">
    <div class="flex flex-col gap-2 w-full">
      <div class="flex w-full justify-between">
        <p>Level: {{ PLAYER.activeCity.tavern.level }}</p>
        <div class="flex w-full gap-5 items-center">
          <input type="range" id="volume" name="volume" v-model="tavern.ref" :min="tavern.min" :max="tavern.max" />
          <label for="volume">{{ tavern.ref }} Scientists</label>
        </div>
      </div>
      <div class="flex w-full justify-between"><ResourcesBar :resources="resources" /><Button @click="onUpgrade">Upgrade</Button></div>
    </div>
  </StructureModal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { CityhallUpgrade, TavernUpgrade } from '../../../defines/upgrades';
import { usePlayerStore } from '../../../store/player';

const PLAYER = usePlayerStore()

const resources = ref(TavernUpgrade(PLAYER.activeCity.tavern.level + 1))

const tavern = reactive({
  ref: 0,
  min: 0,
  max: PLAYER.activeCity.cityhall.population.maxAcc
})

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