import type { City } from "../types"

export const getNewPlayerData = () => {
  return {
    gold: {
      acc: 100,
      set: 0
    },
    science: {
      points: 0
    }
  }
}

export const getNewCity = (): City => {
  return { 
    navy: [],
    soldiers: [],
    type: 'stone',
    storage: {
      level: 1
    },
    tavern: {
      level: 1,
      workers: 0
    },
    science: {
      level: 1,
      workers: 0
    },
    market: {
      level: 1,
      buyResources: {
        sulfur: 200,
        stone: 200,
        wine: 200,
        wood: 200,
        crystal: 200
      },
      sellResources: {
        sulfur: 200,
        stone: 200,
        wine: 200,
        wood: 200,
        crystal: 200
      }
    },
    military: {
      level: 1,
    },
    shipyard: {
      level: 1,
    },
    palace: {
      level: 1,
    },
    wall: {
      level: 1,
    },
    bonus: {
      level: 1,
      workers: 0
    },
    locksmith: {
      level: 1,
      workers: 0
    },
    cityhall: {
      name: '',
      level: 1,
      happy: 200,
      population: {
        acc: 30,
        maxAcc: 60,
        time: 7000
      },
      sulfur: {
        acc: 125,
        maxAcc: 200
      },
      stone: { 
        acc: 125,
        maxAcc: 200
      },
      wine: {
        acc: 125,
        maxAcc: 200
      },
      wood: {
        acc: 400,
        maxAcc: 500
      },
      crystal: {
        acc: 125,
        maxAcc: 200
      }
  }}
}