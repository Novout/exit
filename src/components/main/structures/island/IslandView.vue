<template>
  <div
    class="island-panel"
    :style="{ top: pos.y + 'px', left: pos.x + 'px' }"
    @mousedown="onDragStart"
  >
    <!-- Header -->
    <div class="panel-header">
      <span class="panel-title">{{ world.cityActive?.name || "Unknown" }}</span>
    </div>

    <!-- Info rows -->
    <div class="panel-body">
      <div class="info-row">
        <span class="info-label">Owner</span>
        <span class="info-value">{{ world.cityActive?.owner || "None" }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Type</span>
        <span class="info-value capitalize">{{ world.cityActive?.type }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Coords</span>
        <span class="info-value">{{ world.cityActive?.x }}, {{ world.cityActive?.y }}</span>
      </div>

      <div class="divider" />

      <!-- Colonize -->
      <template v-if="!world.cityActive?.owner && PLAYER.data.colonizePoints > 0">
        <Button @click="onColonize" :disabled="CONTROLLER.travel[3]!.start">Colonize</Button>
        <p v-if="CONTROLLER.travel[3]!.start && !CONTROLLER.travel[3]!.finish" class="timer-text">
          {{ format(CONTROLLER.travel[3]!.value) }}
        </p>
      </template>

      <!-- Bot actions -->
      <template v-if="world.cityActive?.owner?.startsWith('bot')">
        <!-- Land attack -->
        <div class="action-block">
          <div class="action-header">
            <span class="action-label">Land Attack</span>
            <span v-if="!hasUnits" class="action-warn">No troops</span>
          </div>
          <Button
            @click="onAttack"
            :disabled="CONTROLLER.travel[1]!.start || !hasUnits"
            :class="{ 'opacity-40': !hasUnits }"
          >Attack</Button>
          <p v-if="CONTROLLER.travel[1]!.start && !CONTROLLER.travel[1]!.finish" class="timer-text">
            {{ format(CONTROLLER.travel[1]!.value) }}
          </p>
        </div>

        <!-- Naval attack -->
        <div class="action-block">
          <div class="action-header">
            <span class="action-label">Naval Attack</span>
            <span v-if="!hasNavalFleet" class="action-warn">No fleet</span>
          </div>
          <Button
            @click="onNavalAttack"
            :disabled="CONTROLLER.travel[4]!.start || !hasNavalFleet"
            :class="{ 'opacity-40': !hasNavalFleet }"
          >Naval Attack</Button>
          <p v-if="CONTROLLER.travel[4]!.start && !CONTROLLER.travel[4]!.finish" class="timer-text">
            {{ format(CONTROLLER.travel[4]!.value) }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useControllerStore } from "../../../../store/controller";
import { useWolrdStore } from "../../../../store/world";
import { format } from "../../../../utils";
import { usePlayerStore } from "../../../../store/player";

const CONTROLLER = useControllerStore();
const PLAYER = usePlayerStore();
const world = useWolrdStore();

const pos = reactive({ x: 160, y: 160 });

const onDragStart = (e: MouseEvent) => {
  const startX = e.clientX - pos.x;
  const startY = e.clientY - pos.y;

  const onMove = (ev: MouseEvent) => {
    pos.x = ev.clientX - startX;
    pos.y = ev.clientY - startY;
  };

  const onUp = () => {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
  };

  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);
};

const hasNavalFleet = computed(() =>
  PLAYER.activeCity.navySoldiers.some((s) => s.units > 0),
);

const hasUnits = computed(() =>
  PLAYER.activeCity.soldiers.some((s) => s.units > 0),
);

const onAttack = () => {
  CONTROLLER.travel[1]!.finish = false;
  CONTROLLER.travel[1]!.start = true;
  CONTROLLER.travel[1]!.value = 20;
};

const onNavalAttack = () => {
  if (!hasNavalFleet.value) return;
  CONTROLLER.travel[4]!.finish = false;
  CONTROLLER.travel[4]!.start = true;
  CONTROLLER.travel[4]!.value = 25;
};

const onColonize = () => {
  CONTROLLER.travel[3]!.finish = false;
  CONTROLLER.travel[3]!.start = true;
  CONTROLLER.travel[3]!.value = 30;
  PLAYER.data.colonizePoints--;
};
</script>

<style scoped>
.island-panel {
  position: absolute;
  z-index: 99;
  width: 200px;
  cursor: grab;
  user-select: none;
  background: #1e1e1e;
  border: 1px solid #3a3a3a;
  font-family: "Poppins", sans-serif;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  padding: 0.6rem 0.875rem;
  border-bottom: 1px solid #3a3a3a;
}

.panel-title {
  font-family: "Cinzel", serif;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #d0d0d0;
}

.panel-body {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #c0c0c0;
  font-size: 0.82rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  color: #666;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.info-value {
  color: #b0b0b0;
  font-size: 0.8rem;
}

.divider {
  border-top: 1px solid #2e2e2e;
  margin: 0.125rem 0;
}

.action-block {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.action-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.action-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #666;
}

.action-warn {
  font-size: 0.65rem;
  color: #7a4a2a;
  letter-spacing: 0.04em;
}

.timer-text {
  font-size: 0.72rem;
  color: #666;
  font-variant-numeric: tabular-nums;
}
</style>
