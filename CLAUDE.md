# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Exit** is an offline web-based reimplementation of Ikariam — a browser strategy game. Built with Vue 3 + TypeScript + Vite + Pinia.

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Type-check (vue-tsc) + Vite production build
pnpm preview    # Preview production build
pnpm format     # Prettier formatting
```

No test suite is configured.

## Architecture

### State (Pinia stores in `src/store/`)

| Store | Purpose |
|---|---|
| `cycle` | Current game screen: `world`, `island`, `city`, `battle`, `enter` |
| `player` | Player data, active city, gold, science/colonization points |
| `world` | World map, island grid, exploration state |
| `controller` | Central game logic engine — tick progression, builds, resource accumulation |
| `battle` | Battle mechanics, unit resolution, win/loss |
| `structure` | Building state per city |
| `events` / `logger` | In-game event log |

### Game Logic

- **`src/defines/`** — Static game data: default player/city templates (`player.ts`), building upgrade trees (`upgrades.ts`), difficulty balancing (`difficults.ts`), unit stats (`battle.ts`)
- **`src/use/`** — Composables with pure game calculations: `battle.ts` (combat resolution), `world.ts` (map generation, exploration)
- **`src/types.ts`** — All shared TypeScript interfaces: `Player`, `City`, `Island`, `Battle`, unit types, timer shapes

### UI Components (`src/components/`)

- `Game*.vue` files at root — top-level screens switched by `cycle` store: `GameWorld`, `GameIsland`, `GameCity`, `GameBattle`, `GameEnter`, `GameBar`, `GameTimers`
- `main/structures/` — one component per building (Market, Navy, Palace, Wall, etc.)
- `main/icons/` — SVG icon components
- `utils/` — shared primitives: `Button`, `Modal`, `ModalFull`, `ResourcesBar`, `StructureModal`

Components are auto-imported via `unplugin-vue-components` — no manual imports needed.

### Styling

UnoCSS (Tailwind-like utility classes). Configuration in `uno.config.ts`. Global styles in `src/style.css`.

### TypeScript

Strict mode is enabled: `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`, `noFallthroughCasesInSwitch`. All new code must pass `vue-tsc` without errors.

## Key Domain Concepts

- **City resources:** wood, sulfur, crystal, wine, stone
- **Buildings:** storage, tavern, science, market, military, navy, palace, wall, city hall
- **Units:** spearman, archer, hoplita, catapult, mech, viking, wall
- **Timers:** all time-based actions (construction, travel, point accumulation) use a shared timer shape — check `src/types.ts` for the canonical definition
