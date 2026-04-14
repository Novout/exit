import { getBattleValues } from "../defines/battle"
import type { UnitBattleAcc, UnitBattleContext, UnitBattleSet, UnitBattleType } from "../types"

export const useBattle = () => {
  const defines = getBattleValues()

  const splitUnitsByStack = (count: number, stack: number): number[] => {
    const arr: number[] = []
    let counter = 0

    while (count > 0) {
      if (counter >= stack) {
        arr.push(counter)

        counter = 0
      }

      count--
      counter++
    }

    if (counter > 0) arr.push(counter)

    return arr
  }

  const getUnitsCounter = (
    acc: UnitBattleAcc,
    type: 'attacker' | 'defender',
    viking?: boolean
  ): UnitBattleContext => {
    const units =
      type === 'attacker'
        ? [
            ['mech', 'extra', acc.mech, 7],
            ['catapult', 'destruction_line', acc.catapult, 10],
            ['archer', 'back_line', acc.archer, 30],
            ['hoplita', 'front_line', acc.hoplita, 30],
            ['spearman', 'front_line', acc.spearman, 30],
          ]
          : viking ? [
            ['viking', 'front_line', acc.viking, 30],
            ['archer', 'back_line', acc.archer, 30]
          ] : [
            ['wall', 'wall', acc.wall],
            ['spearman', 'front_line', acc.spearman, 30],
            ['hoplita', 'front_line', acc.hoplita, 30],
            ['archer', 'back_line', acc.archer, 30],
            ['catapult', 'destruction_line', acc.catapult, 10],
            ['mech', 'extra', acc.mech, 7],
          ]

    return units as UnitBattleContext
  }

  const getLineSequence = (
    context: UnitBattleContext
  ): UnitBattleType | false => {
    const asFrontLine = asType(context, 'front_line')

    if (!asFrontLine) {
      const asBackLine = asType(context, 'back_line')

      if (!asBackLine) {
        const asDestructionLine = asType(context, 'destruction_line')

        if (!asDestructionLine) {
          const asExtraLine = asType(context, 'destruction_line')

          if (!asExtraLine) {
            return false
          } else {
            return 'extra'
          }
        } else {
          return 'destruction_line'
        }
      } else {
        return 'back_line'
      }
    }

    return 'front_line'
  }

  const asType = (
    context: UnitBattleContext,
    type: UnitBattleType
  ) => {
    return context.find(([_, target]) => {
      if (target === type) return true

      return false
    })
  }

  const getTotalDamage = (context: UnitBattleContext, isDefender?: boolean, defenderWall?: boolean) => {
    const defines = getBattleValues()
    const isWall = asType(context, 'wall')

    return context.reduce((acc, value) => {
      let _acc = 0

      const isOnlyArcherActive = isWall && isDefender

      if(value[1] === 'disabled') return acc

      if(value[0] === 'spearman' && !isOnlyArcherActive) {
        if(value[2] < 90) {
          _acc = defines.spearman().attack * value[2]
        } else {
          _acc = defines.spearman().attack * 90
        }
      }

      if(value[0] === 'hoplita' && !isOnlyArcherActive) {
        if(value[2] < 90) {
          _acc = defines.hoplita().attack * value[2]
        } else {
          _acc = defines.hoplita().attack * 90
        }
      }
      
      if(value[0] === 'archer') {
        if(value[2] < 90) {
          _acc = defines.archer().attack * value[2]
        } else {
          _acc = defines.archer().attack * 90
        }
      }

      if(value[0] === 'catapult' && !isOnlyArcherActive) {
        if(value[2] < 10) {
          _acc = defines.catapult().attack * value[2]
        } else {
          _acc = defines.catapult().attack * 10
        }
      }

      if(value[0] === 'catapult' && !isDefender && defenderWall) {
        if(value[2] < 10) {
          _acc = defines.catapult().attack * value[2] * 3
        } else {
          _acc = defines.catapult().attack * 10 * 3
        }
      }

      if(value[0] === 'mech' && !isOnlyArcherActive) {
        if(value[2] < 7) {
          _acc = defines.catapult().attack * value[2]
        } else {
          _acc = defines.catapult().attack * 7
        }
      }

      return acc + _acc
    }, 0)
  }

  const acceptDamage = (item: UnitBattleSet) => {
    let isFrontlineDefender = false

    let acc_units = 0
    let acc_hp = 0
    let acc_raw_hp = 0

    if(item[0] === 'mech') {
      if(item[2] < 21) {
        isFrontlineDefender = true
        acc_units = item[2]
        acc_hp = defines.mech().hp * item[2]
        acc_raw_hp = defines.mech().hp
      } else {
        acc_hp = defines.mech().hp * 21
        acc_units = 21
        acc_raw_hp = defines.mech().hp
      }
  }
  
  if(item[0] === 'hoplita') {
    if(item[2] < 90 && !isFrontlineDefender) {
      isFrontlineDefender = true
      acc_units = item[2]
      acc_hp = defines.hoplita().hp * item[2]
      acc_raw_hp = defines.hoplita().hp
    } else {
      acc_hp = defines.hoplita().hp * 90
      acc_units = 90
      acc_raw_hp = defines.hoplita().hp
    }
  }

  if(item[0] === 'spearman') {
    if(item[2] < 90 && !isFrontlineDefender) {
      acc_units = item[2]
      acc_hp = defines.spearman().hp * item[2]
      acc_raw_hp = defines.spearman().hp
    } else {
      acc_hp = defines.spearman().hp * 90
      acc_units = 90
      acc_raw_hp = defines.spearman().hp
    }
  }

  if(item[0] === 'archer') {
    if(item[2] < 90) {
      acc_units = item[2]
      acc_hp = defines.archer().hp * item[2]
      acc_raw_hp = defines.archer().hp
    } else {
      acc_hp = defines.archer().hp * 90
      acc_units = 90
      acc_raw_hp = defines.archer().hp
    }
  }

  if(item[0] === 'catapult') {
    if(item[2] < 30) {
      acc_units = item[2]
      acc_hp = defines.catapult().hp * item[2]
      acc_raw_hp = defines.catapult().hp
    } else {
      acc_hp = defines.catapult().hp * 30
      acc_units = 30
      acc_raw_hp = defines.catapult().hp
    }
  }

  if(item[0] === 'viking') {
    if(item[2] < 30) {
      acc_units = item[2]
      acc_hp = defines.viking().hp * item[2]
      acc_raw_hp = defines.viking().hp
    } else {
      acc_hp = defines.viking().hp * 30
      acc_units = 30
      acc_raw_hp = defines.viking().hp
    }
  }

  return { acc_units, acc_hp, acc_raw_hp }
  }

  return { getUnitsCounter, splitUnitsByStack, getLineSequence, asType, getTotalDamage, acceptDamage }
}