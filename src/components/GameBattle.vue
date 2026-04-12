<template>
  <div class="flex flex-col w-full items-center pt-10 min-h-100vh">
    <div class="flex flex-col items-center justify-center w-full">
      <div class="flex flex-col items-center justify-center flex-1 gap-6 w-full">
        <div v-for="(atk, key) in attacker" :key="key" class="flex flex-row items-center gap-3">
          <div v-for="(value, index) in getStacks(atk)" :key="index">
            <div class="flex flex-row items-center gap-2 rounded-xl bg-dark text-white px-1 border-black border-2" v-if="index <= 2">
              <IconSpearman class="w-5 h-5" v-if="atk[0] === 'spearman' && atk[1] !== 'disabled'" />
              <IconArcher class="w-5 h-5" v-else-if="atk[0] === 'archer' && atk[1] !== 'disabled'" />
              <IconViking class="w-5 h-5" v-else-if="atk[0] === 'viking' && atk[1] !== 'disabled'" />
              <IconHoplita class="w-5 h-5" v-else-if="atk[0] === 'hoplita' && atk[1] !== 'disabled'" />
              <IconCatapult class="w-5 h-5" v-else-if="atk[0] === 'catapult' && atk[1] !== 'disabled'" />
              <IconMech class="w-5 h-5" v-else-if="atk[0] === 'mech' && atk[1] !== 'disabled'" />
              <IconWall class="w-5 h-5" v-else-if="atk[0] === 'wall' && atk[1] !== 'disabled'" />
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
              <IconSpearman class="w-5 h-5" v-if="atk[0] === 'spearman' && atk[1] !== 'disabled'" />
              <IconArcher class="w-5 h-5" v-else-if="atk[0] === 'archer' && atk[1] !== 'disabled'" />
              <IconViking class="w-5 h-5" v-else-if="atk[0] === 'viking' && atk[1] !== 'disabled'" />
              <IconHoplita class="w-5 h-5" v-else-if="atk[0] === 'hoplita' && atk[1] !== 'disabled'" />
              <IconCatapult class="w-5 h-5" v-else-if="atk[0] === 'catapult' && atk[1] !== 'disabled'" />
              <IconMech class="w-5 h-5" v-else-if="atk[0] === 'mech' && atk[1] !== 'disabled'" />
              <IconWall class="w-5 h-5" v-else-if="atk[0] === 'wall' && atk[1] !== 'disabled'" />
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
          <IconSpearman class="w-5 h-5" v-if="atk[0] === 'spearman'" />
          <IconArcher class="w-5 h-5" v-else-if="atk[0] === 'archer'" />
          <IconViking class="w-5 h-5" v-else-if="atk[0] === 'viking'" />
          <IconHoplita class="w-5 h-5" v-else-if="atk[0] === 'hoplita'" />
          <IconCatapult class="w-5 h-5" v-else-if="atk[0] === 'catapult'" />
          <IconMech class="w-5 h-5" v-else-if="atk[0] === 'mech'" />
          <IconWall class="w-5 h-5" v-else-if="atk[0] === 'wall'" />
          <p>{{ atk[2] }} / {{ atk[3] }}</p>
        </div>
      </div>
    </div>
    <div class="absolute right-10 flex flex-col bottom-0">
      <h2 class="font-poppins">Defender</h2>
      <div class="flex flex-row items-center gap-3">
        <div v-for="(atk, key) in defender" :key="key" class="flex flex-row items-center gap-3">
          <IconSpearman class="w-5 h-5" v-if="atk[0] === 'spearman'" />
          <IconArcher class="w-5 h-5" v-else-if="atk[0] === 'archer'" />
          <IconViking class="w-5 h-5" v-else-if="atk[0] === 'viking'" />
          <IconHoplita class="w-5 h-5" v-else-if="atk[0] === 'hoplita'" />
          <IconCatapult class="w-5 h-5" v-else-if="atk[0] === 'catapult'" />
          <IconMech class="w-5 h-5" v-else-if="atk[0] === 'mech'" />
          <IconWall class="w-5 h-5" v-else-if="atk[0] === 'wall'" />
          <p>{{ atk[2] }} / {{ atk[3] }}</p>
        </div>
      </div>
    </div>
    <h2 @click="onNextRound" class="absolute top-6.5 right-40">Round {{ round }}</h2>
    <Button v-if="!isFinished" @click="onNextRound" class="absolute top-10 right-10">Next Round</Button>
    <Button class="absolute top-10 right-10" @click="CYCLE.type = 'city'" v-else>Close</Button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { UnitBattleContext } from '../types';
