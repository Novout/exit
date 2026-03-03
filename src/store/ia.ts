import { defineStore } from "pinia"

export const useIAStore = defineStore('ia', {
  state: () => ({ 
    bots: [],
  }),
})