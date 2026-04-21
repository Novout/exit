<template>
  <div class="absolute right-0 top-40">
    <div class="flex flex-col px-5">
      <div
        v-for="(construction, index) in CONTROLLER.constructions"
        :key="index"
      >
        <p
          class="bg-gray px-5 flex items-center gap-5"
          v-if="construction.start && !construction.finish"
        >
          <IconConstruction class="w-5 h-5 text-white" />
          {{
            computed(() =>
              format(construction.level[PLAYER.activeCity.cityhall.level + 1]),
            )
          }}
        </p>
      </div>
      <div v-for="(travel, index) in CONTROLLER.travel" :key="index">
        <p
          class="bg-gray px-5 flex items-center gap-5"
          v-if="travel.start && !travel.finish"
        >
          <IconConstruction class="w-5 h-5 text-white" />
          {{ computed(() => format(travel.value)) }}
        </p>
      </div>
      <div v-for="(points, index) in CONTROLLER.points" :key="index">
        <p
          class="bg-gray px-5 flex items-center gap-5"
          v-if="points.start && !points.finish"
        >
          <IconPoints class="w-5 h-5 text-white" />
          {{ computed(() => format(points.value)) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useControllerStore } from "../store/controller";
import { usePlayerStore } from "../store/player";
import { format } from "../utils";
import IconConstruction from "./main/icons/IconConstruction.vue";

const CONTROLLER = useControllerStore();
const PLAYER = usePlayerStore();
</script>
