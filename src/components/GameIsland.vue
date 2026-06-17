<template>
  <div class="island-wrap">
    <svg class="island-bg" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="isky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#060b10"/>
          <stop offset="65%" stop-color="#0f161e"/>
          <stop offset="100%" stop-color="#141e28"/>
        </linearGradient>
        <linearGradient id="iocean" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0e1a24"/>
          <stop offset="100%" stop-color="#090f15"/>
        </linearGradient>
        <linearGradient id="iland" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#191916"/>
          <stop offset="100%" stop-color="#111110"/>
        </linearGradient>
        <linearGradient id="icliff-l" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#0c0c0b"/>
          <stop offset="100%" stop-color="#1c1c1a"/>
        </linearGradient>
        <linearGradient id="icliff-r" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#1c1c1a"/>
          <stop offset="100%" stop-color="#0c0c0b"/>
        </linearGradient>
      </defs>

      <!-- Sky -->
      <rect width="1200" height="600" fill="url(#isky)"/>

      <!-- Stars -->
      <g fill="#1e2a35">
        <circle cx="60"   cy="30"  r="1.2"/><circle cx="180"  cy="18"  r="1"/><circle cx="290"  cy="45"  r="1.4"/>
        <circle cx="420"  cy="12"  r="1"/><circle cx="540"  cy="35"  r="1.2"/><circle cx="680"  cy="10"  r="1"/>
        <circle cx="810"  cy="42"  r="1.4"/><circle cx="960"  cy="20"  r="1"/><circle cx="1100" cy="38"  r="1.2"/>
        <circle cx="150"  cy="70"  r="1"/><circle cx="370"  cy="80"  r="1.2"/><circle cx="650"  cy="65"  r="1"/>
        <circle cx="880"  cy="78"  r="1.4"/><circle cx="1050" cy="60"  r="1"/>
      </g>

      <!-- Moon -->
      <circle cx="980" cy="72" r="40" fill="#131c26"/>
      <circle cx="967" cy="61" r="33" fill="#07090c"/>

      <!-- Cloud wisps -->
      <ellipse cx="200"  cy="90"  rx="110" ry="18" fill="#0d1318" opacity="0.7"/>
      <ellipse cx="700"  cy="70"  rx="140" ry="16" fill="#0d1318" opacity="0.6"/>
      <ellipse cx="1050" cy="110" rx="100" ry="14" fill="#0d1318" opacity="0.5"/>

      <!-- Ocean -->
      <rect x="0" y="340" width="1200" height="260" fill="url(#iocean)"/>

      <!-- Ocean waves -->
      <g stroke="#132030" stroke-width="1.5" fill="none" opacity="0.6">
        <path d="M0,370 Q60,362 120,370 Q180,378 240,370 Q300,362 360,370 Q420,378 480,370 Q540,362 600,370 Q660,378 720,370 Q780,362 840,370 Q900,378 960,370 Q1020,362 1080,370 Q1140,378 1200,370"/>
        <path d="M0,395 Q70,387 140,395 Q210,403 280,395 Q350,387 420,395 Q490,403 560,395 Q630,387 700,395 Q770,403 840,395 Q910,387 980,395 Q1050,403 1120,395 Q1160,387 1200,395"/>
        <path d="M0,420 Q80,412 160,420 Q240,428 320,420 Q400,412 480,420 Q560,428 640,420 Q720,412 800,420 Q880,428 960,420 Q1040,412 1120,420 Q1160,428 1200,420"/>
        <path d="M0,450 Q90,442 180,450 Q270,458 360,450 Q450,442 540,450 Q630,458 720,450 Q810,442 900,450 Q990,458 1080,450 Q1140,442 1200,450"/>
        <path d="M0,480 Q100,472 200,480 Q300,488 400,480 Q500,472 600,480 Q700,488 800,480 Q900,472 1000,480 Q1100,488 1200,480"/>
      </g>

      <!-- Distant rocks in ocean left -->
      <ellipse cx="110" cy="360" rx="55" ry="22" fill="#111512"/>
      <ellipse cx="110" cy="355" rx="42" ry="14" fill="#161917"/>
      <rect x="90"  y="320" width="14" height="35" fill="#141714"/>
      <rect x="108" y="310" width="10" height="45" fill="#131613"/>
      <rect x="122" y="330" width="12" height="25" fill="#141714"/>

      <!-- Distant rocks in ocean right -->
      <ellipse cx="1085" cy="365" rx="60" ry="20" fill="#111512"/>
      <ellipse cx="1085" cy="360" rx="46" ry="13" fill="#161917"/>
      <rect x="1068" y="322" width="12" height="38" fill="#141714"/>
      <rect x="1085" y="312" width="10" height="48" fill="#131613"/>
      <rect x="1100" y="335" width="13" height="25" fill="#141714"/>

      <!-- Main island base (land mass) -->
      <ellipse cx="600" cy="370" rx="490" ry="80" fill="#111110"/>

      <!-- Island terrain top -->
      <polygon points="180,355 220,310 280,295 350,285 430,278 510,272 600,268 690,272 770,278 850,285 920,295 980,310 1020,355" fill="url(#iland)"/>

      <!-- Left cliff face -->
      <polygon points="180,355 220,310 215,355" fill="url(#icliff-l)"/>
      <polygon points="220,310 280,295 240,355" fill="url(#icliff-l)" opacity="0.7"/>

      <!-- Right cliff face -->
      <polygon points="1020,355 980,310 985,355" fill="url(#icliff-r)"/>
      <polygon points="980,310 920,295 960,355" fill="url(#icliff-r)" opacity="0.7"/>

      <!-- Terrain texture lines -->
      <g stroke="#0e0e0d" stroke-width="1" fill="none" opacity="0.5">
        <line x1="250" y1="320" x2="950" y2="320"/>
        <line x1="280" y1="305" x2="920" y2="305"/>
        <line x1="320" y1="293" x2="880" y2="293"/>
      </g>

      <!-- Trees left cluster -->
      <g fill="#0d100d">
        <!-- Trunk -->
        <rect x="238" y="295" width="5" height="25"/>
        <rect x="268" y="288" width="5" height="30"/>
        <rect x="300" y="283" width="5" height="35"/>
        <rect x="332" y="280" width="5" height="38"/>
        <!-- Canopy (triangle-ish via polygons) -->
        <polygon points="228,295 248,260 258,295"/>
        <polygon points="235,280 248,248 261,280"/>
        <polygon points="258,288 273,252 288,288"/>
        <polygon points="265,273 273,240 281,273"/>
        <polygon points="292,283 305,248 318,283"/>
        <polygon points="298,270 305,235 312,270"/>
        <polygon points="323,280 336,244 349,280"/>
        <polygon points="329,267 336,231 343,267"/>
      </g>

      <!-- Trees right cluster -->
      <g fill="#0d100d">
        <rect x="858" y="280" width="5" height="38"/>
        <rect x="888" y="283" width="5" height="35"/>
        <rect x="920" y="288" width="5" height="30"/>
        <rect x="952" y="295" width="5" height="25"/>
        <polygon points="848,280 861,244 874,280"/>
        <polygon points="854,267 861,231 868,267"/>
        <polygon points="880,283 893,247 906,283"/>
        <polygon points="886,270 893,234 900,270"/>
        <polygon points="912,288 925,252 938,288"/>
        <polygon points="918,275 925,239 932,275"/>
        <polygon points="944,295 957,260 970,295"/>
        <polygon points="950,282 957,247 964,282"/>
      </g>

      <!-- Ruins left - broken tower -->
      <rect x="380" y="250" width="42" height="55" fill="#181816"/>
      <rect x="375" y="237" width="52" height="16" fill="#181816"/>
      <g fill="#181816">
        <rect x="375" y="222" width="10" height="16"/>
        <rect x="390" y="222" width="10" height="16"/>
        <!-- broken: gap at 405 -->
        <rect x="416" y="222" width="11" height="16"/>
      </g>
      <!-- Cracks -->
      <line x1="400" y1="250" x2="395" y2="305" stroke="#111" stroke-width="2"/>
      <rect x="390" y="268" width="8" height="12" fill="#0e0e0c"/>
      <!-- Moss/rubble at base -->
      <ellipse cx="401" cy="306" rx="28" ry="6" fill="#131412" opacity="0.8"/>

      <!-- Ruins right - broken arch/wall remnant -->
      <rect x="778" y="255" width="40" height="50" fill="#181816"/>
      <rect x="773" y="242" width="50" height="16" fill="#181816"/>
      <g fill="#181816">
        <rect x="773" y="227" width="10" height="16"/>
        <rect x="788" y="227" width="10" height="16"/>
        <rect x="803" y="227" width="10" height="16"/>
        <!-- top right broken -->
      </g>
      <line x1="795" y1="255" x2="800" y2="306" stroke="#111" stroke-width="2"/>
      <rect x="784" y="272" width="7" height="10" fill="#0e0e0c"/>
      <ellipse cx="798" cy="306" rx="27" ry="6" fill="#131412" opacity="0.8"/>

      <!-- Central lighthouse / keep on island -->
      <rect x="572" y="178" width="56" height="110" fill="#1e1e1c"/>
      <rect x="565" y="161" width="70" height="20" fill="#1e1e1c"/>
      <g fill="#1e1e1c">
        <rect x="565" y="145" width="12" height="17"/>
        <rect x="582" y="145" width="12" height="17"/>
        <rect x="599" y="145" width="12" height="17"/>
        <rect x="616" y="145" width="12" height="17"/>
      </g>
      <!-- Light window at top -->
      <rect x="593" y="170" width="14" height="20" fill="#1a2530"/>
      <!-- Arrow slits -->
      <rect x="580" y="210" width="6" height="14" fill="#111110"/>
      <rect x="614" y="210" width="6" height="14" fill="#111110"/>
      <rect x="580" y="240" width="6" height="14" fill="#111110"/>
      <rect x="614" y="240" width="6" height="14" fill="#111110"/>
      <!-- Door arch -->
      <rect x="591" y="258" width="18" height="30" fill="#0e0e0c"/>
      <ellipse cx="600" cy="258" rx="9" ry="6" fill="#0e0e0c"/>
      <!-- Stone base rubble -->
      <ellipse cx="600" cy="290" rx="38" ry="8" fill="#161614" opacity="0.7"/>

      <!-- Lighthouse lantern top -->
      <rect x="586" y="134" width="28" height="14" fill="#222220"/>
      <rect x="592" y="128" width="16" height="8"  fill="#222220"/>
      <!-- Very faint glow (just slightly lighter rect) -->
      <rect x="589" y="136" width="22" height="10" fill="#1c2830" opacity="0.5"/>

      <!-- Scattered rocks on island surface -->
      <g fill="#141412">
        <ellipse cx="460" cy="300" rx="14" ry="6"/>
        <ellipse cx="490" cy="310" rx="9"  ry="4"/>
        <ellipse cx="700" cy="295" rx="12" ry="5"/>
        <ellipse cx="730" cy="308" rx="8"  ry="3"/>
        <ellipse cx="520" cy="285" rx="10" ry="4"/>
        <ellipse cx="680" cy="285" rx="11" ry="4"/>
      </g>

      <!-- Ocean shimmer (light reflections) -->
      <g stroke="#1a2e40" stroke-width="1" fill="none" opacity="0.4">
        <line x1="560" y1="400" x2="600" y2="400"/>
        <line x1="580" y1="420" x2="630" y2="420"/>
        <line x1="550" y1="440" x2="610" y2="440"/>
        <line x1="900" y1="390" x2="940" y2="390"/>
        <line x1="280" y1="410" x2="320" y2="410"/>
        <line x1="950" y1="430" x2="1010" y2="430"/>
        <line x1="200" y1="450" x2="260" y2="450"/>
      </g>

      <!-- Mist at water line -->
      <rect x="0" y="335" width="1200" height="25" fill="#0e141a" opacity="0.35"/>
    </svg>

  <div class="island-grid">

    <div
      class="justify-center cursor-pointer"
      :style="{
        color: `${city.owner === 'main' ? 'green' : 'black'}`,
      }"
      v-for="(city, index) in cities"
      :key="index"
    >
      <p class="text-white" v-if="city.name && city.owner">{{ city.name }}</p>
      <IconCityHall
        v-if="city.owner"
        @click="WORLD.cityActive = city"
        :class="city.owner !== 'main' ? 'text-red' : ''"
        class="h-20 w-20 cursor-pointer"
      />
      <IconTerrain
        v-else
        @click="WORLD.cityActive = city"
        class="h-20 w-20 cursor-pointer text-white"
      />
    </div>
    <div
      v-if="cities.some((city) => city.owner === 'main')"
      @click="STRUCTURE.wood.modal = true"
      class="cursor-pointer"
    >
      <IconWood class="w-20 h-20 text-white" />
    </div>
    <div
      v-if="cities.some((city) => city.owner === 'main')"
      @click="STRUCTURE.viking.modal = true"
      class="cursor-pointer"
    >
      <IconViking class="w-20 h-20 text-white" />
    </div>
    <div
      @click="STRUCTURE.resource.modal = true"
      v-if="cities.some((city) => city.owner === 'main')"
      class="cursor-pointer text-white"
    >
      <IconStone v-if="PLAYER.data.island.type === 'stone'" class="w-20 h-20" />
      <IconWine
        v-else-if="PLAYER.data.island.type === 'wine'"
        class="w-20 h-20"
      />
      <IconCrystal
        v-else-if="PLAYER.data.island.type === 'crystal'"
        class="w-20 h-20"
      />
      <IconSulfur
        v-else-if="PLAYER.data.island.type === 'sulfur'"
        class="w-20 h-20"
      />
    </div>
    <Modal>
      <IslandWood v-if="STRUCTURE.wood.modal" />
      <IslandBonus v-else-if="STRUCTURE.resource.modal" />
      <IslandViking v-else-if="STRUCTURE.viking.modal" />
    </Modal>
    <IslandView />
  </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePlayerStore } from "../store/player";
import { useWolrdStore } from "../store/world";
import type { IslandCity } from "../types";
import { useStructureStore } from "../store/structure";

const WORLD = useWolrdStore();
const PLAYER = usePlayerStore();
const STRUCTURE = useStructureStore();

const cities = ref<IslandCity[]>([]);

onMounted(() => {
  const island = WORLD.islands.find(
    (island) =>
      island.x === PLAYER.data.island.x && PLAYER.data.island.y === island.y,
  );

  if (island) cities.value = island?.cities;
});
</script>

<style scoped>
.island-wrap {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: auto;
  background: #060b10;
}

.island-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.island-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  overflow: visible;
  min-height: 100vh;
  width: 100%;
}
</style>
