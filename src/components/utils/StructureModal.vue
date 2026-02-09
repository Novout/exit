<template>
  <section ref="main" class="p-3 font-poppins absolute rounded-md bg-gray text-white to-20 left-100 flex flex-col w-80 max-h-200 overflow-x-hidden overflow-y-auto">
    <div class="flex w-full items-center justify-between">
      <p>{{ String(props.name).charAt(0).toUpperCase() + String(props.name).slice(1)}}</p>
      <p v-if="STRUCTURE.fortress.modal === true">{{ PLAYER.fortress.level }}</p>
    </div>
    <slot />
  </section>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { useTemplateRef } from 'vue';
import { useStructureStore } from '../../store/structure';
import { usePlayerStore } from '../../store/player';

const STRUCTURE = useStructureStore()
const PLAYER = usePlayerStore()

const props = defineProps<{
  name: string
}>()
const section = useTemplateRef('main')

onClickOutside(section, () => {
  STRUCTURE.fortress.modal = false
  STRUCTURE.void.modal = false
  STRUCTURE.hospital.modal = false
  STRUCTURE.education.modal = false
  STRUCTURE.marketplace_right.modal = false
  STRUCTURE.marketplace_left.modal = false
  STRUCTURE.military.modal = false
})
</script>