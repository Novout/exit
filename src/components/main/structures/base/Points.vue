<template>
  <StructureModalFull name="points">
    <div class="flex flex-1 w-full">
      <p>Points {{ PLAYER.data.science.points }}</p>
      <div class="flex flex-col flex-1 w-60 h-70vh">
        <button @click="set = 'economy'" class="px-5 py-20 w-80">
          Economy
        </button>
        <button @click="set = 'battlefield'" class="px-5 py-20 w-80">
          Battlefield
        </button>
        <button @click="set = 'travel'" class="px-5 py-20 w-80">
          Wolrd Travel
        </button>
      </div>
      <div class="flex flex-col flex-1 w-full h-70vh">
        <div
          v-for="(item, a) in CONTROLLER.points.filter(
            (item) => item.type === 'points_economy',
          )"
          :key="a"
          class="overflow-y-auto flex shadow-md flex-col bg-yellow gap-2 p-2"
          v-if="set === 'economy'"
        >
          <button
            :class="[item.start ? 'opacity-50' : '']"
            @click="onStart(item)"
            class="p-5 flex items-center"
          >
            {{ item.description }}<IconPoints class="w-5 h-5 pl-1" />
          </button>
          <p v-if="item.start && !item.finish">
            {{ computed(() => format(item.value)) }}
          </p>
        </div>
        <div
          v-for="(item, b) in CONTROLLER.points.filter(
            (item) => item.type === 'points_battlefield',
          )"
          :key="b"
          class="overflow-y-auto flex shadow-md flex-col bg-red gap-2 p-2"
          v-else-if="set === 'battlefield'"
        >
          <button
            :class="[item.start ? 'opacity-50' : '']"
            @click="onStart(item)"
            class="p-5 flex items-center"
          >
            {{ item.description }}<IconPoints class="w-5 h-5 pl-1" />
          </button>
          <p v-if="item.start && !item.finish">
            {{ computed(() => format(item.value)) }}
          </p>
        </div>
        <div
          v-for="(item, c) in CONTROLLER.points.filter(
            (item) => item.type === 'points_travel',
          )"
          :key="c"
          class="overflow-y-auto flex shadow-md flex-col bg-blue gap-2 p-2"
          v-else-if="set === 'travel'"
        >
          <button
            :class="[item.start ? 'opacity-50' : '']"
            @click="onStart(item)"
            class="p-5 flex items-center"
          >
            {{ item.description }}<IconPoints class="w-5 h-5 pl-1" />
          </button>
          <p v-if="item.start && !item.finish">
            {{ computed(() => format(item.value)) }}
          </p>
        </div>
      </div>
    </div>
  </StructureModalFull>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { usePlayerStore } from "../../../../store/player";
import { useControllerStore } from "../../../../store/controller";
import { format } from "../../../../utils";

const PLAYER = usePlayerStore();
const CONTROLLER = useControllerStore();

const set = ref("economy");

const onStart = (item: any) => {
  const target = CONTROLLER.points.find((it) => it.id === item.id);
  const index = CONTROLLER.points.indexOf(item);

  if (
    target &&
    PLAYER.data.science.points >= target.value &&
    !target.start &&
    !target.finish &&
    CONTROLLER.points[index]
  ) {
    PLAYER.data.science.points -= target.value
    CONTROLLER.points[index].start = true;
  }
};
</script>
