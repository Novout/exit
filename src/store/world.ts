import { defineStore } from "pinia"
import type { IslandCity, ResourcesType } from "../types"

export const useWolrdStore = defineStore('world', {
  state: () => ({ 
    islands: [] as {
      x: number,
      y: number,
      type: ResourcesType,
      cities: IslandCity[]
    }[],
  }),
})