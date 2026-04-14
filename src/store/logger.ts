import { defineStore } from "pinia";

export const useIAStore = defineStore("logger", {
  state: () => ({
    notifies: [],
  }),
});
