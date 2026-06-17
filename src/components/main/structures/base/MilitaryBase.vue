<template>
  <div class="overlay" @click.self="STRUCTURE.military_base.modal = false">
    <div class="panel">
      <div class="panel-header">
        <span class="panel-title">War Chronicle</span>
        <button class="close-btn" @click="STRUCTURE.military_base.modal = false">✕</button>
      </div>

      <div class="panel-body">
        <p v-if="BATTLE.wars.length === 0" class="empty">No battles recorded yet.</p>

        <div v-for="war in BATTLE.wars" :key="war.id" class="war-entry" :class="playerWon(war) ? 'victory' : 'defeat'">
          <div class="war-header">
            <span class="war-label">
              {{ war.isViking ? 'Viking Raid' : 'Bot Siege' }}
              <span class="war-id">#{{ war.id }}</span>
            </span>
            <span class="war-result" :class="playerWon(war) ? 'result-win' : 'result-loss'">
              {{ playerWon(war) ? 'Victory' : 'Defeat' }}
            </span>
            <span class="war-rounds">{{ war.round }} rounds</span>
          </div>

          <div class="war-sides">
            <div class="side">
              <p class="side-label">Attacker</p>
              <div class="units">
                <span v-for="u in war.attackerUnits.filter(u => u.initial > 0)" :key="u.type" class="unit-chip">
                  {{ u.type }} {{ u.final }}/{{ u.initial }}
                </span>
              </div>
            </div>
            <div class="vs">VS</div>
            <div class="side">
              <p class="side-label">Defender</p>
              <div class="units">
                <span v-for="u in war.defenderUnits.filter(u => u.initial > 0)" :key="u.type" class="unit-chip">
                  {{ u.type }} {{ u.final }}/{{ u.initial }}
                </span>
              </div>
            </div>
          </div>

          <div class="war-bonus" v-if="playerWon(war) && war.winBonus">
            <span v-for="(val, key) in war.winBonus" :key="key" class="bonus-chip" v-show="(val as number) > 0">
              +{{ val }} {{ key }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBattleStore } from "../../../../store/battle";
import { useStructureStore } from "../../../../store/structure";
import type { WarRecord } from "../../../../types";

const BATTLE = useBattleStore();
const STRUCTURE = useStructureStore();

const playerWon = (war: WarRecord) => war.winner === war.playerSide;
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.panel {
  background: #1e1e1e;
  border: 1px solid #3a3a3a;
  width: 680px;
  max-width: 95vw;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  font-family: "Poppins", sans-serif;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.25rem;
  border-bottom: 1px solid #3a3a3a;
  flex-shrink: 0;
}

.panel-title {
  font-family: "Cinzel", serif;
  font-size: 1rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #d0d0d0;
}

.close-btn {
  background: none;
  border: none;
  color: #666;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  transition: color 0.15s;
}
.close-btn:hover { color: #d0d0d0; }

.panel-body {
  overflow-y: auto;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.empty {
  color: #555;
  font-size: 0.85rem;
  text-align: center;
  padding: 2rem 0;
}

.war-entry {
  border: 1px solid #2e2e2e;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.war-entry.victory { border-left: 3px solid #3a5a3a; }
.war-entry.defeat  { border-left: 3px solid #5a2a2a; }

.war-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.war-label {
  font-family: "Cinzel", serif;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  color: #aaa;
  flex: 1;
}

.war-id {
  color: #555;
  margin-left: 0.3rem;
}

.war-result {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 2px 10px;
}
.result-win  { background: #1a2e1a; color: #6dbf6d; }
.result-loss { background: #2e1a1a; color: #bf6d6d; }

.war-rounds {
  font-size: 0.72rem;
  color: #555;
}

.war-sides {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.75rem;
  align-items: start;
}

.vs {
  font-family: "Cinzel", serif;
  font-size: 0.7rem;
  color: #444;
  padding-top: 1.1rem;
}

.side-label {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #555;
  margin: 0 0 0.3rem;
}

.units {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.unit-chip {
  font-size: 0.72rem;
  color: #999;
  background: #111;
  border: 1px solid #2e2e2e;
  padding: 1px 7px;
}

.war-bonus {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  padding-top: 0.25rem;
  border-top: 1px solid #2a2a2a;
}

.bonus-chip {
  font-size: 0.72rem;
  color: #6dbf6d;
  background: #1a2e1a;
  padding: 1px 8px;
}
</style>
