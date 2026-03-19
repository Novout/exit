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
    },
    wood: {
      modal: false
    },
    resource: {
      modal: false
    },
    cityView: {
      modal: false
    },
    wall: {
      modal: false
    },
    palace: {
      modal: false
    },
    notifies: {
      modal: false
    },
    points: {
      modal: false
    },
    military_base: {
      modal: false
    },
    viking: {
      modal: false
    },
  }),
})