import { defineStore } from "pinia"

export const useStructureStore = defineStore('structure', {
  state: () => ({ 
    fortress: {
      units: 1,
      modal: false
    },
    void: {
      modal: false
    },
    hospital: {
      modal: false
    },
    education: {
      modal: false
    },
    marketplace_right: {
      modal: false
    },
    marketplace_left: {
      modal: false
    },
    military: {
      modal: false
    },
  }),
})