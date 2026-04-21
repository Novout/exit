import type { Resources } from "../types";

export const CityhallUpgrade = (level: number): Resources | undefined => {
  return {
    2: {
      stone: 50,
      wine: 0,
      sulfur: 0,
      wood: 180,
      crystal: 0,
    },
    3: {
      stone: 100,
      wine: 0,
      sulfur: 0,
      wood: 350,
      crystal: 0,
    },
    4: {
      stone: 150,
      wine: 0,
      sulfur: 0,
      wood: 480,
      crystal: 0,
    },
    5: {
      stone: 210,
      wine: 0,
      sulfur: 0,
      wood: 600,
      crystal: 0,
    },
  }[level];
};

export const ShipyardUpgrade = (level: number): Resources | undefined => {
  return {
    2: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 250,
      crystal: 0,
    },
    3: {
      stone: 90,
      wine: 0,
      sulfur: 0,
      wood: 350,
      crystal: 0,
    },
    4: {
      stone: 120,
      wine: 0,
      sulfur: 0,
      wood: 460,
      crystal: 0,
    },
    5: {
      stone: 160,
      wine: 0,
      sulfur: 0,
      wood: 560,
      crystal: 0,
    },
  }[level];
};

export const NavyUpgrade = (level: number): Resources | undefined => {
  return {
    2: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 150,
      crystal: 0,
    },
    3: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 230,
      crystal: 0,
    },
    4: {
      stone: 25,
      wine: 0,
      sulfur: 0,
      wood: 350,
      crystal: 0,
    },
    5: {
      stone: 40,
      wine: 0,
      sulfur: 0,
      wood: 520,
      crystal: 0,
    },
  }[level];
};

export const MilitaryUpgrade = (level: number): Resources | undefined => {
  return {
    2: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 150,
      crystal: 0,
    },
    3: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 230,
      crystal: 0,
    },
    4: {
      stone: 25,
      wine: 0,
      sulfur: 0,
      wood: 350,
      crystal: 0,
    },
    5: {
      stone: 40,
      wine: 0,
      sulfur: 0,
      wood: 520,
      crystal: 0,
    },
  }[level];
};

export const StorageCost = (level: number): Resources | undefined => {
  return {
    1: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 200,
      crystal: 0,
    },
    2: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 340,
      crystal: 0,
    },
    3: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 500,
      crystal: 0,
    },
    4: {
      stone: 50,
      wine: 0,
      sulfur: 0,
      wood: 620,
      crystal: 0,
    },
    5: {
      stone: 70,
      wine: 0,
      sulfur: 0,
      wood: 780,
      crystal: 0,
    },
  }[level];
};

export const StorageUpgrade = (level: number): Resources | undefined => {
  return {
    1: {
      stone: 200,
      wine: 200,
      sulfur: 200,
      wood: 500,
      crystal: 200,
    },
    2: {
      stone: 400,
      wine: 400,
      sulfur: 400,
      wood: 1600,
      crystal: 400,
    },
    3: {
      stone: 1000,
      wine: 1000,
      sulfur: 1000,
      wood: 4000,
      crystal: 1000,
    },
    4: {
      stone: 1600,
      wine: 1600,
      sulfur: 1600,
      wood: 5600,
      crystal: 1600,
    },
    5: {
      stone: 2200,
      wine: 2200,
      sulfur: 2200,
      wood: 8000,
      crystal: 2200,
    },
  }[level];
};

export const TavernUpgrade = (level: number): Resources | undefined => {
  return {
    2: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 210,
      crystal: 0,
    },
    3: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 360,
      crystal: 0,
    },
    4: {
      stone: 20,
      wine: 0,
      sulfur: 0,
      wood: 450,
      crystal: 0,
    },
    5: {
      stone: 80,
      wine: 0,
      sulfur: 0,
      wood: 760,
      crystal: 0,
    },
  }[level];
};

export const ScienceUpgrade = (level: number): Resources | undefined => {
  return {
    2: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 220,
      crystal: 50,
    },
    3: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 400,
      crystal: 110,
    },
    4: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 560,
      crystal: 210,
    },
    5: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 700,
      crystal: 340,
    },
  }[level];
};

export const MarketUpgrade = (level: number): Resources | undefined => {
  return {
    2: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 210,
      crystal: 0,
    },
    3: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 350,
      crystal: 0,
    },
    4: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 670,
      crystal: 0,
    },
    5: {
      stone: 90,
      wine: 0,
      sulfur: 0,
      wood: 800,
      crystal: 0,
    },
  }[level];
};

export const LocksmithUpgrade = (level: number): Resources | undefined => {
  return {
    2: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 230,
      crystal: 0,
    },
    3: {
      stone: 30,
      wine: 0,
      sulfur: 0,
      wood: 420,
      crystal: 0,
    },
    4: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 610,
      crystal: 0,
    },
    5: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 1020,
      crystal: 0,
    },
  }[level];
};

export const BonusUpgrade = (level: number): Resources | undefined => {
  return {
    2: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 230,
      crystal: 0,
    },
    3: {
      stone: 30,
      wine: 0,
      sulfur: 0,
      wood: 420,
      crystal: 0,
    },
    4: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 610,
      crystal: 0,
    },
    5: {
      stone: 0,
      wine: 0,
      sulfur: 0,
      wood: 1020,
      crystal: 0,
    },
  }[level];
};

export const MarketSet = (): any[] => {
  return [
    {
      stone: 500,
      wine: 200,
      sulfur: 300,
      wood: 150,
      crystal: 500,
    },
    {
      stone: 600,
      wine: 450,
      sulfur: 500,
      wood: 300,
      crystal: 200,
    },
    {
      stone: 300,
      wine: 450,
      sulfur: 200,
      wood: 500,
      crystal: 0,
    },
    {
      stone: 200,
      wine: 300,
      sulfur: 200,
      wood: 600,
      crystal: 700,
    },
    {
      stone: 500,
      wine: 200,
      sulfur: 0,
      wood: 450,
      crystal: 300,
    },
    {
      stone: 200,
      wine: 300,
      sulfur: 500,
      wood: 700,
      crystal: 450,
    },
    {
      stone: 450,
      wine: 500,
      sulfur: 150,
      wood: 800,
      crystal: 200,
    },
    {
      stone: 450,
      wine: 200,
      sulfur: 450,
      wood: 200,
      crystal: 500,
    },
    {
      stone: 300,
      wine: 150,
      sulfur: 400,
      wood: 200,
      crystal: 1200,
    },
  ];
};

export const WallUpgrade = (level: number): Resources | undefined => {
  return {
    2: {
      stone: 70,
      wine: 0,
      sulfur: 0,
      wood: 260,
      crystal: 0,
    },
    3: {
      stone: 150,
      wine: 0,
      sulfur: 0,
      wood: 380,
      crystal: 0,
    },
    4: {
      stone: 230,
      wine: 0,
      sulfur: 0,
      wood: 560,
      crystal: 0,
    },
    5: {
      stone: 340,
      wine: 0,
      sulfur: 0,
      wood: 710,
      crystal: 0,
    },
  }[level];
};

export const PalaceUpgrade = (level: number): Resources | undefined => {
  return {
    1: {
      stone: 210,
      wine: 100,
      sulfur: 100,
      wood: 560,
      crystal: 100,
    },
    2: {
      stone: 270,
      wine: 270,
      sulfur: 270,
      wood: 560,
      crystal: 270,
    },
    3: {
      stone: 380,
      wine: 380,
      sulfur: 380,
      wood: 780,
      crystal: 380,
    },
  }[level];
};
