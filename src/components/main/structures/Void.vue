<template>
  <StructureModal name="terreno Vazio">
    <div v-if="!set" class="flex gap-2 w-full">
      <Button @click="randomEvent">Explorar</Button>
    </div>
    <StructureResult v-if="set" :event="event" />
  </StructureModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { random } from '../../../utils';
import { voidEvents } from '../../../defines/structures-events';
import type { Event } from '../../../types';
import { usePlayerStore } from '../../../store/player';
import { useResults } from '../../../use/results';

const PLAYER = usePlayerStore()

const results = useResults()
const set = ref(false)
const event = ref<Event | null>(null)

const randomEvent = () => {
  if(PLAYER.turn.acc === 0) return

  const result = random(voidEvents()) as Event
  event.value = result 

  set.value = true

  results.exploreSet(result)
}
</script>