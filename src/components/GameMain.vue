<template>
  <GameEnter v-if="!CYCLE.started" />
  <GameBattle v-else-if="CYCLE.type === 'battle'" />
  <div v-else>
    <GameBar />
    <GameTimers />
    <GameWorld v-if="CYCLE.type === 'world'" />
    <GameIsland v-if="CYCLE.type === 'island'" />
    <GameCity v-if="CYCLE.type === 'city'" />
  </div>
</template>

<script setup lang="ts">
import { useCycleStore } from "../store/cycle";

const CYCLE = useCycleStore();
</script>
