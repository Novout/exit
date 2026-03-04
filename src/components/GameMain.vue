<template>
  <GameEnter v-if="!CYCLE.started" />
  <div v-else>
    <GameBar />
    <GameCity v-if="CYCLE.type === 'city'" />
  </div>
</template>

<script setup lang="ts">
import { useCycleStore } from '../store/cycle';

const CYCLE = useCycleStore()
</script>