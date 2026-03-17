import { defineStore } from "pinia"
import type { Event } from "../types"

export const useEventsStore = defineStore('events', {
  state: () => ({ 
    list: [] as Event[]
  }),
})