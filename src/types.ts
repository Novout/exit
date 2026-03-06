export interface Player {
  island: Island
  map: {
    type: string
  }
  gold: {
    acc: number,
    set: number
  },
  science: {
    points: number
  },
  cities: City[]
}

export interface Island {
  x: number,
  y: number,
  type: ResourcesType
}

export interface IslandCity {
  x: number,
  y: number
  owner?: string
  name?: string
}

export interface City {
  navy: [],
  soldiers: [],
  storage: {
    level: number
  },
  tavern: {
    level: number
    workers: number
  },
  science: {
    level: number
    workers: number
  },
  market: {
    level: number
  }
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

export type ResourcesType = 'wood' | 'sulfur' | 'crystal' | 'wine' | 'stone'