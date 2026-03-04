import { defineStore } from "pinia"

export const useCycleStore = defineStore('cycle', {
  state: () => ({ 
    started: false,
    type: 'city',
    value: 1, 
  }),
})