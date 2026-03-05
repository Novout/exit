<template>
  <StructureModal name="storage">
    <div class="flex flex-col gap-2 w-full">
      <p>Level: {{ PLAYER.activeCity.cityhall.level }}</p>
      <ResourcesBar description="Actually" :resources="resources" />
      <ResourcesBar description="Next" :resources="StorageUpgrade(PLAYER.activeCity.storage.level + 1)" />
      <div class="flex w-full justify-between pt-20"><ResourcesBar :resources="StorageCost(PLAYER.activeCity.storage.level + 1)" /><Button @click="onUpgrade">Upgrade</Button></div>
    </div>
  </StructureModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { StorageCost, StorageUpgrade } from '../../../defines/upgrades';
import { usePlayerStore } from '../../../store/player';

const PLAYER = usePlayerStore()

const resources = ref(StorageUpgrade(PLAYER.activeCity.storage.level))

const onUpgrade = () => {
  const levelTarget = PLAYER.activeCity.storage.level + 1

  const upg = StorageCost(levelTarget)

  if(upg) {
    const dmgWood = upg.wood
    const dmgStone = upg.stone 

    if(PLAYER.activeCity.cityhall.wood.acc >= dmgWood && PLAYER.activeCity.cityhall.stone.acc >= dmgStone) {
      PLAYER.activeCity.cityhall.wood.acc -= upg.wood
      PLAYER.activeCity.cityhall.stone.acc -= upg.stone
      PLAYER.activeCity.storage.level++

      const stg = StorageUpgrade(PLAYER.activeCity.storage.level)

      if(stg) {
        PLAYER.activeCity.cityhall.stone.maxAcc = stg.stone
        PLAYER.activeCity.cityhall.wood.maxAcc = stg.wood
        PLAYER.activeCity.cityhall.sulfur.maxAcc = stg.sulfur
        PLAYER.activeCity.cityhall.wine.maxAcc = stg.wine
        PLAYER.activeCity.cityhall.crystal.maxAcc = stg.crystal
      }
    }
  }
}
</script>