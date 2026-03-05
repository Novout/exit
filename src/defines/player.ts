import type { City } from "../types"

export const getNewPlayerData = () => {
  return {
    gold: 100,
    science: {
      points: 0
    }
  }
}

export const getNewCity = (): City => {
  return { 
    navy: [],
    soldiers: [],
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
    cityhall: {
      name: '',
      level: 1,
      happy: 200,
      population: {
        acc: 2,
        maxAcc: 60,
        time: 2000
      },
      
      sulfur: {
        acc: 0,
        maxAcc: 200
      },
      stone: { 
        acc: 0,
        maxAcc: 200
      },
      wine: {
        acc: 0,
        maxAcc: 200
      },
      wood: {
        acc: 200,
        maxAcc: 500
      },
      crystal: {
        acc: 0,
        maxAcc: 200
      }
  }}
}