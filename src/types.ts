export interface Player {
  map: {
    type: string
  }
  gold: number,
  science: {
    points: number
  },
  cities: City[]
}

export interface City {
  navy: [],
  soldiers: [],
  cityhall: {
    name: string,
    level: number,
    happy: number,
    population: {
      acc: number,
      time: number,
      maxAcc: number
    },
    sulfur: {
      acc: number,
      maxAcc: number
    },
    stone: { 
      acc: number,
      maxAcc: number
    },
    wine: {
      acc: number,
      maxAcc: number
    },
    wood: {
      acc: number,
      maxAcc: number
    }
    crystal: {
      acc: number,
      maxAcc: number
    }
  }
}

export interface Resources {
  sulfur: number,
  stone: number,
  wine: number,
  wood: number,
  crystal: number
}