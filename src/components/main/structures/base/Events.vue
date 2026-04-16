<template>
  <StructureModalFull name="points">
    <div class="flex flex-col gap-3 w-full">
      <div
        class="px-4 py-1"
        :class="[
          event.type === 'points'
            ? 'bg-cyan text-black'
            : event.type === 'constructions'
              ? 'bg-yellow text-black'
              : event.type === 'army'
                ? 'bg-red text-white'
                : '',
        ]"
        v-for="(event, key) in EVENTS.list"
        :key="key"
      >
        <p>{{ event.message }}</p>
      </div>
    </div>
  </StructureModalFull>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { usePlayerStore } from "../../../../store/player";
import { useEventsStore } from "../../../../store/events";

const PLAYER = usePlayerStore();
const EVENTS = useEventsStore();

onMounted(() => {
  PLAYER.data.notifies = 0;
});
</script>
