<template>
  <div class="bar">
    <div class="bar-left">
      <div class="stat-block">
        <IconNavy class="stat-icon" />
        <span class="stat-value">{{ PLAYER.data.boats }}</span>
      </div>
      <div class="divider-v" />
      <div class="stat-block">
        <IconGold class="stat-icon" />
        <span class="stat-value">{{ PLAYER.data.gold.acc }}</span>
        <span class="gold-delta" :class="PLAYER.data.gold.set >= 0 ? 'positive' : 'negative'">
          {{ PLAYER.data.gold.set >= 0 ? '+' : '' }}{{ PLAYER.data.gold.set }}
        </span>
      </div>
    </div>

    <div class="bar-center">
      <select class="city-select" v-model="cityActive">
        <option :value="PLAYER.activeCity.cityhall.name">
          {{ PLAYER.activeCity.cityhall.name }}
        </option>
        <option
          v-for="(city, index) in PLAYER.data.cities"
          :value="city.cityhall.name"
          :key="index"
        >
          {{ city.cityhall.name }}
        </option>
      </select>

      <p class="pop-line">
        Pop {{ PLAYER.activeCity.cityhall.population.acc }}/{{ PLAYER.activeCity.cityhall.population.maxAcc }}
        &nbsp;&middot;&nbsp;
        Workers {{ workers }}
      </p>

      <div class="resources">
        <span class="res">
          <IconWood class="res-icon" />
          {{ PLAYER.activeCity.cityhall.wood.acc }}/{{ PLAYER.activeCity.cityhall.wood.maxAcc }}
          <em>+{{ PLAYER.activeCity.locksmith.workers * 4 }}</em>
        </span>
        <span class="res">
          <IconStone class="res-icon" />
          {{ PLAYER.activeCity.cityhall.stone.acc }}/{{ PLAYER.activeCity.cityhall.stone.maxAcc }}
          <em>+{{ PLAYER.activeCity.type === 'stone' ? PLAYER.activeCity.bonus.workers * 4 : 0 }}</em>
        </span>
        <span class="res">
          <IconWine class="res-icon" />
          {{ PLAYER.activeCity.cityhall.wine.acc }}/{{ PLAYER.activeCity.cityhall.wine.maxAcc }}
          <em>+{{ PLAYER.activeCity.type === 'wine' ? PLAYER.activeCity.bonus.workers * 4 : 0 }}</em>
        </span>
        <span class="res">
          <IconCrystal class="res-icon" />
          {{ PLAYER.activeCity.cityhall.crystal.acc }}/{{ PLAYER.activeCity.cityhall.crystal.maxAcc }}
          <em>+{{ PLAYER.activeCity.type === 'crystal' ? PLAYER.activeCity.bonus.workers * 4 : 0 }}</em>
        </span>
        <span class="res">
          <IconSulfur class="res-icon" />
          {{ PLAYER.activeCity.cityhall.sulfur.acc }}/{{ PLAYER.activeCity.cityhall.sulfur.maxAcc }}
          <em>+{{ PLAYER.activeCity.type === 'sulfur' ? PLAYER.activeCity.bonus.workers * 4 : 0 }}</em>
        </span>
      </div>
    </div>

    <div class="bar-right">
      <div class="nav-group">
        <button class="nav-btn" @click="CYCLE.type = 'world'" title="World">
          <IconWorld class="nav-icon" />
        </button>
        <button class="nav-btn" @click="CYCLE.type = 'island'" title="Island">
          <IconIsland class="nav-icon" />
        </button>
        <button class="nav-btn" @click="CYCLE.type = 'city'" title="City">
          <IconCityHall class="nav-icon" />
        </button>
      </div>
      <div class="divider-v" />
      <div class="nav-group">
        <button class="nav-btn" @click="STRUCTURE.notifies.modal = true" title="Events">
          <IconEvents class="nav-icon" />
          <span v-if="PLAYER.data.notifies > 0" class="badge badge-red">{{ PLAYER.data.notifies }}</span>
        </button>
        <button class="nav-btn" @click="STRUCTURE.military_base.modal = true" title="Military">
          <IconMilitary class="nav-icon" />
        </button>
        <button class="nav-btn" @click="STRUCTURE.points.modal = true" title="Research">
          <IconScience class="nav-icon" />
          <span v-if="PLAYER.data.science.points > 0" class="badge badge-blue">{{ PLAYER.data.science.points }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { usePlayerStore } from "../store/player";
import { useCycleStore } from "../store/cycle";
import { useStructureStore } from "../store/structure";

const PLAYER = usePlayerStore();
const CYCLE = useCycleStore();
const STRUCTURE = useStructureStore();

const cityActive = ref(PLAYER.activeCityName);

const workers = computed(
  () =>
    Number(PLAYER.activeCity.tavern.workers) +
    Number(PLAYER.activeCity.science.workers),
);

watch(
  computed(() => PLAYER.activeCity.cityhall.name),
  (name) => {
    cityActive.value = name;
  },
);

watch(cityActive, (cityName) => {
  const oldCity = PLAYER.activeCity;
  PLAYER.data.cities.unshift(oldCity);

  const newCity = PLAYER.data.cities.find(
    (city) => city.cityhall.name === cityName,
  );
  PLAYER.data.cities = PLAYER.data.cities.filter(
    (city) => city.cityhall.name !== cityName,
  );

  if (newCity) PLAYER.activeCity = newCity;
});
</script>

<style scoped>
.bar {
  display: flex;
  align-items: center;
  width: 100%;
  background: #1e1e1e;
  border-bottom: 1px solid #3a3a3a;
  padding: 0.5rem 0rem 0.5rem 1.0rem;
  gap: 1.5rem;
  min-height: 88px;
  font-family: "Poppins", sans-serif;
  flex-wrap: wrap;
}

.bar-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.bar-center {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.bar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.divider-v {
  width: 1px;
  height: 44px;
  background: #3a3a3a;
  flex-shrink: 0;
}

.stat-block {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #c8c8c8;
  font-size: 1rem;
}

.stat-icon {
  width: 24px;
  height: 24px;
  color: #888;
  flex-shrink: 0;
}

.stat-value {
  color: #e0e0e0;
  font-weight: 500;
  font-size: 1rem;
}

.gold-delta {
  font-size: 0.8rem;
  padding: 2px 8px;
  border-radius: 2px;
  font-weight: 600;
}
.gold-delta.positive { background: #1a2e1a; color: #6dbf6d; }
.gold-delta.negative { background: #2e1a1a; color: #bf6d6d; }

.city-select {
  font-family: "Cinzel", serif;
  font-size: 1rem;
  letter-spacing: 0.08em;
  background: #111;
  border: 1px solid #3a3a3a;
  color: #e0e0e0;
  padding: 0.3rem 0.75rem;
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s;
  max-width: 220px;
}
.city-select:focus { border-color: #777; }
.city-select option { background: #111; }

.pop-line {
  font-size: 0.78rem;
  color: #666;
  margin: 0;
  letter-spacing: 0.03em;
}

.resources {
  display: flex;
  gap: 1.1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.res {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 1rem;
  color: #aaa;
}

.res-icon {
  width: 18px;
  height: 18px;
  color: #666;
  flex-shrink: 0;
}

.res em {
  font-style: normal;
  color: #555;
  font-size: 0.78rem;
}

.nav-group {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #777;
  transition: color 0.15s, background 0.15s;
  border-radius: 2px;
}
.nav-btn:hover {
  color: #d0d0d0;
  background: #2a2a2a;
}

.nav-icon {
  width: 28px;
  height: 28px;
}

.badge {
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 18px;
  height: 18px;
  border-radius: 2px;
  font-size: 0.65rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
.badge-red  { background: #7a1a1a; color: #ffaaaa; }
.badge-blue { background: #1a2a4a; color: #aacfff; }

@media (max-width: 768px) {
  .bar {
    padding: 0.75rem 1rem;
    gap: 0.75rem;
    min-height: unset;
  }

  .bar-left,
  .bar-right {
    gap: 0.5rem;
  }

  .bar-center {
    order: 3;
    width: 100%;
    flex-basis: 100%;
    padding-bottom: 0.5rem;
  }

  .divider-v {
    height: 32px;
  }

  .stat-block { font-size: 0.88rem; }
  .stat-icon  { width: 20px; height: 20px; }
  .stat-value { font-size: 0.88rem; }

  .city-select { font-size: 0.88rem; max-width: 100%; }

  .resources { gap: 0.6rem; }
  .res        { font-size: 0.78rem; }
  .res-icon   { width: 15px; height: 15px; }

  .nav-btn  { width: 44px; height: 44px; }
  .nav-icon { width: 24px; height: 24px; }
}

@media (max-width: 480px) {
  .bar-left { flex-wrap: wrap; }
  .divider-v { display: none; }
  .resources { gap: 0.4rem; }
  .res em { display: none; }
}
</style>
