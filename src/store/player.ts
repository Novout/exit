import { defineStore } from "pinia"
import type { City, Player } from "../types"

export const usePlayerStore = defineStore('player', {
  state: () => ({ 
    data: {} as Player,
    activeCityName: '',
    activeCity: {} as City
  }),
})