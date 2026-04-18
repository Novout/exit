import type { Resources } from "../types";

export const vikingDifficult = (level: number) => {
  return (
    {
      1: {
        soldiers: 4,
        long: 0,
        wall: 0,
        mech: 0,
        viking: 0,
        catapult: 0,
        archer: 0,
        hoplita: 0,
        spearman: 0,
      },
      2: {
        soldiers: 7,
        long: 0,
        wall: 0,
        mech: 0,
        viking: 0,
        catapult: 0,
        archer: 0,
        hoplita: 0,
        spearman: 0,
      },
      3: {
        soldiers: 12,
        long: 0,
        wall: 0,
        mech: 0,
        viking: 0,
        catapult: 0,
        archer: 0,
        hoplita: 0,
        spearman: 0,
      },
      4: {
        soldiers: 20,
        long: 0,
        wall: 0,
        mech: 0,
        viking: 0,
        catapult: 0,
        archer: 0,
        hoplita: 0,
        spearman: 0,
      },
      5: {
        soldiers: 26,
        long: 5,
        wall: 0,
        mech: 0,
        viking: 0,
        catapult: 0,
        archer: 0,
        hoplita: 0,
        spearman: 0,
      },
      6: {
        soldiers: 34,
        long: 12,
        wall: 0,
        mech: 0,
        viking: 0,
        catapult: 0,
        archer: 0,
        hoplita: 0,
        spearman: 0,
      },
      7: {
        soldiers: 40,
        long: 15,
        wall: 0,
        mech: 0,
        viking: 0,
        catapult: 0,
        archer: 0,
        hoplita: 0,
        spearman: 0,
      },
    }[level] || {
      soldiers: 9999,
      long: 9999,
      wall: 0,
      mech: 0,
      viking: 0,
      catapult: 0,
      archer: 0,
      hoplita: 0,
      spearman: 0,
    }
  );
};

export const VikingGain = (level: number): Resources | undefined => {
  return {
    1: {
      stone: 60,
      wine: 60,
      sulfur: 60,
      wood: 120,
      crystal: 60,
    },
    2: {
      stone: 210,
      wine: 210,
      sulfur: 210,
      wood: 450,
      crystal: 210,
    },
    4: {
      stone: 210,
      wine: 210,
      sulfur: 210,
      wood: 450,
      crystal: 210,
    },
    5: {
      stone: 210,
      wine: 210,
      sulfur: 210,
      wood: 450,
      crystal: 210,
    },
    6: {
      stone: 210,
      wine: 210,
      sulfur: 210,
      wood: 450,
      crystal: 210,
    },
    7: {
      stone: 210,
      wine: 210,
      sulfur: 210,
      wood: 450,
      crystal: 210,
    },
  }[level];
};

export const botDifficult = (level: number) => {
  return (
    {
      1: {
        wall: 3,
        mech: 0,
        viking: 0,
        catapult: 0,
        archer: 10,
        hoplita: 0,
        spearman: 10,
        soldiers: 0,
        long: 0,
      },
      2: {
        wall: 3,
        mech: 0,
        viking: 0,
        catapult: 0,
        archer: 30,
        hoplita: 0,
        spearman: 50,
        soldiers: 0,
        long: 0,
      },
      3: {
        wall: 3,
        mech: 0,
        viking: 0,
        catapult: 0,
        archer: 60,
        hoplita: 30,
        spearman: 10,
        soldiers: 0,
        long: 0,
      },
    }[level] || {
      wall: 0,
      mech: 0,
      viking: 0,
      catapult: 10,
      archer: 120,
      hoplita: 60,
      spearman: 10,
      soldiers: 0,
      long: 0,
    }
  );
};

export const botGain = (level: number): Resources | undefined => {
  return {
    1: {
      stone: 60,
      wine: 60,
      sulfur: 60,
      wood: 120,
      crystal: 60,
    },
    2: {
      stone: 210,
      wine: 210,
      sulfur: 210,
      wood: 450,
      crystal: 210,
    },
    4: {
      stone: 210,
      wine: 210,
      sulfur: 210,
      wood: 450,
      crystal: 210,
    },
    5: {
      stone: 210,
      wine: 210,
      sulfur: 210,
      wood: 450,
      crystal: 210,
    },
    6: {
      stone: 210,
      wine: 210,
      sulfur: 210,
      wood: 450,
      crystal: 210,
    },
    7: {
      stone: 210,
      wine: 210,
      sulfur: 210,
      wood: 450,
      crystal: 210,
    },
  }[level];
};
