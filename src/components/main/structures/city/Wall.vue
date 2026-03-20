<template>
  <StructureModal name="wall">
    <div class="flex flex-col gap-2 w-full">
      <div class="flex w-full justify-between">
        <p>Level: {{ PLAYER.activeCity.wall.level }}</p>
      </div>
      <div class="flex w-full justify-between"><ResourcesBar :resources="resources" /><Button @click="onUpgrade">Upgrade</Button></div>
    </div>
  </StructureModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { WallUpgrade } from '../../../../defines/upgrades';
import { usePlayerStore } from '../../../../store/player';

const PLAYER = usePlayerStore()

const resources = ref(WallUpgrade(PLAYER.activeCity.wall.level + 1))

const onUpgrade = () => {
  const levelTarget = PLAYER.activeCity.wall.level + 1

  const upg = WallUpgrade(levelTarget)

  if(upg) {
    const dmgWood = upg.wood
    const dmgStone = upg.stone 

    if(PLAYER.activeCity.cityhall.wood.acc >= dmgWood && PLAYER.activeCity.cityhall.stone.acc >= dmgStone) {
      PLAYER.activeCity.cityhall.wood.acc -= upg.wood
      PLAYER.activeCity.cityhall.stone.acc -= upg.stone
      PLAYER.activeCity.wall.level++

      resources.value = WallUpgrade(levelTarget + 1)
    }
  }
}
</script>