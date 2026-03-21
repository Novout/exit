<template>
  <div class="flex font-poppins flex-col gap-5 items-center justify-center w-full h-100vh">
    <div class="flex flex-col rounded-lg w-120 bg-bluegray p-5 h-80 items-center justify-between">
      <p class="font-bold">Name of Capital</p>
      <input class="p-2" v-model="data.name" type="text" />
      <p>Map Size</p>
      <select class="p-2" name="size" v-model="data.size">
        <option>Small</option>
        <option>Default</option>
        <option>Large</option>
      </select>
      <button class="w-40 p-2 font-poppins cursor-pointer b-2 border-bluegray" @click="onStart">Create</button>
    </div>
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
import { useControllerStore } from '../store/controller';
import { useEventsStore } from '../store/events';

const CYCLE = useCycleStore()
const PLAYER = usePlayerStore()
const WORLD = useWolrdStore()
const CONTROLLER = useControllerStore()
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
    } else if (index === 1) {
      city.owner = 'bot-1'
      city.name = 'Bot 1'
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

    CONTROLLER.points.forEach((item, index) => {
      if(item.start && !item.finish) {
        if(CONTROLLER.points[index]) {
          CONTROLLER.points[index].value--

          if(item.value <= 0) {
            CONTROLLER.points[index].finish = true
  
            EVENTS.list.unshift({
              type: 'points',
              message: item.message
            })
          }
        }
      }
    })

    CONTROLLER.constructions.forEach((item, index) => {
      if(item.start && !item.finish) {
        if(CONTROLLER.constructions[index]) {
          const activeLevel = item.activeLevel
        
          const active = item.level[activeLevel]

          if(active) CONTROLLER.constructions[index].level[activeLevel]--

          if(item.level[activeLevel] <= 0) {
            CONTROLLER.constructions[index].finish = true
            CONTROLLER.constructions[index].start = false

            if(item.id === 'cityhall') {
              PLAYER.activeCity.cityhall.level++
              PLAYER.activeCity.cityhall.population.maxAcc += 30
            } else if (item.id === 'market') {
              PLAYER.activeCity.market.level++
            } else if (item.id === 'military') {
              PLAYER.activeCity.military.level++
            } else if (item.id === 'navy') {
              PLAYER.activeCity.shipyard.level++
            } else if (item.id === 'palace') {
              PLAYER.activeCity.palace.level++
            } else if (item.id === 'science') {
              PLAYER.activeCity.science.level++
            } else if (item.id === 'storage') {
              PLAYER.activeCity.storage.level++
            } else if (item.id === 'tavern') {
              PLAYER.activeCity.tavern.level++
            } else if (item.id === 'wall') {
              PLAYER.activeCity.wall.level++
            } else if (item.id === 'wood_0') {
              PLAYER.activeCity.locksmith.level++
            } else if (item.id === 'bonus_0') {
              PLAYER.activeCity.bonus.level++
            } 

            EVENTS.list.unshift({
              type: 'constructions',
              message: item.message
            })
          }
        }
      }
    })
  }, 1000)
}
</script>