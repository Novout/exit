<template>
  <section ref="main" class="p-3 font-poppins absolute rounded-md bg-gray text-white left-90 flex flex-col w-100 max-h-200 overflow-x-hidden overflow-y-auto">
    <div class="flex w-full items-center justify-between">
      <p>{{ String(props.name).charAt(0).toUpperCase() + String(props.name).slice(1)}}</p>
    </div>
    <slot />
  </section>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { useTemplateRef } from 'vue';
import { useStructureStore } from '../../store/structure';

const STRUCTURE = useStructureStore()

const props = defineProps<{
  name: string
  target: 'cityhall' | 'military' | 'storage'
}>()
const section = useTemplateRef('main')

onClickOutside(section, () => {
  STRUCTURE.cityhall.modal = false
  STRUCTURE.military.modal = false
  STRUCTURE.storage.modal = false
})
</script>