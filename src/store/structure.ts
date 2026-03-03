import { defineStore } from "pinia"

export const useStructureStore = defineStore('structure', {
  state: () => ({ 
    cityhall: {
      level: 1,
      modal: false
    },
    military: {
      level: 1,
      modal: false
    },
    store: {
      level: 1,
      modal: false
    },
  }),
})