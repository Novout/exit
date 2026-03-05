<template>
  <StructureModal name="market">
    <div class="flex flex-col gap-2 w-full overflow-auto h-100">
      <p>Level: {{ PLAYER.activeCity.market.level }}</p>
      <div class="flex flex-col w-full">
        <h2>Buy</h2>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconWood class="h-8 w-8" />
          <p>{{ buy.wood }}</p>
          <input class="w-90%" type="range" id="volume" name="volume" v-model="buy.wood" :min="0" :max="10" />
        </div>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconStone class="h-8 w-8" />
          <p>{{ buy.stone }}</p>
          <input class="w-90%" type="range" id="volume" name="volume" v-model="buy.stone" :min="0" :max="10" />
        </div>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconWine class="h-8 w-8" />
          <p>{{ buy.wine }}</p>
          <input class="w-90%" type="range" id="volume" name="volume" v-model="buy.wine" :min="0" :max="10" />
        </div>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconSulfur class="h-8 w-8" />
          <p>{{ buy.sulfur }}</p>
          <input class="w-90%" type="range" id="volume" name="volume" v-model="buy.sulfur" :min="0" :max="10" />
        </div>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconCrystal class="h-8 w-8" />
          <p>{{ buy.crystal }}</p>
          <input class="w-90%" type="range" id="volume" name="volume" v-model="buy.crystal" :min="0" :max="10" />
        </div>
        <Button>Buy</Button>
      </div>
      <div class="flex flex-col w-full">
        <h2>Sell</h2>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconWood class="h-8 w-8" />
          <p>{{ sell.wood }}</p>
          <input class="w-90%" type="range" id="volume" name="volume" v-model="sell.wood" :min="0" :max="10" />
        </div>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconStone class="h-8 w-8" />
          <p>{{ sell.stone }}</p>
          <input class="w-90%" type="range" id="volume" name="volume" v-model="sell.stone" :min="0" :max="10" />
        </div>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconWine class="h-8 w-8" />
          <p>{{ sell.wine }}</p>
          <input class="w-90%" type="range" id="volume" name="volume" v-model="sell.wine" :min="0" :max="10" />
        </div>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconSulfur class="h-8 w-8" />
          <p>{{ sell.sulfur }}</p>
          <input class="w-90%" type="range" id="volume" name="volume" v-model="sell.sulfur" :min="0" :max="10" />
        </div>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconCrystal class="h-8 w-8" />
          <p>{{ sell.crystal }}</p>
          <input class="w-90%" type="range" id="volume" name="volume" v-model="sell.crystal" :min="0" :max="10" />
        </div>
        <Button>Sell</Button>
      </div>
      <div class="flex w-full justify-between pt-10"><ResourcesBar :resources="resources" /><Button @click="onUpgrade">Upgrade</Button></div>
    </div>
  </StructureModal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { CityhallUpgrade, MarketUpgrade } from '../../../defines/upgrades';
import { usePlayerStore } from '../../../store/player';

const PLAYER = usePlayerStore()

const resources = ref(MarketUpgrade(PLAYER.activeCity.science.level + 1))

const buy = reactive({
  wood: 0,
  stone: 0,
  wine: 0,
  sulfur: 0,
  crystal: 0
})

const sell = reactive({
  wood: 0,
  stone: 0,
  wine: 0,
  sulfur: 0,
  crystal: 0
})

const onUpgrade = () => {
  const levelTarget = PLAYER.activeCity.science.level + 1

  const upg = CityhallUpgrade(levelTarget)

  if(upg) {
    const dmgWood = upg.wood
    const dmgStone = upg.stone 

    if(PLAYER.activeCity.cityhall.wood.acc >= dmgWood && PLAYER.activeCity.cityhall.stone.acc >= dmgStone) {
      PLAYER.activeCity.cityhall.wood.acc -= upg.wood
      PLAYER.activeCity.cityhall.stone.acc -= upg.stone
      PLAYER.activeCity.science.level++
    }
  }
}
</script>