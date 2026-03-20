import { defineStore } from "pinia"

export const useControllerStore = defineStore('controller', {
  state: () => ({ 
    list: [
      {
        id: 'the_beginning',
        message: 'The score at the beginning was researched!',
        description: 'The beginning: Evolve the first storage one to two level. 14',
        type: 'points_economy',
        start: false,
        value: 14,
        finish: false
      },
      {
        id: 'distance',
        message: 'The score at distance was researched!',
        description: 'Distance: Releases the first character at a distance. 45',
        type: 'points_battlefield',
        start: false,
        value: 45,
        finish: false
      },
      {
        id: 'out_to_sea',
        message: 'The score at out to sea was researched!',
        description: 'Out to sea: You can build the first warship. 28',
        type: 'points_travel',
        start: false,
        value: 28,
        finish: false
      }
    ]
  }),
})