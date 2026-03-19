export interface Player {
  actions: {
    market: {
      activeBuyAction: boolean
      activeSellAction: boolean
    }
  }
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
  vikingLevel: number
}

export interface IslandCity {
  x: number,
  y: number
  owner?: string
  name?: string
  type: ResourcesType
}

export interface City {
  navy: [],
  soldiers: {
    units: number,
    type: UnitsType
  }[],
  type: ResourcesType
  locksmith: {
    level: number
    workers: number
  },
  bonus: {
    level: number
    workers: number
  },
  shipyard: {
    level: number
  },
  palace: {
    level: number
  },
  wall: {
    level: number
  },
  military: {
    level: number
  },
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
    level: number,
    buyResources: Resources,
    sellResources: Resources
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

export interface Event {
  type: 'points'
  message: string
}

export type ResourcesType = 'wood' | 'sulfur' | 'crystal' | 'wine' | 'stone'
export type UnitsType = 'spearman' | 'archer' | 'hoplita' | 'catapult' | 'mech'