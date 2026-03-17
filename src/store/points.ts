import { defineStore } from "pinia"

export const usePointsStore = defineStore('points', {
  state: () => ({ 
    economy: {
      'the_beginning_start': false,
      'the_beginning_value': 18,
      'the_beginning_finish': false
    },
    battlefield: {
      'distance_start': false,
      'distance_value': 24,
      'distance_finish': false
    },
    travel: {
      'out_to_sea_start': false,
      'out_to_sea_value': 18,
      'out_to_sea_finish': false
    },
  }),
})