import { defineStore } from "pinia"
import type { Battle } from "../types"

export const useBattleStore = defineStore('battle', {
  state: () => ({ 
    base: {
      attacker: [
        ['spearman', 'front_line', 180, 30],
        ['hoplita', 'front_line', 50, 30],
        ['archer', 'back_line', 180, 30],
        ['catapult', 'destruction_line', 10, 10],
        ['mech', 'front_line', 7, 7]
      ],
      defender: [
        ['wall', 'front_line', 3, 3],
        ['spearman', 'front_line', 30, 30]
      ],
      city: undefined
    } as Battle
  }),
})