<template>
  <div class="world-wrap">
    <svg class="world-bg" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="wsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#2a3e6a"/>
          <stop offset="50%"  stop-color="#3a5280"/>
          <stop offset="100%" stop-color="#4a6898"/>
        </linearGradient>
        <linearGradient id="wsea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#1a6098"/>
          <stop offset="100%" stop-color="#104880"/>
        </linearGradient>
        <linearGradient id="wsea2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#104880"/>
          <stop offset="100%" stop-color="#083870"/>
        </linearGradient>
        <radialGradient id="wmoon-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stop-color="#90b8d8" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#90b8d8" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Sky -->
      <rect width="1200" height="600" fill="url(#wsky)"/>

      <!-- Stars -->
      <g fill="#a0b8d8">
        <circle cx="50"   cy="22"  r="1.3"/><circle cx="140"  cy="10"  r="0.9"/><circle cx="230"  cy="38"  r="1.5"/>
        <circle cx="370"  cy="8"   r="1"/><circle cx="490"  cy="30"  r="1.2"/><circle cx="610"  cy="7"   r="0.9"/>
        <circle cx="740"  cy="36"  r="1.4"/><circle cx="870"  cy="15"  r="1"/><circle cx="1000" cy="32"  r="1.3"/>
        <circle cx="1110" cy="12"  r="0.9"/><circle cx="130"  cy="60"  r="1"/><circle cx="320"  cy="68"  r="1.2"/>
        <circle cx="580"  cy="55"  r="0.9"/><circle cx="800"  cy="65"  r="1.4"/><circle cx="1040" cy="55"  r="1"/>
        <circle cx="1160" cy="42"  r="1.2"/><circle cx="80"   cy="90"  r="0.9"/><circle cx="450"  cy="85"  r="1"/>
        <circle cx="920"  cy="80"  r="1.3"/><circle cx="1090" cy="88"  r="0.9"/>
      </g>

      <!-- Moon glow halo -->
      <circle cx="900" cy="80" r="80" fill="url(#wmoon-glow)"/>
      <!-- Moon -->
      <circle cx="900" cy="80" r="44" fill="#e0eef8"/>
      <circle cx="885" cy="68" r="36" fill="#c0d8f0"/>

      <!-- Storm clouds left -->
      <ellipse cx="100"  cy="75"  rx="160" ry="30" fill="#6888a8" opacity="0.9"/>
      <ellipse cx="60"   cy="65"  rx="100" ry="22" fill="#7898b0" opacity="0.8"/>
      <ellipse cx="190"  cy="88"  rx="130" ry="25" fill="#6888a8" opacity="0.7"/>
      <!-- Storm clouds center -->
      <ellipse cx="550"  cy="60"  rx="180" ry="28" fill="#6888a8" opacity="0.8"/>
      <ellipse cx="620"  cy="48"  rx="120" ry="20" fill="#7090a8" opacity="0.7"/>
      <!-- Storm clouds right -->
      <ellipse cx="1100" cy="70"  rx="150" ry="28" fill="#6888a8" opacity="0.85"/>
      <ellipse cx="1150" cy="58"  rx="100" ry="20" fill="#7898b0" opacity="0.7"/>

      <!-- Lightning flash (distant, very faint) -->
      <polyline points="280,68 274,95 282,95 272,130" stroke="#90b0d0" stroke-width="1.5" fill="none" opacity="0.35"/>
      <polyline points="940,55 934,82 942,82 930,118" stroke="#90b0d0" stroke-width="1.5" fill="none" opacity="0.25"/>

      <!-- Horizon mist -->
      <rect x="0" y="220" width="1200" height="40" fill="#4a6898" opacity="0.5"/>

      <!-- Sea surface -->
      <rect x="0" y="240" width="1200" height="360" fill="url(#wsea)"/>
      <rect x="0" y="400" width="1200" height="200" fill="url(#wsea2)"/>

      <!-- Horizon shimmer -->
      <rect x="0" y="240" width="1200" height="6" fill="#5880b0" opacity="0.6"/>

      <!-- Distant island silhouettes at horizon -->
      <!-- Island A far left -->
      <ellipse cx="130" cy="248" rx="80" ry="16" fill="#386070"/>
      <polygon points="80,248 110,220 140,215 170,220 200,248" fill="#386070"/>
      <rect x="118" y="202" width="8" height="18" fill="#386070"/>
      <!-- Island B center-left -->
      <ellipse cx="400" cy="252" rx="100" ry="14" fill="#3a6272"/>
      <polygon points="340,252 370,226 400,218 435,224 460,252" fill="#3a6272"/>
      <rect x="393" y="204" width="7" height="22" fill="#3a6272"/>
      <rect x="405" y="210" width="7" height="16" fill="#3a6272"/>
      <!-- Island C center -->
      <ellipse cx="680" cy="246" rx="90" ry="13" fill="#386070"/>
      <polygon points="630,246 658,222 680,215 706,220 730,246" fill="#386070"/>
      <!-- Island D center-right -->
      <ellipse cx="900" cy="250" rx="105" ry="15" fill="#3a6272"/>
      <polygon points="840,250 868,225 900,218 932,224 960,250" fill="#3a6272"/>
      <rect x="892" y="204" width="8" height="22" fill="#3a6272"/>
      <!-- Island E far right -->
      <ellipse cx="1110" cy="248" rx="78" ry="14" fill="#386070"/>
      <polygon points="1065,248 1090,222 1115,214 1140,220 1155,248" fill="#386070"/>

      <!-- Ocean waves layers -->
      <g stroke="#4888b8" stroke-width="1.2" fill="none" opacity="0.55">
        <path d="M0,275 Q50,268 100,275 Q150,282 200,275 Q250,268 300,275 Q350,282 400,275 Q450,268 500,275 Q550,282 600,275 Q650,268 700,275 Q750,282 800,275 Q850,268 900,275 Q950,282 1000,275 Q1050,268 1100,275 Q1150,282 1200,275"/>
        <path d="M0,300 Q60,293 120,300 Q180,307 240,300 Q300,293 360,300 Q420,307 480,300 Q540,293 600,300 Q660,307 720,300 Q780,293 840,300 Q900,307 960,300 Q1020,293 1080,300 Q1140,307 1200,300"/>
        <path d="M0,328 Q70,320 140,328 Q210,336 280,328 Q350,320 420,328 Q490,336 560,328 Q630,320 700,328 Q770,336 840,328 Q910,320 980,328 Q1050,336 1120,328 Q1160,320 1200,328"/>
        <path d="M0,360 Q80,352 160,360 Q240,368 320,360 Q400,352 480,360 Q560,368 640,360 Q720,352 800,360 Q880,368 960,360 Q1040,352 1120,360 Q1160,368 1200,360"/>
        <path d="M0,395 Q90,387 180,395 Q270,403 360,395 Q450,387 540,395 Q630,403 720,395 Q810,387 900,395 Q990,403 1080,395 Q1140,387 1200,395"/>
        <path d="M0,435 Q100,427 200,435 Q300,443 400,435 Q500,427 600,435 Q700,443 800,435 Q900,427 1000,435 Q1100,443 1200,435"/>
        <path d="M0,478 Q110,470 220,478 Q330,486 440,478 Q550,470 660,478 Q770,486 880,478 Q990,470 1100,478 Q1150,486 1200,478"/>
        <path d="M0,525 Q120,517 240,525 Q360,533 480,525 Q600,517 720,525 Q840,533 960,525 Q1080,517 1200,525"/>
      </g>

      <!-- Mid-ground reefs / rocks -->
      <g fill="#2a5870">
        <ellipse cx="220"  cy="348" rx="30" ry="10"/>
        <ellipse cx="230"  cy="344" rx="18" ry="6"/>
        <rect x="215" y="325" width="8" height="22" fill="#285068"/>
        <rect x="225" y="318" width="6" height="28" fill="#285068"/>
      </g>
      <g fill="#2a5870">
        <ellipse cx="980"  cy="355" rx="28" ry="9"/>
        <ellipse cx="990"  cy="350" rx="16" ry="6"/>
        <rect x="976" y="332" width="7" height="22" fill="#285068"/>
        <rect x="987" y="326" width="6" height="27" fill="#285068"/>
      </g>
      <g fill="#2a5870">
        <ellipse cx="600" cy="420" rx="22" ry="7"/>
        <rect x="596" y="404" width="6" height="18" fill="#285068"/>
      </g>

      <!-- Ship silhouette left -->
      <g fill="#2a4a70">
        <polygon points="160,390 185,382 340,382 365,390"/>
        <rect x="230" y="340" width="5" height="43"/>
        <polygon points="235,340 235,360 265,360"/>
        <polygon points="235,342 235,366 210,366"/>
        <rect x="290" y="350" width="4" height="33"/>
        <polygon points="294,350 294,368 316,368"/>
      </g>

      <!-- Ship silhouette right -->
      <g fill="#2a4a70">
        <polygon points="840,410 862,402 990,402 1015,410"/>
        <rect x="900" y="362" width="5" height="41"/>
        <polygon points="905,362 905,382 932,382"/>
        <polygon points="905,364 905,386 880,386"/>
        <rect x="948" y="370" width="4" height="33"/>
        <polygon points="952,370 952,388 972,388"/>
      </g>

      <!-- Compass rose (bottom-right corner) -->
      <g transform="translate(1110,500)" fill="#3a6080" stroke="#4a7898" stroke-width="0.8">
        <!-- Circle ring -->
        <circle cx="0" cy="0" r="42" fill="none" stroke="#3a6080" stroke-width="1.2"/>
        <circle cx="0" cy="0" r="8" fill="#3a6080"/>
        <!-- Cardinal points -->
        <polygon points="0,-42 -5,-18 5,-18" fill="#4a7898"/>
        <polygon points="0,42  -5,18  5,18"  fill="#3a6080"/>
        <polygon points="-42,0 -18,-5 -18,5" fill="#3a6080"/>
        <polygon points="42,0   18,-5  18,5"  fill="#3a6080"/>
        <!-- Intercardinal -->
        <polygon points="0,-42 -4,-24 4,-24" fill="#3a6080" transform="rotate(45)"/>
        <polygon points="0,-42 -4,-24 4,-24" fill="#3a6080" transform="rotate(90)"/>
        <polygon points="0,-42 -4,-24 4,-24" fill="#3a6080" transform="rotate(135)"/>
        <polygon points="0,-42 -4,-24 4,-24" fill="#3a6080" transform="rotate(225)"/>
        <polygon points="0,-42 -4,-24 4,-24" fill="#3a6080" transform="rotate(270)"/>
        <polygon points="0,-42 -4,-24 4,-24" fill="#3a6080" transform="rotate(315)"/>
        <!-- N label -->
        <text x="-4" y="-47" font-family="serif" font-size="10" fill="#6090b0" stroke="none">N</text>
      </g>

      <!-- Seafoam/spray at foreground rocks -->
      <g fill="#4a7898" opacity="0.5">
        <ellipse cx="222" cy="354" rx="34" ry="5"/>
        <ellipse cx="982" cy="360" rx="32" ry="4"/>
        <ellipse cx="600" cy="425" rx="26" ry="4"/>
      </g>

      <!-- Deep water darkening at bottom -->
      <rect x="0" y="540" width="1200" height="60" fill="#082850" opacity="0.6"/>
    </svg>

  <div class="world-grid">

    <div
      @click="onIsland(island)"
      :style="{
        color: `${island.cities.some((city) => city.owner === 'main') ? 'green' : island.cities.some((city) => city.owner?.startsWith('bot')) ? 'red' : 'white'}`,
      }"
      v-for="island in WORLD.islands"
    >
      <IconIsland class="h-20 w-20 cursor-pointer" />
      <IconStone v-if="island.type === 'stone'" class="w-7 h-7" />
      <IconWine v-else-if="island.type === 'wine'" class="w-7 h-7" />
      <IconCrystal v-else-if="island.type === 'crystal'" class="w-7 h-7" />
      <IconSulfur v-else-if="island.type === 'sulfur'" class="w-7 h-7" />
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { useCycleStore } from "../store/cycle";
import { usePlayerStore } from "../store/player";
import { useWolrdStore } from "../store/world";
import type { Island } from "../types";

const WORLD = useWolrdStore();
const PLAYER = usePlayerStore();
const CYCLE = useCycleStore();

const onIsland = (island: Island) => {
  PLAYER.data.island = island;

  CYCLE.type = "island";
};
</script>

<style scoped>
.world-wrap {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: auto;
  background: #2a3e6a;
}

.world-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.world-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  min-height: 100vh;
  width: 100%;
  overflow: visible;
}
</style>
