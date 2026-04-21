<template>
  <div
    class="absolute z-99 p-4 top-40 left-10 text-md font-poppins flex items-center flex-col w-20 bg-gray text-white rounded-lg"
  >
    <p v-if="world.cityActive?.name">{{ world.cityActive!.name }}</p>
    <p>{{ world.cityActive!.owner || "none" }}</p>
    <p>{{ world.cityActive!.type }}</p>
    <p>x: {{ world.cityActive!.x }} y {{ world!.cityActive!.y }}</p>
    <Button
      @click="onColonize"
      v-if="!world.cityActive?.owner && PLAYER.data.colonizePoints > 0"
      >Colonize</Button
    >
    <p v-if="CONTROLLER.travel[2]!.value > 0">
      {{ computed(() => format(CONTROLLER.travel[2]!.value)) }}
    </p>
    <Button
      @click="onAttack"
      v-else-if="world.cityActive?.owner?.startsWith('bot')"
      >Attack</Button
    >
    <p v-if="CONTROLLER.travel[1]!.value > 0">
      {{ computed(() => format(CONTROLLER.travel[1]!.value)) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useControllerStore } from "../../../../store/controller";
import { useWolrdStore } from "../../../../store/world";
import { format } from "../../../../utils";
import { usePlayerStore } from "../../../../store/player";

const CONTROLLER = useControllerStore();
const PLAYER = usePlayerStore();

const world = useWolrdStore();

const onAttack = () => {
  CONTROLLER.travel[1]!.finish = false;
  CONTROLLER.travel[1]!.start = true;
  CONTROLLER.travel[1]!.value = 20;
};

const onColonize = () => {
  CONTROLLER.travel[2]!.finish = false;
  CONTROLLER.travel[2]!.start = true;
  CONTROLLER.travel[2]!.value = 30;

  PLAYER.data.colonizePoints--;
};
</script>
