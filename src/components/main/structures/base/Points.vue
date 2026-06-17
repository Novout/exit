<template>
  <StructureModalFull name="Research">
    <div class="points-layout">
      <nav class="points-nav">
        <div class="science-total">
          <IconPoints class="science-icon" />
          <span>{{ PLAYER.data.science.points }}</span>
        </div>
        <button
          class="nav-btn"
          :class="{ active: set === 'economy' }"
          @click="set = 'economy'"
        >Economy</button>
        <button
          class="nav-btn"
          :class="{ active: set === 'battlefield' }"
          @click="set = 'battlefield'"
        >Battlefield</button>
        <button
          class="nav-btn"
          :class="{ active: set === 'travel' }"
          @click="set = 'travel'"
        >World Travel</button>
      </nav>

      <div class="points-list">
        <template v-if="set === 'economy'">
          <div
            v-for="(item, a) in CONTROLLER.points.filter(i => i.type === 'points_economy')"
            :key="a"
            class="point-row"
            :class="{ done: item.finish, active: item.start && !item.finish }"
          >
            <div class="point-info">
              <span class="point-desc">{{ item.description }}</span>
              <span class="point-timer" v-if="item.start && !item.finish">
                {{ computed(() => format(item.value)) }}
              </span>
            </div>
            <button
              class="point-btn"
              :disabled="item.start || item.finish"
              @click="onStart(item)"
            >
              {{ item.finish ? 'Done' : item.start ? 'Researching' : 'Research' }}
            </button>
          </div>
        </template>

        <template v-else-if="set === 'battlefield'">
          <div
            v-for="(item, b) in CONTROLLER.points.filter(i => i.type === 'points_battlefield')"
            :key="b"
            class="point-row"
            :class="{ done: item.finish, active: item.start && !item.finish }"
          >
            <div class="point-info">
              <span class="point-desc">{{ item.description }}</span>
              <span class="point-timer" v-if="item.start && !item.finish">
                {{ computed(() => format(item.value)) }}
              </span>
            </div>
            <button
              class="point-btn"
              :disabled="item.start || item.finish"
              @click="onStart(item)"
            >
              {{ item.finish ? 'Done' : item.start ? 'Researching' : 'Research' }}
            </button>
          </div>
        </template>

        <template v-else-if="set === 'travel'">
          <div
            v-for="(item, c) in CONTROLLER.points.filter(i => i.type === 'points_travel')"
            :key="c"
            class="point-row"
            :class="{ done: item.finish, active: item.start && !item.finish }"
          >
            <div class="point-info">
              <span class="point-desc">{{ item.description }}</span>
              <span class="point-timer" v-if="item.start && !item.finish">
                {{ computed(() => format(item.value)) }}
              </span>
            </div>
            <button
              class="point-btn"
              :disabled="item.start || item.finish"
              @click="onStart(item)"
            >
              {{ item.finish ? 'Done' : item.start ? 'Researching' : 'Research' }}
            </button>
          </div>
        </template>
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
    PLAYER.data.science.points -= target.value;
    CONTROLLER.points[index].start = true;
  }
};
</script>

<style scoped>
.points-layout {
  display: flex;
  gap: 0;
  height: 100%;
  min-height: 320px;
}

.points-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 140px;
  flex-shrink: 0;
  border-right: 1px solid #2e2e2e;
  padding-right: 0.75rem;
}

.science-total {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: "Cinzel", serif;
  font-size: 1rem;
  font-weight: 700;
  color: #d0d0d0;
  padding-bottom: 0.75rem;
  margin-bottom: 0.25rem;
  border-bottom: 1px solid #2e2e2e;
}

.science-icon {
  width: 18px;
  height: 18px;
  color: #888;
}

.nav-btn {
  font-family: "Cinzel", serif;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: left;
  padding: 0.45rem 0.6rem;
  background: transparent;
  border: 1px solid transparent;
  color: #666;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
}
.nav-btn:hover { color: #aaa; background: #2a2a2a; }
.nav-btn.active {
  color: #d0d0d0;
  border-color: #3a3a3a;
  background: #2a2a2a;
}

.points-list {
  flex: 1;
  padding-left: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  overflow-y: auto;
}

.point-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.55rem 0.75rem;
  border: 1px solid #2e2e2e;
  background: #111;
  transition: border-color 0.15s;
}
.point-row.active { border-left: 3px solid #555; }
.point-row.done   { opacity: 0.45; }

.point-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex: 1;
  min-width: 0;
}

.point-desc {
  font-size: 0.8rem;
  color: #bbb;
  line-height: 1.4;
}

.point-timer {
  font-size: 0.72rem;
  color: #666;
  font-family: "Cinzel", serif;
}

.point-btn {
  font-family: "Cinzel", serif;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.35rem 0.75rem;
  background: #1a1a1a;
  border: 1px solid #3a3a3a;
  color: #aaa;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.15s, color 0.15s;
  flex-shrink: 0;
}
.point-btn:hover:not(:disabled) { border-color: #888; color: #d0d0d0; }
.point-btn:disabled { opacity: 0.4; cursor: default; }
</style>
