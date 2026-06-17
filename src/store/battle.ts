import { defineStore } from "pinia";
import type { Battle, Resources, WarRecord } from "../types";

export const useBattleStore = defineStore("battle", {
  state: () => ({
    base: {
      attacker: [
        ["mech", "front_line", 7, 7],
        ["hoplita", "front_line", 50, 30],
        ["spearman", "front_line", 180, 30],
        ["archer", "back_line", 180, 30],
        ["catapult", "destruction_line", 10, 10],
      ],
      defender: [
        ["wall", "wall", 3, 3],
        ["mech", "front_line", 7, 7],
        ["hoplita", "front_line", 50, 30],
        ["spearman", "front_line", 180, 30],
        ["archer", "back_line", 180, 30],
        ["catapult", "destruction_line", 10, 10],
      ],
      playerSide: undefined,
      city: undefined,
      winBonus: {
        sulfur: 0,
        stone: 0,
        wine: 0,
        wood: 0,
        crystal: 0,
      } as Resources,
      isViking: false,
    } as Battle,
    wars: [] as WarRecord[],
  }),
});
