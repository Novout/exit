<template>
  <section ref="main" class="p-3 font-poppins absolute rounded-md bg-gray text-white left-0 flex flex-col w-300 h-180 overflow-x-hidden overflow-y-auto">
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
}>()
const section = useTemplateRef('main')

onClickOutside(section, () => {
  STRUCTURE.cityhall.modal = false
  STRUCTURE.military.modal = false
  STRUCTURE.storage.modal = false
  STRUCTURE.science.modal = false
  STRUCTURE.tavern.modal = false
  STRUCTURE.navy.modal = false
  STRUCTURE.market.modal = false
  STRUCTURE.wood.modal = false
  STRUCTURE.resource.modal = false
  STRUCTURE.wall.modal = false
  STRUCTURE.palace.modal = false
  STRUCTURE.military_base.modal = false
  STRUCTURE.points.modal = false
  STRUCTURE.notifies.modal = false
})
</script>