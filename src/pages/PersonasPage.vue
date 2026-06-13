<script setup>
import { ref } from 'vue'
import { generateMultiple } from '../utils/personas'

const cantidad = ref(1)
const personas = ref([])

function generar() {
  personas.value = generateMultiple(cantidad.value)
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <div>
    <div class="card">
      <div class="row">
        <input v-model.number="cantidad" type="number" min="1" max="100" class="field-input" style="width:80px" />
        <button @click="generar" class="btn">Generar {{ cantidad }} perfil{{ cantidad !== 1 ? 'es' : '' }}</button>
      </div>
    </div>

    <div v-for="(p, i) in personas" :key="i" class="card">
      <div class="pf-row"><span class="pf-lbl">Nombre</span><span>{{ p.nombre }}</span></div>
      <div class="pf-row"><span class="pf-lbl">DNI</span><span>{{ p.dni }} <button @click="copyToClipboard(p.dni)" class="btn-sm">Copiar</button></span></div>
      <div class="pf-row"><span class="pf-lbl">IBAN</span><span class="mono">{{ p.iban }} <button @click="copyToClipboard(p.iban)" class="btn-sm">Copiar</button></span></div>
      <div class="pf-row"><span class="pf-lbl">BIC</span><span>{{ p.bic }} <button @click="copyToClipboard(p.bic)" class="btn-sm">Copiar</button></span></div>
    </div>
  </div>
</template>

<style scoped>
.card { background: var(--md-surface); padding: 14px 16px; border-radius: var(--md-radius-sm); box-shadow: var(--md-elevation-1); margin-bottom: 10px; }
.row { display: flex; gap: 8px; align-items: center; }
.field-input { padding: 8px 10px; font-size: 0.9rem; border: 1px solid var(--md-outline); border-radius: 6px; outline: none; }
.field-input:focus { border-color: var(--md-primary); }
.btn { padding: 7px 14px; background: var(--md-primary); color: var(--md-on-primary); border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.82rem; white-space: nowrap; }
.btn:hover { opacity: 0.9; }
.btn-sm { padding: 2px 8px; background: var(--md-primary); color: var(--md-on-primary); border: none; border-radius: 4px; cursor: pointer; font-size: 0.7rem; margin-left: 4px; }
.pf-row { display: flex; padding: 4px 0; font-size: 0.85rem; border-bottom: 1px solid var(--md-outline-variant); }
.pf-row:last-child { border-bottom: none; }
.pf-lbl { width: 72px; font-weight: 600; color: var(--md-on-surface-variant); flex-shrink: 0; }
.mono { font-family: monospace; font-size: 0.8rem; }
</style>