import { useBattle } from '../use/battle';
import { useBattleStore } from '../store/battle';
import { getBattleValues } from '../defines/battle';
import { useCycleStore } from '../store/cycle';
import { usePlayerStore } from '../store/player';

const BATTLE = useBattleStore()
const CYCLE = useCycleStore()
const PLAYER = usePlayerStore()

const battle = useBattle()
const defines = getBattleValues()

const round = ref(0)
const isFinished = ref(false)

const attacker = ref<UnitBattleContext>()
const defender = ref<UnitBattleContext>()

onMounted(() => {
  attacker.value = BATTLE.base.attacker?.reverse() || []
  defender.value = BATTLE.base.defender || []
})

const getStacks = (atk: any[]) => {
  return battle.splitUnitsByStack(atk[2], atk[3])
}

const onNextRound = () => {
  let attackerDmg = battle.getTotalDamage(attacker.value as UnitBattleContext)
  let defenderDmg = battle.getTotalDamage(defender.value as UnitBattleContext, true)

  const asWall = battle.asType(defender.value as UnitBattleContext, 'wall')
  const wallLevel = BATTLE.base.city?.wall.level || 1

  if(asWall) {
    const hp = wallLevel * defines.wall().hp
    const total = asWall[2] * hp
    
    if(attackerDmg >= total) {
      defender.value = defender.value?.filter(item => item[0] !== 'wall')
    } else {
      defender.value = defender.value?.map(item => {
        let damage = attackerDmg
        while(damage > 0) {
          if(item[0] === 'wall' && attackerDmg >= hp) {
            item[2]--
          }
          damage -= hp
        }

        return item
      })
    }

    round.value++
  } else {

  let isFrontlineDefender = false

  if(!defender.value) return

  const line = battle.getLineSequence(defender.value)
  const defenderItem = defender.value.find((item) => item[1] === line)
  if(!defenderItem) return
  const defenderIndex = defender.value.indexOf(defenderItem)

  let acc_units = 0
  let acc_hp = 0
  let acc_raw_hp = 0

  if(defenderItem[0] === 'mech') {
    if(defenderItem[2] < 21) {
      isFrontlineDefender = true
      acc_units = defenderItem[2]
      acc_hp = defines.mech().hp * defenderItem[2]
      acc_raw_hp = defines.mech().hp
    } else {
      acc_hp = defines.mech().hp * 21
      acc_units = 21
      acc_raw_hp = defines.mech().hp
    }
  }
  
  if(defenderItem[0] === 'hoplita') {
    if(defenderItem[2] < 90 && !isFrontlineDefender) {
      isFrontlineDefender = true
      acc_units = defenderItem[2]
      acc_hp = defines.hoplita().hp * defenderItem[2]
      acc_raw_hp = defines.hoplita().hp
    } else {
      acc_hp = defines.hoplita().hp * 90
      acc_units = 90
      acc_raw_hp = defines.hoplita().hp
    }
  }

  if(defenderItem[0] === 'spearman') {
    if(defenderItem[2] < 90 && !isFrontlineDefender) {
      acc_units = defenderItem[2]
      acc_hp = defines.spearman().hp * defenderItem[2]
      acc_raw_hp = defines.spearman().hp
    } else {
      acc_hp = defines.spearman().hp * 90
      acc_units = 90
      acc_raw_hp = defines.spearman().hp
    }
  }

  if(defenderItem[0] === 'archer') {
    if(defenderItem[2] < 90) {
      acc_units = defenderItem[2]
      acc_hp = defines.archer().hp * defenderItem[2]
      acc_raw_hp = defines.archer().hp
    } else {
      acc_hp = defines.archer().hp * 90
      acc_units = 90
      acc_raw_hp = defines.archer().hp
    }
  }

  if(defenderItem[0] === 'catapult') {
    if(defenderItem[2] < 30) {
      acc_units = defenderItem[2]
      acc_hp = defines.catapult().hp * defenderItem[2]
      acc_raw_hp = defines.catapult().hp
    } else {
      acc_hp = defines.catapult().hp * 30
      acc_units = 30
      acc_raw_hp = defines.catapult().hp
    }
  }

  let breakLoop = false
  while(attackerDmg > 0) {
    defenderItem[2]--
    attackerDmg -= acc_raw_hp
    acc_units -= 1

    if(defenderItem[2] <= 0) {
      breakLoop = true
      defender.value[defenderIndex] = [defenderItem[0], 'disabled', 0, 0]
      attackerDmg = 0
    }
  }
  
  if(!breakLoop) defender.value[defenderIndex] = defenderItem

  const attDefender = battle.getTotalDamage(defender.value as UnitBattleContext, true)
  if(attDefender <= 0) {
    isFinished.value = true

    // TODO: limit with maxAcc
    if(BATTLE.base.playerSide === 'attacker' && BATTLE.base.winBonus) {
      PLAYER.activeCity.cityhall.stone.acc += BATTLE.base.winBonus.stone
      PLAYER.activeCity.cityhall.wine.acc += BATTLE.base.winBonus.wine
      PLAYER.activeCity.cityhall.wood.acc += BATTLE.base.winBonus.wood
      PLAYER.activeCity.cityhall.sulfur.acc += BATTLE.base.winBonus.sulfur
      PLAYER.activeCity.cityhall.crystal.acc += BATTLE.base.winBonus.crystal
    }

    if(BATTLE.base.isViking) PLAYER.data.island.vikingLevel++
  
    return
  }

  if(!attacker.value) return

  const lineAttack = battle.getLineSequence(attacker.value)
  const attackItem = attacker.value.find((item) => item[1] === lineAttack)
  if(!attackItem) return
  const attackIndex = attacker.value.indexOf(attackItem)

  acc_units = 0
  acc_hp = 0
  acc_raw_hp = 0

  if(attackItem[0] === 'mech') {
    if(attackItem[2] < 21) {
      isFrontlineDefender = true
      acc_units = attackItem[2]
      acc_hp = defines.mech().hp * attackItem[2]
      acc_raw_hp = defines.mech().hp
    } else {
      acc_hp = defines.mech().hp * 21
      acc_units = 21
      acc_raw_hp = defines.mech().hp
    }
  }
  
  if(attackItem[0] === 'hoplita') {
    if(attackItem[2] < 90 && !isFrontlineDefender) {
      isFrontlineDefender = true
      acc_units = attackItem[2]
      acc_hp = defines.hoplita().hp * attackItem[2]
      acc_raw_hp = defines.hoplita().hp
    } else {
      acc_hp = defines.hoplita().hp * 90
      acc_units = 90
      acc_raw_hp = defines.hoplita().hp
    }
  }

  if(attackItem[0] === 'spearman') {
    if(attackItem[2] < 90 && !isFrontlineDefender) {
      acc_units = attackItem[2]
      acc_hp = defines.spearman().hp * attackItem[2]
      acc_raw_hp = defines.spearman().hp
    } else {
      acc_hp = defines.spearman().hp * 90
      acc_units = 90
      acc_raw_hp = defines.spearman().hp
    }
  }

  if(attackItem[0] === 'archer') {
    if(attackItem[2] < 90) {
      acc_units = attackItem[2]
      acc_hp = defines.archer().hp * attackItem[2]
      acc_raw_hp = defines.archer().hp
    } else {
      acc_hp = defines.archer().hp * 90
      acc_units = 90
      acc_raw_hp = defines.archer().hp
    }
  }

  if(attackItem[0] === 'catapult') {
    if(attackItem[2] < 30) {
      acc_units = attackItem[2]
      acc_hp = defines.catapult().hp * attackItem[2]
      acc_raw_hp = defines.catapult().hp
    } else {
      acc_hp = defines.catapult().hp * 30
      acc_units = 30
      acc_raw_hp = defines.catapult().hp
    }
  }

  breakLoop = false
  while(defenderDmg > 0) {
    attackItem[2]--
    defenderDmg -= acc_raw_hp
    acc_units -= 1

    if(attackItem[2] <= 0) {
      breakLoop = true
      attacker.value[attackIndex] = [attackItem[0], 'disabled', 0, 0]
      defenderDmg = 0
    }
  }
  
  if(!breakLoop) defender.value[attackIndex] = attackItem

  const attAttack = battle.getTotalDamage(attacker.value as UnitBattleContext, true)
  if(attAttack <= 0) {
    isFinished.value = true

    // TODO: limit with maxAcc
    if(BATTLE.base.playerSide === 'defender' && BATTLE.base.winBonus) {
      PLAYER.activeCity.cityhall.stone.acc += BATTLE.base.winBonus.stone
      PLAYER.activeCity.cityhall.wine.acc += BATTLE.base.winBonus.wine
      PLAYER.activeCity.cityhall.wood.acc += BATTLE.base.winBonus.wood
      PLAYER.activeCity.cityhall.sulfur.acc += BATTLE.base.winBonus.sulfur
      PLAYER.activeCity.cityhall.crystal.acc += BATTLE.base.winBonus.crystal
    }

    if(BATTLE.base.isViking) PLAYER.data.island.vikingLevel++
  
    return
  }

  round.value++
}}
</script>