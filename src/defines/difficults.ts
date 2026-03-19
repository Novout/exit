import type { Resources } from "../types"

export const vikingDifficult = (level: number) => {
  return {
    1: {
      soldiers: 4,
      long: 0
    },
    2: {
      soldiers: 7,
      long: 0
    },
    3: {
      soldiers: 12,
      long: 0
    },
    4: {
      soldiers: 20,
      long: 0
    },
    5: {
      soldiers: 26,
      long: 5
    },
    6: {
      soldiers: 34,
      long: 12
    },
    7: {
      soldiers: 40,
      long: 15
    },
  }[level] || {
    soldiers: 9999,
    long: 9999
  }
}

export const VikingGain = (level: number): Resources | undefined => {
  return {
    1: {
      stone: 60,
      wine: 60,
      sulfur: 100,
      wood: 60,
      crystal: 60
    },
    2: {
      stone: 210,
      wine: 210,
      sulfur: 210,
      wood: 450,
      crystal: 210
    },
    4: {
      stone: 210,
      wine: 210,
      sulfur: 210,
      wood: 450,
      crystal: 210
    },
    5: {
      stone: 210,
      wine: 210,
      sulfur: 210,
      wood: 450,
      crystal: 210
    },
    6: {
      stone: 210,
      wine: 210,
      sulfur: 210,
      wood: 450,
      crystal: 210
    },
    7: {
      stone: 210,
      wine: 210,
      sulfur: 210,
      wood: 450,
      crystal: 210
    },
  }[level]
}