import { defineStore } from "pinia";

export const useCycleStore = defineStore("cycle", {
  state: () => ({
    started: false,
    type: "battle",
    value: 1,
  }),
});
