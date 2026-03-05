<template>
  <div class="flex flex-col gap-5 items-center justify-center w-full h-100vh">
    <p>Name of Capital</p>
    <input class="p-2" v-model="data.name" type="text" />
    <p>Map Size</p>
    <select class="p-2" name="size" v-model="data.size">
      <option>small</option>
      <option>default</option>
      <option>large</option>
    </select>
    <button class="w-40 p-2" @click="onStart">Create</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useCycleStore } from '../store/cycle';
import { usePlayerStore } from '../store/player';
import { getNewCity, getNewPlayerData } from '../defines/player';

const CYCLE = useCycleStore()
const PLAYER = usePlayerStore()

const data = reactive({
  name: '',
  size: 'default',
})

const onStart = () => {
  if(!data.name) return

  CYCLE.started = true

  PLAYER.activeCity = getNewCity()
  PLAYER.activeCity.cityhall.name = data.name
  PLAYER.activeCityName = data.name
  PLAYER.data = {
    map: {
      type: 'default'
    },
    ...getNewPlayerData(),
    cities: [PLAYER.activeCity]
  }

  let _population = PLAYER.activeCity.cityhall.population.time / 1000
  let _gold = 3

  setInterval(() => {
    _population--
    _gold--

    if(_gold < 0) {
      const cities = PLAYER.data.cities.filter((city) => city.cityhall.name !== PLAYER.activeCity.cityhall.name)
      const citiesPopGold = [...cities, PLAYER.activeCity].reduce((acc, current) => {
        return acc + (current.cityhall.population.acc - (Number(current.science.workers) + Number(current.tavern.workers)))
      }, 0)

      PLAYER.data.gold += citiesPopGold
      _gold = 3
    }

    if(_population < 0) {
      if(PLAYER.activeCity.cityhall.population.acc <= PLAYER.activeCity.cityhall.population.maxAcc) {
        PLAYER.activeCity.cityhall.population.acc++
      }

      PLAYER.data.cities = PLAYER.data.cities.map(city => {
        if(city.cityhall.population.acc <= city.cityhall.population.maxAcc) {
          if(city.cityhall.name === PLAYER.activeCity.cityhall.name) return city

          city.cityhall.population.acc++
        }

        return city
      })
      _population = PLAYER.activeCity.cityhall.population.time / 1000
    }
  }, 1000)
}
</script>