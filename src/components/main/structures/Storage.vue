<template>
  <StructureModal name="storage">
    <div class="flex flex-col gap-2 w-full">
      <ResourcesBar description="Actually" :resources="resources" />
      <ResourcesBar description="Next" :resources="StorageUpgrade(PLAYER.activeCity.storage.level + 1)" />
      <div class="flex w-full justify-between pt-20"><ResourcesBar :resources="StorageCost(PLAYER.activeCity.storage.level + 1)" /><Button @click="onUpgrade">Upgrade</Button></div>
    </div>
  </StructureModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CityhallUpgrade, StorageCost, StorageUpgrade } from '../../../defines/upgrades';
import { usePlayerStore } from '../../../store/player';
import { useStructureStore } from '../../../store/structure';

const PLAYER = usePlayerStore()
const STRUCTURE = useStructureStore()

const resources = ref(StorageUpgrade(PLAYER.activeCity.storage.level))

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