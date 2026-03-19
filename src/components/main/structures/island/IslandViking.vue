<template>
  <StructureModal name="vikings">
    <div class="flex flex-col gap-2 w-full">
      <p>Level: {{ PLAYER.data.island.vikingLevel }}</p>
      <div class="flex gap-5 w-full items-center">
        <p>Enemies:</p>
        <div class="flex flex-col items-center">
          <IconViking class="w-12 h-12" />
          <p>{{ vikingLevelDifficult.soldiers }}</p>
        </div>
        <div class="flex flex-col items-center">
          <IconArcher class="w-12 h-12" />
          <p>{{ vikingLevelDifficult.long }}</p>
        </div>
      </div>
      <ResourcesBar description="Gain" :resources="vikingLevelGain" />
      <Button>Attack</Button>
    </div>
  </StructureModal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePlayerStore } from '../../../../store/player';
import { vikingDifficult, VikingGain } from '../../../../defines/difficults';

const PLAYER = usePlayerStore()

const vikingLevelDifficult = computed(() => vikingDifficult(PLAYER.data.island.vikingLevel))
const vikingLevelGain = computed(() => VikingGain(PLAYER.data.island.vikingLevel))

const onAttack = () => {
  
}
</script>