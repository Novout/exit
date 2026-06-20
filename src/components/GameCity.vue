<template>
  <div class="city-wrap">
    <svg class="city-bg" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#b0b8c4"/>
          <stop offset="100%" stop-color="#d4dce4"/>
        </linearGradient>
        <linearGradient id="ground-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#7a8490"/>
          <stop offset="100%" stop-color="#606870"/>
        </linearGradient>
      </defs>

      <!-- Sky -->
      <rect width="1200" height="600" fill="url(#sky-grad)"/>

      <!-- Clouds -->
      <g fill="#e8eef4" opacity="0.7">
        <ellipse cx="120"  cy="55" rx="55" ry="18"/>
        <ellipse cx="340"  cy="38" rx="70" ry="16"/>
        <ellipse cx="680"  cy="60" rx="60" ry="15"/>
        <ellipse cx="950"  cy="42" rx="80" ry="18"/>
        <ellipse cx="1130" cy="65" rx="50" ry="13"/>
      </g>

      <!-- Moon -->
      <circle cx="1050" cy="75" r="38" fill="#f0f4f8"/>
      <circle cx="1038" cy="65" r="32" fill="#d4dce4"/>

      <!-- Far hills -->
      <polygon points="0,420 120,290 260,380 400,260 540,350 680,270 820,320 960,260 1100,310 1200,280 1200,420" fill="#8a9298"/>

      <!-- Back towers left -->
      <rect x="30"  y="280" width="45" height="140" fill="#8c9298"/>
      <rect x="25"  y="265" width="55" height="20"  fill="#8c9298"/>
      <g fill="#8c9298">
        <rect x="25"  y="252" width="10" height="15"/>
        <rect x="40"  y="252" width="10" height="15"/>
        <rect x="55"  y="252" width="10" height="15"/>
        <rect x="70"  y="252" width="10" height="15"/>
      </g>
      <rect x="20"  y="305" width="6"  height="8" fill="#4a5058"/>
      <rect x="52"  y="305" width="6"  height="8" fill="#4a5058"/>

      <rect x="100" y="310" width="38" height="110" fill="#8c9298"/>
      <rect x="96"  y="297" width="46" height="17"  fill="#8c9298"/>
      <g fill="#8c9298">
        <rect x="96"  y="285" width="9" height="13"/>
        <rect x="110" y="285" width="9" height="13"/>
        <rect x="124" y="285" width="9" height="13"/>
      </g>

      <!-- Back towers right -->
      <rect x="1090" y="290" width="42" height="130" fill="#8c9298"/>
      <rect x="1085" y="276" width="52" height="18"  fill="#8c9298"/>
      <g fill="#8c9298">
        <rect x="1085" y="263" width="9"  height="14"/>
        <rect x="1099" y="263" width="9"  height="14"/>
        <rect x="1113" y="263" width="9"  height="14"/>
        <rect x="1127" y="263" width="9"  height="14"/>
      </g>
      <rect x="1103" y="310" width="6" height="8" fill="#4a5058"/>

      <rect x="1020" y="315" width="35" height="105" fill="#8c9298"/>
      <rect x="1016" y="303" width="43" height="15"  fill="#8c9298"/>
      <g fill="#8c9298">
        <rect x="1016" y="291" width="8" height="13"/>
        <rect x="1029" y="291" width="8" height="13"/>
        <rect x="1042" y="291" width="8" height="13"/>
      </g>

      <!-- Mid buildings left -->
      <rect x="155" y="310" width="90"  height="110" fill="#9aa0a8"/>
      <rect x="175" y="295" width="50"  height="18"  fill="#9aa0a8"/>
      <rect x="168" y="282" width="64"  height="16"  fill="#9aa0a8"/>
      <g fill="#9aa0a8">
        <rect x="168" y="268" width="11" height="15"/>
        <rect x="184" y="268" width="11" height="15"/>
        <rect x="200" y="268" width="11" height="15"/>
        <rect x="216" y="268" width="11" height="15"/>
      </g>
      <rect x="168" y="325" width="8"  height="11" fill="#4a5058"/>
      <rect x="194" y="325" width="8"  height="11" fill="#4a5058"/>
      <rect x="218" y="340" width="8"  height="11" fill="#4a5058"/>

      <!-- Mid buildings right -->
      <rect x="960"  y="305" width="85"  height="115" fill="#9aa0a8"/>
      <rect x="978"  y="290" width="50"  height="18"  fill="#9aa0a8"/>
      <rect x="970"  y="277" width="65"  height="15"  fill="#9aa0a8"/>
      <g fill="#9aa0a8">
        <rect x="970"  y="263" width="11" height="15"/>
        <rect x="986"  y="263" width="11" height="15"/>
        <rect x="1002" y="263" width="11" height="15"/>
        <rect x="1018" y="263" width="11" height="15"/>
      </g>
      <rect x="978"  y="318" width="8" height="11" fill="#4a5058"/>
      <rect x="1002" y="318" width="8" height="11" fill="#4a5058"/>

      <!-- Main castle body -->
      <rect x="380" y="270" width="440" height="150" fill="#9098a0"/>

      <!-- Castle battlements top -->
      <rect x="375" y="254" width="450" height="20" fill="#9098a0"/>
      <g fill="#9098a0">
        <rect x="375" y="238" width="18" height="18"/>
        <rect x="401" y="238" width="18" height="18"/>
        <rect x="427" y="238" width="18" height="18"/>
        <rect x="453" y="238" width="18" height="18"/>
        <rect x="479" y="238" width="18" height="18"/>
        <rect x="505" y="238" width="18" height="18"/>
        <rect x="531" y="238" width="18" height="18"/>
        <rect x="557" y="238" width="18" height="18"/>
        <rect x="583" y="238" width="18" height="18"/>
        <rect x="609" y="238" width="18" height="18"/>
        <rect x="635" y="238" width="18" height="18"/>
        <rect x="661" y="238" width="18" height="18"/>
        <rect x="687" y="238" width="18" height="18"/>
        <rect x="713" y="238" width="18" height="18"/>
        <rect x="739" y="238" width="18" height="18"/>
        <rect x="765" y="238" width="18" height="18"/>
        <rect x="791" y="238" width="18" height="18"/>
        <rect x="817" y="238" width="18" height="18"/>
      </g>

      <!-- Left main tower -->
      <rect x="355" y="190" width="90" height="230" fill="#7e868e"/>
      <rect x="349" y="173" width="102" height="22" fill="#7e868e"/>
      <g fill="#7e868e">
        <rect x="349" y="156" width="16" height="18"/>
        <rect x="370" y="156" width="16" height="18"/>
        <rect x="391" y="156" width="16" height="18"/>
        <rect x="412" y="156" width="16" height="18"/>
        <rect x="433" y="156" width="16" height="18"/>
      </g>
      <rect x="374" y="215" width="12" height="16" fill="#4a5058"/>
      <rect x="398" y="215" width="12" height="16" fill="#4a5058"/>
      <rect x="374" y="250" width="12" height="16" fill="#4a5058"/>
      <rect x="398" y="250" width="12" height="16" fill="#4a5058"/>

      <!-- Right main tower -->
      <rect x="755" y="195" width="90" height="225" fill="#7e868e"/>
      <rect x="749" y="178" width="102" height="22" fill="#7e868e"/>
      <g fill="#7e868e">
        <rect x="749" y="160" width="16" height="19"/>
        <rect x="770" y="160" width="16" height="19"/>
        <rect x="791" y="160" width="16" height="19"/>
        <rect x="812" y="160" width="16" height="19"/>
        <rect x="833" y="160" width="16" height="19"/>
      </g>
      <rect x="770" y="220" width="12" height="16" fill="#4a5058"/>
      <rect x="794" y="220" width="12" height="16" fill="#4a5058"/>
      <rect x="770" y="255" width="12" height="16" fill="#4a5058"/>
      <rect x="794" y="255" width="12" height="16" fill="#4a5058"/>

      <!-- Central keep -->
      <rect x="510" y="150" width="180" height="270" fill="#a0a8b0"/>
      <rect x="504" y="130" width="192" height="24" fill="#a0a8b0"/>
      <g fill="#a0a8b0">
        <rect x="504" y="110" width="20" height="22"/>
        <rect x="530" y="110" width="20" height="22"/>
        <rect x="556" y="110" width="20" height="22"/>
        <rect x="582" y="110" width="20" height="22"/>
        <rect x="608" y="110" width="20" height="22"/>
        <rect x="634" y="110" width="20" height="22"/>
        <rect x="660" y="110" width="20" height="22"/>
      </g>
      <!-- Keep windows -->
      <rect x="538" y="175" width="14" height="22" fill="#4a5058"/>
      <rect x="573" y="175" width="14" height="22" fill="#4a5058"/>
      <rect x="608" y="175" width="14" height="22" fill="#4a5058"/>
      <rect x="643" y="175" width="14" height="22" fill="#4a5058"/>
      <rect x="538" y="220" width="14" height="22" fill="#4a5058"/>
      <rect x="573" y="220" width="14" height="22" fill="#4a5058"/>
      <rect x="608" y="220" width="14" height="22" fill="#4a5058"/>
      <rect x="643" y="220" width="14" height="22" fill="#4a5058"/>
      <!-- Keep gate arch -->
      <rect x="570" y="315" width="60" height="105" fill="#4a5058"/>
      <ellipse cx="600" cy="315" rx="30" ry="18" fill="#4a5058"/>

      <!-- Castle windows in body -->
      <rect x="415" y="290" width="12" height="18" fill="#4a5058"/>
      <rect x="445" y="290" width="12" height="18" fill="#4a5058"/>
      <rect x="740" y="290" width="12" height="18" fill="#4a5058"/>
      <rect x="770" y="290" width="12" height="18" fill="#4a5058"/>

      <!-- Front city wall -->
      <rect x="0" y="380" width="1200" height="80" fill="#9098a0"/>
      <rect x="0" y="363" width="1200" height="20" fill="#9098a0"/>
      <g fill="#9098a0">
        <rect x="0"    y="347" width="20" height="17"/>
        <rect x="26"   y="347" width="20" height="17"/>
        <rect x="52"   y="347" width="20" height="17"/>
        <rect x="78"   y="347" width="20" height="17"/>
        <rect x="104"  y="347" width="20" height="17"/>
        <rect x="130"  y="347" width="20" height="17"/>
        <rect x="156"  y="347" width="20" height="17"/>
        <rect x="182"  y="347" width="20" height="17"/>
        <rect x="208"  y="347" width="20" height="17"/>
        <rect x="234"  y="347" width="20" height="17"/>
        <rect x="260"  y="347" width="20" height="17"/>
        <rect x="286"  y="347" width="20" height="17"/>
        <rect x="312"  y="347" width="20" height="17"/>
        <rect x="338"  y="347" width="20" height="17"/>
        <rect x="364"  y="347" width="20" height="17"/>
        <rect x="390"  y="347" width="20" height="17"/>
        <rect x="416"  y="347" width="20" height="17"/>
        <!-- Gate gap: 442–758 -->
        <rect x="758"  y="347" width="20" height="17"/>
        <rect x="784"  y="347" width="20" height="17"/>
        <rect x="810"  y="347" width="20" height="17"/>
        <rect x="836"  y="347" width="20" height="17"/>
        <rect x="862"  y="347" width="20" height="17"/>
        <rect x="888"  y="347" width="20" height="17"/>
        <rect x="914"  y="347" width="20" height="17"/>
        <rect x="940"  y="347" width="20" height="17"/>
        <rect x="966"  y="347" width="20" height="17"/>
        <rect x="992"  y="347" width="20" height="17"/>
        <rect x="1018" y="347" width="20" height="17"/>
        <rect x="1044" y="347" width="20" height="17"/>
        <rect x="1070" y="347" width="20" height="17"/>
        <rect x="1096" y="347" width="20" height="17"/>
        <rect x="1122" y="347" width="20" height="17"/>
        <rect x="1148" y="347" width="20" height="17"/>
        <rect x="1174" y="347" width="26" height="17"/>
      </g>

      <!-- Gate opening in front wall -->
      <rect x="450" y="347" width="300" height="113" fill="#4a5058"/>
      <ellipse cx="600" cy="347" rx="150" ry="40" fill="#4a5058"/>
      <!-- Gate portcullis bars -->
      <g stroke="#9098a0" stroke-width="6" opacity="0.6">
        <line x1="480" y1="347" x2="480" y2="460"/>
        <line x1="510" y1="347" x2="510" y2="460"/>
        <line x1="540" y1="347" x2="540" y2="460"/>
        <line x1="570" y1="347" x2="570" y2="460"/>
        <line x1="600" y1="347" x2="600" y2="460"/>
        <line x1="630" y1="347" x2="630" y2="460"/>
        <line x1="660" y1="347" x2="660" y2="460"/>
        <line x1="690" y1="347" x2="690" y2="460"/>
        <line x1="720" y1="347" x2="720" y2="460"/>
        <line x1="470" y1="380" x2="730" y2="380"/>
        <line x1="460" y1="410" x2="740" y2="410"/>
        <line x1="455" y1="440" x2="745" y2="440"/>
      </g>

      <!-- Ground -->
      <rect x="0" y="460" width="1200" height="140" fill="url(#ground-grad)"/>

      <!-- Ground stone lines -->
      <g stroke="#4a5058" stroke-width="1" opacity="0.4">
        <line x1="0" y1="480" x2="1200" y2="480"/>
        <line x1="0" y1="500" x2="1200" y2="500"/>
        <line x1="0" y1="520" x2="1200" y2="520"/>
        <line x1="100" y1="460" x2="100" y2="540"/>
        <line x1="250" y1="460" x2="250" y2="540"/>
        <line x1="400" y1="460" x2="400" y2="540"/>
        <line x1="550" y1="460" x2="550" y2="540"/>
        <line x1="700" y1="460" x2="700" y2="540"/>
        <line x1="850" y1="460" x2="850" y2="540"/>
        <line x1="1000" y1="460" x2="1000" y2="540"/>
        <line x1="1150" y1="460" x2="1150" y2="540"/>
      </g>

      <!-- Fog layer at ground -->
      <rect x="0" y="440" width="1200" height="30" fill="#d4dce4" opacity="0.35"/>
    </svg>

  <div
    class="city-grid"
  >
    <GameMainButton @click="STRUCTURE.wall.modal = true" class="bg-yellow">
      Wall
    </GameMainButton>
    <GameMainButton @click="STRUCTURE.cityhall.modal = true" class="bg-emerald">
      City Hall
    </GameMainButton>
    <GameMainButton @click="STRUCTURE.storage.modal = true" class="bg-cyan">
      Storage
    </GameMainButton>
    <GameMainButton @click="STRUCTURE.market.modal = true" class="bg-amber">
      Market
    </GameMainButton>
    <GameMainButton @click="STRUCTURE.military.modal = true" class="bg-red">
      Military
    </GameMainButton>
    <GameMainButton @click="STRUCTURE.science.modal = true" class="bg-lime">
      Science
    </GameMainButton>
    <GameMainButton @click="STRUCTURE.tavern.modal = true" class="bg-pink">
      Tavern
    </GameMainButton>
    <GameMainButton @click="STRUCTURE.palace.modal = true" class="bg-purple">
      Palace
    </GameMainButton>
    <GameMainButton @click="STRUCTURE.navy.modal = true" class="bg-blue">
      Shipyard
    </GameMainButton>
  </div>
  <Modal>
    <CityHall v-if="STRUCTURE.cityhall.modal" />
    <Military v-else-if="STRUCTURE.military.modal" />
    <Storage v-else-if="STRUCTURE.storage.modal" />
    <Science v-else-if="STRUCTURE.science.modal" />
    <Tavern v-else-if="STRUCTURE.tavern.modal" />
    <Navy v-else-if="STRUCTURE.navy.modal" />
    <Market v-else-if="STRUCTURE.market.modal" />
    <Palace v-else-if="STRUCTURE.palace.modal" />
    <Wall v-else-if="STRUCTURE.wall.modal" />
    <Points v-else-if="STRUCTURE.points.modal" />
    <Events v-else-if="STRUCTURE.notifies.modal" />
  </Modal>
  </div>
</template>

<script setup lang="ts">
import { useStructureStore } from "../store/structure";

const STRUCTURE = useStructureStore();
</script>

<style scoped>
.city-wrap {
  position: relative;
  width: 100%;
  height: 90vh;
  overflow: hidden;
  background: #b0b8c4;
}

.city-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.city-grid {
  position: relative;
  z-index: 1;
  display: grid;
  padding: 2.5rem 1.25rem;
  padding-top: 7.5rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(7, 1fr);
  gap: 2.5rem;
  width: 100%;
  height: 100%;
}

@media (min-width: 768px) {
  .city-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
