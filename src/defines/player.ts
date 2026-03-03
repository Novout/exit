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
    cityhall: {
      name: '',
      level: 1,
      happy: 200,
      population: {
        acc: 28,
        maxAcc: 60,
        time: 2000
      },
      sulfur: {
        acc: 0,
        maxAcc: 0
      },
      stone: { 
        acc: 0,
        maxAcc: 0
      },
      wine: {
        acc: 0,
        maxAcc: 0
      },
      wood: {
        acc: 0,
        maxAcc: 0
      },
      crystal: {
        acc: 0,
        maxAcc: 0
      }
  }}
}