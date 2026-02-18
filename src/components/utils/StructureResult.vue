<template>
  <div class="flex flex-col w-full">
    <p  v-if="event?.message">{{ event?.message }}</p>
    <p v-if="event?.supply">Suprimentos: {{ event?.supply }}</p>
    <p v-if="event?.resources">Recursos: {{ event?.resources }}</p>
    <p v-if="event?.ammunition">Munição: {{ event?.ammunition }}</p>
    <p v-if="event?.units">Unidades: {{ event?.units }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '../../types';

const props = defineProps<{
  event: Event | null
}>()
</script>