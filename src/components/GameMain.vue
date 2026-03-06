<template>
  <GameEnter v-if="!CYCLE.started" />
  <div v-else>
    <GameBar />
    <GameWorld v-if="CYCLE.type === 'world'" />
    <GameIsland v-if="CYCLE.type === 'island'" />
    <GameCity v-if="CYCLE.type === 'city'" />
  </div>
</template>

<script setup lang="ts">
import { useCycleStore } from '../store/cycle';

const CYCLE = useCycleStore()
</script>