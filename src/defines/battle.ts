import type { UnitBattleDefine } from "../types";

export const getBattleValues = () => {
  const wall = (): UnitBattleDefine => {
    return {
      id: "wall",
      attack: 0,
      hp: 120,
      maxUnits: 3,
    };
  };

  const spearman = (): UnitBattleDefine => {
    return {
      id: "spearman",
      hp: 42,
      attack: 19,
      units: 0,
      maxUnits: 30,
    };
  };

  const archer = (): UnitBattleDefine => {
    return {
      id: "archer",
      range: true,
      hp: 28,
      attack: 22,
      units: 0,
      maxUnits: 30,
    };
  };

  const catapult = (): UnitBattleDefine => {
    return {
      id: "catapult",
      wall: true,
      range: true,
      hp: 230,
      attack: 75,
      units: 0,
      maxUnits: 30,
    };
  };

  const hoplita = (): UnitBattleDefine => {
    return {
      id: "hoplita",
      priority: true,
      hp: 118,
      attack: 81,
      units: 0,
      maxUnits: 30,
    };
  };

  const mech = (): UnitBattleDefine => {
    return {
      id: "mech",
      priority: true,
      hp: 756,
      attack: 358,
      units: 0,
      maxUnits: 10,
    };
  };

  const viking = (): UnitBattleDefine => {
    return {
      id: "viking",
      hp: 60,
      attack: 28,
      units: 0,
      maxUnits: 30,
    };
  };

  const galley = (): UnitBattleDefine => {
    return {
      id: "galley",
      hp: 90,
      attack: 35,
      units: 0,
      maxUnits: 10,
    };
  };

  const trireme = (): UnitBattleDefine => {
    return {
      id: "trireme",
      priority: true,
      hp: 220,
      attack: 95,
      units: 0,
      maxUnits: 10,
    };
  };

  const warship = (): UnitBattleDefine => {
    return {
      id: "warship",
      range: true,
      hp: 480,
      attack: 180,
      units: 0,
      maxUnits: 5,
    };
  };

  return { wall, spearman, archer, catapult, hoplita, mech, viking, galley, trireme, warship };
};
