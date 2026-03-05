import { defineStore } from "pinia"

export const useStructureStore = defineStore('structure', {
  state: () => ({ 
    cityhall: {
      modal: false
    },
    military: {
      modal: false
    },
    storage: {
      modal: false
    },
    tavern: {
      modal: false
    },
    science: {
      modal: false
    },
    navy: {
      modal: false
    },
    market: {
      modal: false
    }
  }),
})