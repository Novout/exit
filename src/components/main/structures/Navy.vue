<template>
  <StructureModal name="shipyard">
    <div class="flex flex-col gap-2 w-full">
      <div class="flex w-full justify-between"><Button @click="onUpgrade">Upgrade</Button></div>
    </div>
  </StructureModal>
</template>

<script setup lang="ts">
import { MilitaryUpgrade } from '../../../defines/upgrades'
import { usePlayerStore } from '../../../store/player'

const PLAYER = usePlayerStore()

const onUpgrade = () => {
  const levelTarget = PLAYER.activeCity.cityhall.level + 1

  const upg = MilitaryUpgrade(levelTarget)

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