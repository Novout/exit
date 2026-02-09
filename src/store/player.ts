import { defineStore } from "pinia"

export const usePlayerStore = defineStore('player', {
  state: () => ({ 
    fortress: {
      life: 50,
      level: 1,
      set: {
        barricades: false,
        patrol: false
      },
      supply: {
        acc: 30,
        maxAcc: 50
      },
      ammunition: { 
        acc: 20,
        maxAcc: 40
      },
      resources: {
        acc: 60,
        maxAcc: 100
      },
      units: {
        act: 2,
        maxUnits: 3
      }
    }, 
  }),
})