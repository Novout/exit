import type { BotArchetype, BotWeights } from "../types";

export const ARCHETYPE_WEIGHTS: Record<BotArchetype, BotWeights> = {
  militarist: {
    build_military: 0.8,
    build_economy: 0.2,
    colonize: 0.2,
    attack: 0.9,
    research: 0.2,
  },
  economist: {
    build_military: 0.2,
    build_economy: 0.9,
    colonize: 0.4,
    attack: 0.1,
    research: 0.7,
  },
  colonizer: {
    build_military: 0.4,
    build_economy: 0.5,
    colonize: 0.9,
    attack: 0.3,
    research: 0.4,
  },
  balanced: {
    build_military: 0.5,
    build_economy: 0.5,
    colonize: 0.5,
    attack: 0.5,
    research: 0.5,
  },
};

export const ARCHETYPES: BotArchetype[] = [
  "militarist",
  "economist",
  "colonizer",
  "balanced",
];
