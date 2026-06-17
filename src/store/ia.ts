import { defineStore } from "pinia";
import type { Bot } from "../types";

export const useIAStore = defineStore("ia", {
  state: () => ({
    bots: [] as Bot[],
    tick: 0,
  }),
});
