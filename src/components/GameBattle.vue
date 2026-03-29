<template>
  <div class="flex flex-col w-full items-center pt-10 min-h-100vh">
    <div class="flex flex-col items-center justify-center w-full">
      <div class="flex flex-col items-center justify-center flex-1 gap-6 w-full">
        <div v-for="(atk, key) in attacker" :key="key" class="flex flex-row items-center gap-3">
          <div v-for="(value, index) in getStacks(atk)" :key="index">
            <div class="flex flex-row items-center gap-2 rounded-xl bg-dark text-white px-1 border-black border-2" v-if="index <= 2">
              <IconArcher class="w-5 h-5" v-if="true" />
              <p>{{ value }} / {{ atk[3] }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="px-1 border-2 border-black border-solid w-90% mt-5"></div>
      <div class="flex flex-col items-center justify-center flex-1 pt-5 gap-6 w-full">
        <div v-for="(atk, key) in defender" :key="key" class="flex flex-row items-center gap-3">
          <div v-for="(value, index) in getStacks(atk)" :key="index">
            <div class="flex flex-row items-center gap-2 rounded-xl bg-dark text-white px-1 border-black border-2" v-if="index <= 2">
              <IconArcher class="w-5 h-5" v-if="true" />
              <p>{{ value }} / {{ atk[3] }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute left-10 flex flex-col bottom-0">
      <h2 class="font-poppins">Attacker</h2>
      <div class="flex flex-row items-center gap-3">
        <div v-for="(atk, key) in attacker" :key="key" class="flex flex-row items-center gap-3">
          <IconArcher class="w-5 h-5" v-if="true" />
          <p>{{ atk[2] }} / {{ atk[3] }}</p>
        </div>
      </div>
    </div>
    <div class="absolute right-10 flex flex-col bottom-0">
      <h2 class="font-poppins">Defender</h2>
      <div class="flex flex-row items-center gap-3">
        <div v-for="(atk, key) in defender" :key="key" class="flex flex-row items-center gap-3">
          <IconArcher class="w-5 h-5" v-if="true" />
          <p>{{ atk[2] }} / {{ atk[3] }}</p>
        </div>
      </div>
    </div>
    <Button v-if="!isFinished" @click="onNextRound" class="absolute top-10 right-10">Next Round</Button>
    <Button v-else>Fechar</Button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { UnitBattleContext } from '../types';
import { useBattle } from '../use/battle';
import { useBattleStore } from '../store/battle';
import { getBattleValues } from '../defines/battle';

const BATTLE = useBattleStore()

const battle = useBattle()
const defines = getBattleValues()

const round = ref(0)
const isFinished = ref(false)

const attacker = ref<UnitBattleContext>()
const defender = ref<UnitBattleContext>()

onMounted(() => {
  attacker.value = BATTLE.base.attacker || []
  defender.value = BATTLE.base.defender || []
})

const getStacks = (atk: any[]) => {
  return battle.splitUnitsByStack(atk[2], atk[3])
}

const onNextRound = () => {
  const attackerDmg = battle.getTotalDamage(attacker.value as UnitBattleContext)
  const defenderDmg = battle.getTotalDamage(defender.value as UnitBattleContext, true)

  const isWall = battle.asType(defender.value as UnitBattleContext, 'wall')
  const wallLevel = BATTLE.base.city?.wall.level || 1

  if(isWall) {
    const hp = wallLevel * defines.wall().hp
    const total = isWall[2] * hp
    
    if(attackerDmg >= total) {
      defender.value = defender.value?.filter(item => item[0] !== 'wall')
    } else {
      defender.value = defender.value?.map(item => {
        let damage = attackerDmg
        while(damage > 0) {
          if(item[0] === 'wall' && attackerDmg >= hp) {
            item[3]--
          }
          damage -= hp
        }

        return item
      })
    }
  } else {

  }

  round.value++
}
</script>