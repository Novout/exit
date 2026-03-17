<template>
  <StructureModalFull name="points">
    <div class="flex flex-col gap-3 w-full">
      <div class="p-2" :class="[event.type === 'points' ? 'bg-cyan text-black' : '']" v-for="(event, key) in EVENTS.list" :key="key">
        <p>{{ event.message }}</p>
      </div>
    </div>
  </StructureModalFull>
</template>

<script setup lang="ts">
import { useEventsStore } from '../../../../store/events';

const EVENTS = useEventsStore()
</script>