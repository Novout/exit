<template>
  <div class="flex gap-5 w-full">
    <p>Cost</p>
    <p class="flex items-center"><IconWood class="w-6 h-6" />{{ props.resources.wood }}</p>
    <p class="flex items-center"><IconStone class="w-6 h-6" />{{ props.resources.stone }}</p>
    <p class="flex items-center"><IconWine class="w-6 h-6" />{{ props.resources.wine }}</p>
    <p class="flex items-center"><IconCrystal class="w-6 h-6" />{{ props.resources.crystal }}</p>
    <p class="flex items-center"><IconSulfur class="w-6 h-6" />{{ props.resources.sulfur }}</p>
  </div>
</template>

<script lang="ts" setup>
import type { Resources } from '../../types';

const props = defineProps<{
  resources: Resources
}>()
</script>