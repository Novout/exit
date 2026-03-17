<template>
  <div class="flex flex-col gap-5 items-center justify-center w-full h-100vh">
    <p>Name of Capital</p>
    <input class="p-2" v-model="data.name" type="text" />
    <p>Map Size</p>
    <select class="p-2" name="size" v-model="data.size">
      <option>Small</option>
      <option>Default</option>
      <option>Large</option>
    </select>
    <button class="w-40 p-2" @click="onStart">Create</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useCycleStore } from '../store/cycle';
import { usePlayerStore } from '../store/player';
import { getNewCity, getNewPlayerData } from '../defines/player';
import { useWorld } from '../use/world';
import { random } from '../utils';
import { useWolrdStore } from '../store/world';
import type { IslandCity } from '../types';
import { MarketSet } from '../defines/upgrades';
import { usePointsStore } from '../store/points';
import { useEventsStore } from '../store/events';

const CYCLE = useCycleStore()
const PLAYER = usePlayerStore()
const WORLD = useWolrdStore()
const POINTS = usePointsStore()
const EVENTS = useEventsStore()

const world = useWorld()

const data = reactive({
  name: '',
  size: 'Default',
})

const onStart = () => {
  if(!data.name) return

  CYCLE.started = true
  
  world.create()

  PLAYER.activeCity = getNewCity()
  PLAYER.activeCity.cityhall.name = data.name
  PLAYER.activeCityName = data.name

  const island = random(WORLD.islands)
  PLAYER.data.island = island
  
  island.cities = island.cities.map((city: IslandCity, index: number) => {
    if(index === 0) {
      city.owner = 'main'
      city.name = data.name
      PLAYER.activeCity.type = island.type
    }
    
    city.type = island.type

    return city
  })

  PLAYER.data = {
    actions: {
      market: {
        activeBuyAction: true,
        activeSellAction: true
      }
    },
    island,
    map: {
      type: 'default'
    },
    ...getNewPlayerData(),
    cities: []
  }

  let _population = PLAYER.activeCity.cityhall.population.time / 1000
  let _gold = 5
  let _science = 5
  let _wood = 5
  let _bonus = 5
  let _market = 60

  setInterval(() => {
    _population--
    _gold--
    _science--
    _wood--
    _bonus--
    _market--

    if(_market < 0) {
      const buy = random(MarketSet()) 
      const sell = random(MarketSet()) 

      PLAYER.data.cities = PLAYER.data.cities.map(city => {
        city.market.buyResources = buy
        city.market.sellResources = sell

        return city
      })

      PLAYER.activeCity.market.buyResources = buy
      PLAYER.activeCity.market.sellResources = sell

      PLAYER.data.actions.market.activeBuyAction = true
      PLAYER.data.actions.market.activeSellAction = true

      _market = 60
    }

    if(_wood < 0) {
      PLAYER.data.cities = PLAYER.data.cities.map(city => {
        const workers = (Number(city.locksmith.workers))
        const max = Number((workers * 4).toFixed())

        if(city.cityhall.wood.maxAcc > city.cityhall.wood.acc + max) {
          city.cityhall.wood.acc += max
        }

        return city
      })

      const workers = (Number(PLAYER.activeCity.locksmith.workers))
      const max = Number((workers * 2.5).toFixed())

      if(PLAYER.activeCity.cityhall.wood.maxAcc > PLAYER.activeCity.cityhall.wood.acc) {
        PLAYER.activeCity.cityhall.wood.acc += max
      }

      _wood = 5
    }

    if(_bonus < 0) {
      PLAYER.data.cities = PLAYER.data.cities.map(city => {
        const workers = (Number(city.bonus.workers))
        const max = Number((workers * 2.5).toFixed())

        if(city.cityhall.wood.maxAcc > city.cityhall.wood.acc + max) {
          city.cityhall[city.type].acc += max
        }

        return city
      })

      const workers = (Number(PLAYER.activeCity.bonus.workers))
      const max = Number((workers * 2.5).toFixed())

      if(PLAYER.activeCity.cityhall[PLAYER.activeCity.type].maxAcc > PLAYER.activeCity.cityhall[PLAYER.activeCity.type].acc) {

        PLAYER.activeCity.cityhall[PLAYER.activeCity.type].acc += max
      }

      _bonus = 5
    }

    if(_gold < 0) {
      const cities = PLAYER.data.cities
      const citiesPopGold = [...cities, PLAYER.activeCity].reduce((acc, current) => {
        const workers = (Number(current.science.workers) + Number(current.tavern.workers) + Number(current.bonus.workers) + Number(current.locksmith.workers))

        const soldiers = current.soldiers.reduce((acc, current) => {
          if(current.type === 'spearman') return Number(acc) + Number(current.units * 1)
          if(current.type === 'archer') return Number(acc) + Number(current.units * 2)
          if(current.type === 'catapult') return Number(acc) + Number(current.units * 6)
          if(current.type === 'hoplita') return Number(acc) + Number(current.units * 4)
          if(current.type === 'mech') return Number(acc) + Number(current.units * 2)

          return acc
        }, 0)

        return acc + (current.cityhall.population.acc - Number((workers * 4).toFixed()) - Number(soldiers.toFixed()))
      }, 0)

      PLAYER.data.gold.acc += citiesPopGold
      PLAYER.data.gold.set = citiesPopGold
      _gold = 5
    }

    if(_science < 0) {
      const cities = PLAYER.data.cities
      const citiesPopScience = [...cities, PLAYER.activeCity].reduce((acc, current) => {
        return Number(acc) + Number(current.science.workers)
      }, 0)

      PLAYER.data.science.points += citiesPopScience
      _science = 5
    }

    if(_population < 0) {
      const isValidHappyInActive = Number((PLAYER.activeCity.tavern.workers * 12).toFixed()) + 50 > PLAYER.activeCity.cityhall.population.acc
      const isValidMaxInactive = PLAYER.activeCity.cityhall.population.acc < PLAYER.activeCity.cityhall.population.maxAcc
      
      if(isValidMaxInactive && isValidHappyInActive) {
        PLAYER.activeCity.cityhall.population.acc++
      }

      PLAYER.data.cities = PLAYER.data.cities.map(city => {
        const isValidHappyInActive = Number((city.tavern.workers * 12).toFixed()) + 50 > city.cityhall.population.acc
        const isValidMaxExternal = city.cityhall.population.acc < city.cityhall.population.maxAcc

        if(isValidMaxExternal && isValidHappyInActive) {
          if(city.cityhall.name === PLAYER.activeCity.cityhall.name) return city

          city.cityhall.population.acc++
        }

        return city
      })
      _population = PLAYER.activeCity.cityhall.population.time / 1000
    }
    
    if(POINTS.economy.the_beginning_start && !POINTS.economy.the_beginning_finish) {
      POINTS.economy.the_beginning_value--

      if(POINTS.economy.the_beginning_value <= 0) {
        POINTS.economy.the_beginning_finish = true

        EVENTS.list.unshift({
          type: 'points',
          message: 'The score at the beginning was researched!'
        })
      }
    }

    if(POINTS.battlefield.distance_start && !POINTS.battlefield.distance_finish) {
      POINTS.battlefield.distance_value--

      if(POINTS.battlefield.distance_value <= 0) {
        POINTS.battlefield.distance_finish = true

        EVENTS.list.unshift({
          type: 'points',
          message: 'The score at distance was researched!'
        })
      }
    }

    if(POINTS.travel.out_to_sea_start && !POINTS.travel.out_to_sea_finish) {
      POINTS.travel.out_to_sea_value--

      if(POINTS.travel.out_to_sea_value <= 0) {
        POINTS.travel.out_to_sea_finish = true

        EVENTS.list.unshift({
          type: 'points',
          message: 'The score at out to sea was researched!'
        })
      }
    }
  }, 1000)
}
</script>