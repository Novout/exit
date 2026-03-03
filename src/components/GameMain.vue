<template>
  <GameEnter v-if="!CYCLE.started" />
  <div v-else>
    <GameBar />
    <GameIsland v-if="CYCLE.type === 'island'" />
  </div>
</template>

<script setup lang="ts">
import { useCycleStore } from '../store/cycle';

const CYCLE = useCycleStore()
</script>