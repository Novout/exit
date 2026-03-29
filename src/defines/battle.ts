import type { UnitBattleDefine } from "../types"

export const getBattleValues = () => {
  const wall = (): UnitBattleDefine => {
    return {
      id: 'wall',
      attack: 0,
      hp: 120,
      maxUnits: 3
    }
  }

  const spearman = (): UnitBattleDefine => {
    return {
      id: 'spearman',
      hp: 42,
      attack: 34,
      units: 0,
      maxUnits: 30
    }
  }

  const archer = (): UnitBattleDefine => {
    return {
      id: 'archer',
      range: true,
      hp: 28,
      attack: 22,
      units: 0,
      maxUnits: 30
    }
  }

  const catapult = (): UnitBattleDefine => {
    return {
      id: 'catapult',
      wall: true,
      range: true,
      hp: 230,
      attack: 75,
      units: 0,
      maxUnits: 30
    }
  }

  const hoplita = (): UnitBattleDefine => {
    return {
      id: 'hoplita',
      priority: true,
      hp: 118,
      attack: 81,
      units: 0,
      maxUnits: 30
    }
  }

  const mech = (): UnitBattleDefine => {
    return {
      id: 'mech',
      priority: true,
      hp: 756,
      attack: 358,
      units: 0,
      maxUnits: 10
    }
  }

  return { wall, spearman, archer, catapult, hoplita, mech }
}