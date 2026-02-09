<template>
  <div class="p-5 font-poppins flex items-center w-full text-lg">
    <div class="flex items-center w-full">
     Turno {{  CYCLE.value }}
    </div>
    <div class="flex items-center w-full">
      Suprimentos {{ PLAYER.fortress.supply.acc }} / {{ PLAYER.fortress.supply.maxAcc }}
    </div>
    <div class="flex items-center w-full">
      Munição {{ PLAYER.fortress.ammunition.acc }} / {{ PLAYER.fortress.ammunition.maxAcc }}
    </div>
    <div class="flex items-center w-full">
      Recursos {{ PLAYER.fortress.resources.acc }} / {{ PLAYER.fortress.resources.maxAcc }}
    </div>
    <div class="flex items-center w-full">
      Unidades {{ PLAYER.fortress.units.act }} / {{ PLAYER.fortress.units.maxUnits }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCycleStore } from '../store/cycle';
import { usePlayerStore } from '../store/player';

const PLAYER = usePlayerStore()
const CYCLE =  useCycleStore()
</script>