<template>
  <StructureModal name="fortress">
    <div class="flex gap-2 w-full">
      <Button @click="onUpgradeFortless">Melhorar</Button>
      <IconWall v-if="PLAYER.fortress.set.barricades" class="w-8 h-8 text-black" />
      <IconMedal v-if="PLAYER.fortress.set.patrol" class="w-8 h-8 text-black" />
    </div>
    <h3 v-if="!PLAYER.fortress.set.barricades && !PLAYER.fortress.set.patrol">Para esta noite...</h3>
    <p v-if="!PLAYER.fortress.set.barricades">Melhorar as barricadas</p><Button  v-if="!PLAYER.fortress.set.barricades" :class="[PLAYER.fortress.set.barricades ? 'bg-black text-white' : '']" @click="onSetBarricades">-15 recursos</Button>
    <p v-if="!PLAYER.fortress.set.patrol">Patrulha</p><Button v-if="!PLAYER.fortress.set.patrol" :class="[PLAYER.fortress.set.patrol ? 'bg-black text-white' : '']" @click="onSetPatrol">-20 suprimentos -10 munição</Button>
  </StructureModal>
</template>

<script setup lang="ts">
import { usePlayerStore } from '../../../store/player';

const PLAYER = usePlayerStore()

const onSetBarricades = () => {
  const isValidBuy = PLAYER.fortress.resources.acc - 15
  
  if(isValidBuy >= 0) {
    PLAYER.fortress.resources.acc = isValidBuy
    PLAYER.fortress.set.barricades = true
  }
  
}

const onSetPatrol = () => {
  const isValidSupply = PLAYER.fortress.supply.acc - 20
  const isValidAmmunition = PLAYER.fortress.ammunition.acc - 10
  
  if(isValidSupply >= 0 && isValidAmmunition >= 0 ) {
    PLAYER.fortress.supply.acc = isValidSupply
    PLAYER.fortress.ammunition.acc = isValidAmmunition
    PLAYER.fortress.set.patrol = true
  }
}

const onUpgradeFortless = () => {
  const levelTarget = PLAYER.fortress.level + 1

  const upgrade = {
    2: {
      supply: 50,
      ammunition:0,
      resources: 60,
      unitsMax: 5
    },
    3: {
      supply: 80,
      ammunition:0,
      resources: 110,
      unitsMax: 10
    },
    4: {
      supply: 120,
      ammunition:0,
      resources: 175,
      unitsMax: 17
    },
    5: {
      supply: 150,
      ammunition:0,
      resources: 300,
      unitsMax: 30
    }
  }[levelTarget] || false

  if(upgrade) {
    const dmgSupply = upgrade.supply 
    const dmgResources = upgrade.resources 

    if(PLAYER.fortress.supply.acc >= dmgSupply && PLAYER.fortress.resources.acc >= dmgResources) {
      PLAYER.fortress.supply.maxAcc = upgrade.supply
      PLAYER.fortress.resources.maxAcc = upgrade.resources
      PLAYER.fortress.units.maxUnits = upgrade.unitsMax
  
      PLAYER.fortress.supply.acc -= dmgSupply
      PLAYER.fortress.resources.acc -= dmgResources
  
      PLAYER.fortress.level++
    }
  }
}
</script>