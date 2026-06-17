import { defineStore } from "pinia";
import type { Bot, BotDifficulty } from "../types";

export const useIAStore = defineStore("ia", {
  state: () => ({
    bots: [] as Bot[],
    tick: 0,
    difficulty: "medium" as BotDifficulty,
  }),
});
