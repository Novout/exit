<template>
  <GameEnter v-if="!CYCLE.started" />
  <GameBattle v-else-if="CYCLE.type === 'battle'" />
  <GameNavalBattle v-else-if="CYCLE.type === 'naval_battle'" />
  <div class="xl:overflow-x-hidden overflow-y-auto overflow-x-auto" v-else>
    <GameBar />
    <GameTimers />
    <GameWorld v-if="CYCLE.type === 'world'" />
    <GameIsland v-if="CYCLE.type === 'island'" />
    <GameCity v-if="CYCLE.type === 'city'" />
    <MilitaryBase v-if="STRUCTURE.military_base.modal" />
  </div>
</template>

<script setup lang="ts">
import { useCycleStore } from "../store/cycle";
import { useStructureStore } from "../store/structure";

const CYCLE = useCycleStore();
const STRUCTURE = useStructureStore();
</script>
