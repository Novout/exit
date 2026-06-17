<template>
  <section
    ref="main"
    class="structure-modal"
  >
    <div class="modal-header">
      <span class="modal-title">{{
        String(props.name).charAt(0).toUpperCase() +
        String(props.name).slice(1)
      }}</span>
      <button class="modal-close" @click="closeAll">✕</button>
    </div>
    <div class="modal-body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { useTemplateRef } from "vue";
import { useStructureStore } from "../../store/structure";

const STRUCTURE = useStructureStore();

const props = defineProps<{
  name: string;
}>();
const section = useTemplateRef("main");

const closeAll = () => {
  STRUCTURE.cityhall.modal = false;
  STRUCTURE.military.modal = false;
  STRUCTURE.storage.modal = false;
  STRUCTURE.science.modal = false;
  STRUCTURE.tavern.modal = false;
  STRUCTURE.navy.modal = false;
  STRUCTURE.market.modal = false;
  STRUCTURE.wood.modal = false;
  STRUCTURE.resource.modal = false;
  STRUCTURE.wall.modal = false;
  STRUCTURE.palace.modal = false;
  STRUCTURE.military_base.modal = false;
  STRUCTURE.points.modal = false;
  STRUCTURE.notifies.modal = false;
  STRUCTURE.viking.modal = false;
};

onClickOutside(section, closeAll);
</script>

<style scoped>
.structure-modal {
  position: absolute;
  top: 80px;
  left: 20px;
  width: 480px;
  max-height: 560px;
  background: #1e1e1e;
  border: 1px solid #3a3a3a;
  display: flex;
  flex-direction: column;
  font-family: "Poppins", sans-serif;
  z-index: 100;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #3a3a3a;
  flex-shrink: 0;
}

.modal-title {
  font-family: "Cinzel", serif;
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #d0d0d0;
}

.modal-close {
  background: none;
  border: none;
  color: #555;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.1rem 0.35rem;
  transition: color 0.15s;
  line-height: 1;
}
.modal-close:hover { color: #d0d0d0; }

.modal-body {
  padding: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  color: #c0c0c0;
  font-size: 0.88rem;
}
</style>
