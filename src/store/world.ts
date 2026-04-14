import { defineStore } from "pinia";
import type { IslandCity, ResourcesType } from "../types";

export const useWolrdStore = defineStore("world", {
  state: () => ({
    cityActive: {} as IslandCity | undefined,
    islands: [] as {
      x: number;
      y: number;
      type: ResourcesType;
      vikingLevel: 1;
      cities: IslandCity[];
    }[],
  }),
});
