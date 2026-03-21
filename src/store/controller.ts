import { defineStore } from "pinia"
import type { ConstructionTime, PointTime } from "../types"

export const useControllerStore = defineStore('controller', {
  state: () => ({ 
    constructions: [
      {
        id: 'cityhall',
        message: 'Upgrade cityhall',
        level: {
          2: 38,
          3: 62,
          4: 97,
          5: 170,
        },
        start: false,
        finish: false,
        activeLevel: 2
      },
      {
        id: 'market',
        message: 'Upgrade market',
        level: {
          2: 22,
          3: 38,
          4: 58,
          5: 99,
        },
        start: false,
        finish: false,
        activeLevel: 2
      },
      {
        id: 'military',
        message: 'Upgrade military',
        level: {
          2: 38,
          3: 62,
          4: 97,
          5: 170,
        },
        start: false,
        finish: false,
        activeLevel: 2
      },
      {
        id: 'navy',
        message: 'Upgrade navy',
        level: {
          2: 38,
          3: 62,
          4: 97,
          5: 170,
        },
        start: false,
        finish: false,
        activeLevel: 2
      },
      {
        id: 'palace',
        message: 'Upgrade palace',
        level: {
          2: 38,
          3: 62,
          4: 97,
          5: 170,
        },
        start: false,
        finish: false,
        activeLevel: 2
      },
      {
        id: 'science',
        message: 'Upgrade science',
        level: {
          2: 38,
          3: 62,
          4: 97,
          5: 170,
        },
        start: false,
        finish: false,
        activeLevel: 2
      },
      {
        id: 'storage',
        message: 'Upgrade storage',
        level: {
          2: 38,
          3: 62,
          4: 97,
          5: 170,
        },
        start: false,
        finish: false,
        activeLevel: 2
      },
      {
        id: 'tavern',
        message: 'Upgrade tavern',
        level: {
          2: 38,
          3: 62,
          4: 97,
          5: 170,
        },
        start: false,
        finish: false,
        activeLevel: 2
      },
      {
        id: 'wall',
        message: 'Upgrade wall',
        level: {
          2: 38,
          3: 62,
          4: 97,
          5: 170,
        },
        start: false,
        finish: false,
        activeLevel: 2
      }
    ] as ConstructionTime[],
    points: [
      {
        id: 'the_beginning',
        message: 'The score at the beginning was researched!',
        description: 'The beginning: Evolve the first storage one to two level. 14',
        type: 'points_economy',
        start: false,
        value: 28,
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
    ] as PointTime[]
  }),
})