import { defineStore } from "pinia"

export const useCycleStore = defineStore('cycle', {
  state: () => ({ 
    blocked: false,
    value: 1, 
  }),
})