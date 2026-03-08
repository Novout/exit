import { defineStore } from "pinia"

export const usePointsStore = defineStore('points', {
  state: () => ({ 
    economy: {
      'the_beginning': false
    },
    battlefield: {
      'distance': false
    },
    travel: {
      'out_to_sea': false
    },
  }),
})