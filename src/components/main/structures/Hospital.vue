<template>
  <StructureModal name="hospital">
    <div v-if="!set" class="flex gap-2 w-full">
      <Button @click="randomEvent">Explorar</Button>
    </div>
    <StructureResult v-if="set" :event="event" />
  </StructureModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { random } from '../../../utils';
import { hospitalEvents } from '../../../defines/structures-events';
import type { Event } from '../../../types';
import { usePlayerStore } from '../../../store/player';

const PLAYER = usePlayerStore()

const set = ref(false)
const event = ref<Event | null>(null)

const randomEvent = () => {
  if(PLAYER.turn.acc === 0) return

  const result = random(hospitalEvents()) as Event
  event.value = result 

  set.value = true
  PLAYER.turn.acc--
}
</script>