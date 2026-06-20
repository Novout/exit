import { getBattleValues } from "../defines/battle";
import type {
  NavalUnitBattleAcc,
  UnitBattleAcc,
  UnitBattleContext,
  UnitBattleSet,
  UnitBattleType,
} from "../types";

export const useBattle = () => {
  const defines = getBattleValues();

  const splitUnitsByStack = (count: number, stack: number): number[] => {
    const arr: number[] = [];
    let counter = 0;

    while (count > 0) {
      if (counter >= stack) {
        arr.push(counter);

        counter = 0;
      }

      count--;
      counter++;
    }

    if (counter > 0) arr.push(counter);

    return arr;
  };

  const getUnitsCounter = (
    acc: UnitBattleAcc,
    type: "attacker" | "defender",
    viking?: boolean,
  ): UnitBattleContext => {
    const units =
      type === "attacker"
        ? [
            ["mech", "extra", acc.mech, 7],
            ["hoplita", "front_line", acc.hoplita, 30],
            ["spearman", "front_line", acc.spearman, 30],
            ["archer", "back_line", acc.archer, 30],
            ["catapult", "destruction_line", acc.catapult, 10],
          ]
        : viking
          ? [
              ["viking", "front_line", acc.viking, 30],
              ["archer", "back_line", acc.archer, 30],
            ]
          : [
              ["wall", "wall", acc.wall, 3],
              ["mech", "extra", acc.mech, 7],
              ["hoplita", "front_line", acc.hoplita, 30],
              ["spearman", "front_line", acc.spearman, 30],
              ["archer", "back_line", acc.archer, 30],
              ["catapult", "destruction_line", acc.catapult, 10],
            ];

    return units as UnitBattleContext;
  };

  const getNavalUnitsCounter = (acc: NavalUnitBattleAcc): UnitBattleContext => {
    return [
      ["warship", "destruction_line", acc.warship, 5],
      ["trireme", "front_line", acc.trireme, 10],
      ["galley", "front_line", acc.galley, 10],
    ] as UnitBattleContext;
  };

  const getLineSequence = (
    context: UnitBattleContext,
  ): UnitBattleType | false => {
    const asFrontLine = asType(context, "front_line");

    if (!asFrontLine) {
      const asBackLine = asType(context, "back_line");

      if (!asBackLine) {
        const asDestructionLine = asType(context, "destruction_line");

        if (!asDestructionLine) {
          const asExtraLine = asType(context, "destruction_line");

          if (!asExtraLine) {
            return false;
          } else {
            return "extra";
          }
        } else {
          return "destruction_line";
        }
      } else {
        return "back_line";
      }
    }

    return "front_line";
  };

  const asType = (context: UnitBattleContext, type: UnitBattleType) => {
    return context.find(([_, target]) => {
      if (target === type) return true;

      return false;
    });
  };

  const getTotalDamage = (
    context: UnitBattleContext,
    isDefender?: boolean,
    defenderWall?: boolean,
  ) => {
    const defines = getBattleValues();
    const isWall = asType(context, "wall");

    return context.reduce((acc, value) => {
      let _acc = 0;

      const isOnlyArcherActive = isWall && isDefender;

      if (value[1] === "disabled") return acc;

      if (value[0] === "spearman" && !isOnlyArcherActive) {
        if (value[2] < 90) {
          _acc = defines.spearman().attack * value[2];
        } else {
          _acc = defines.spearman().attack * 90;
        }
      }

      if (value[0] === "hoplita" && !isOnlyArcherActive) {
        if (value[2] < 90) {
          _acc = defines.hoplita().attack * value[2];
        } else {
          _acc = defines.hoplita().attack * 90;
        }
      }

      if (value[0] === "archer") {
        if (value[2] < 90) {
          _acc = defines.archer().attack * value[2];
        } else {
          _acc = defines.archer().attack * 90;
        }
      }

      if (value[0] === "catapult" && !isOnlyArcherActive) {
        const wallMultiplier = defenderWall ? 3 : 1;
        if (value[2] < 10) {
          _acc = defines.catapult().attack * value[2] * wallMultiplier;
        } else {
          _acc = defines.catapult().attack * 10 * wallMultiplier;
        }
      }

      if (value[0] === "mech" && !isOnlyArcherActive) {
        if (value[2] < 7) {
          _acc = defines.catapult().attack * value[2];
        } else {
          _acc = defines.catapult().attack * 7;
        }
      }

      if (value[0] === "viking") {
        if (value[2] < 30) {
          _acc = defines.viking().attack * value[2];
        } else {
          _acc = defines.viking().attack * 30;
        }
      }

      if (value[0] === "galley") {
        _acc = defines.galley().attack * Math.min(value[2], 10);
      }

      if (value[0] === "trireme") {
        _acc = defines.trireme().attack * Math.min(value[2], 10);
      }

      if (value[0] === "warship") {
        _acc = defines.warship().attack * Math.min(value[2], 5);
      }

      return acc + _acc;
    }, 0);
  };

  const acceptDamage = (item: UnitBattleSet) => {
    let isFrontlineDefender = false;

    let acc_units = 0;
    let acc_hp = 0;
    let acc_raw_hp = 0;

    if (item[0] === "mech") {
      if (item[2] < 21) {
        isFrontlineDefender = true;
        acc_units = item[2];
        acc_hp = defines.mech().hp * item[2];
        acc_raw_hp = defines.mech().hp;
      } else {
        acc_hp = defines.mech().hp * 21;
        acc_units = 21;
        acc_raw_hp = defines.mech().hp;
      }
    }

    if (item[0] === "hoplita") {
      if (item[2] < 90 && !isFrontlineDefender) {
        isFrontlineDefender = true;
        acc_units = item[2];
        acc_hp = defines.hoplita().hp * item[2];
        acc_raw_hp = defines.hoplita().hp;
      } else {
        acc_hp = defines.hoplita().hp * 90;
        acc_units = 90;
        acc_raw_hp = defines.hoplita().hp;
      }
    }

    if (item[0] === "spearman") {
      if (item[2] < 90 && !isFrontlineDefender) {
        acc_units = item[2];
        acc_hp = defines.spearman().hp * item[2];
        acc_raw_hp = defines.spearman().hp;
      } else {
        acc_hp = defines.spearman().hp * 90;
        acc_units = 90;
        acc_raw_hp = defines.spearman().hp;
      }
    }

    if (item[0] === "archer") {
      if (item[2] < 90) {
        acc_units = item[2];
        acc_hp = defines.archer().hp * item[2];
        acc_raw_hp = defines.archer().hp;
      } else {
        acc_hp = defines.archer().hp * 90;
        acc_units = 90;
        acc_raw_hp = defines.archer().hp;
      }
    }

    if (item[0] === "catapult") {
      if (item[2] < 30) {
        acc_units = item[2];
        acc_hp = defines.catapult().hp * item[2];
        acc_raw_hp = defines.catapult().hp;
      } else {
        acc_hp = defines.catapult().hp * 30;
        acc_units = 30;
        acc_raw_hp = defines.catapult().hp;
      }
    }

    if (item[0] === "viking") {
      if (item[2] < 30) {
        acc_units = item[2];
        acc_hp = defines.viking().hp * item[2];
        acc_raw_hp = defines.viking().hp;
      } else {
        acc_hp = defines.viking().hp * 30;
        acc_units = 30;
        acc_raw_hp = defines.viking().hp;
      }
    }

    if (item[0] === "galley") {
      acc_units = Math.min(item[2], 10);
      acc_hp = defines.galley().hp * acc_units;
      acc_raw_hp = defines.galley().hp;
    }

    if (item[0] === "trireme") {
      acc_units = Math.min(item[2], 10);
      acc_hp = defines.trireme().hp * acc_units;
      acc_raw_hp = defines.trireme().hp;
    }

    if (item[0] === "warship") {
      acc_units = Math.min(item[2], 5);
      acc_hp = defines.warship().hp * acc_units;
      acc_raw_hp = defines.warship().hp;
    }

    return { acc_units, acc_hp, acc_raw_hp };
  };

  return {
    getUnitsCounter,
    getNavalUnitsCounter,
    splitUnitsByStack,
    getLineSequence,
    asType,
    getTotalDamage,
    acceptDamage,
  };
};
