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
  type: 'points' | 'constructions' | 'army'
  message: string
}

export interface PointTime {
  id: string,
  message: string,
  description: string,
  type: string,
  start: boolean,
  value: number,
  finish: boolean
}

export interface ConstructionTime {
  id: string,
  message: string,
  level: any,
  start: boolean,
  finish: boolean
  activeLevel: number
}

export interface UnitBattleDefine {
  id: UnitsType,
  priority?: boolean,
  wall?: boolean,
  range?: boolean,
  hp: number,
  attack: number,
  units?: number,
  maxUnits?: number
}

export interface UnitBattleAcc {
  wall: number,
  mech: number,
  viking?: number,
  catapult: number,
  archer: number,
  hoplita: number,
  spearman: number,
}

export type UnitsType = 'wall' | 'spearman' | 'archer' | 'hoplita' | 'catapult' | 'mech'
export type UnitBattleType = 'extra' | 'destruction_line' | 'back_line' | 'front_line' | 'wall'
export type UnitBattleContext = [UnitsType, UnitBattleType, number, number][]

export interface Battle {
  attacker?: UnitBattleContext
  defender?: UnitBattleContext
  city?: City
}

export type ResourcesType = 'wood' | 'sulfur' | 'crystal' | 'wine' | 'stone'