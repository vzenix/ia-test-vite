<script setup>
import { ref } from 'vue'

const uuidInput = ref('')
const validationResult = ref(null)
const generatedUuid = ref('')
const count = ref(1)

function generate() {
  const n = Math.min(Math.max(parseInt(count.value) || 1, 1), 50)
  generatedUuid.value = Array.from({ length: n }, () => crypto.randomUUID()).join('\n')
}

function validate() {
  const re = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  validationResult.value = re.test(uuidInput.value.trim())
}

function copyAll() {
  navigator.clipboard.writeText(generatedUuid.value)
}
</script>

<template>
  <div>
    <div class="card">
      <h2>Generar UUID v4</h2>
      <div class="row">
        <input type="number" v-model.number="count" min="1" max="50" class="field-input" style="width:64px" />
        <span class="hint">cantidad (máx 50)</span>
        <button @click="generate" class="btn">Generar</button>
      </div>
      <textarea v-if="generatedUuid" v-model="generatedUuid" class="field-textarea mt" rows="5" readonly></textarea>
      <button v-if="generatedUuid" @click="copyAll" class="btn tonal mt">Copiar todo</button>
    </div>

    <div class="card">
      <h2>Validar UUID</h2>
      <div class="row">
        <input v-model="uuidInput" placeholder="Introduce un UUID..." class="field-input flex" />
        <button @click="validate" class="btn">Validar</button>
      </div>
      <div v-if="validationResult !== null" :class="['chip', validationResult ? 'chip-ok' : 'chip-err']">
        {{ validationResult ? 'UUID válido' : 'UUID no válido' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card { background: var(--md-surface); padding: 16px; border-radius: var(--md-radius-sm); box-shadow: var(--md-elevation-1); margin-bottom: 12px; }
h2 { font-size: 0.9rem; margin-bottom: 10px; color: var(--md-on-surface-variant); }
.row { display: flex; align-items: center; gap: 8px; }
.field-input { padding: 8px 10px; font-size: 0.9rem; border: 1px solid var(--md-outline); border-radius: 6px; outline: none; }
.field-input:focus { border-color: var(--md-primary); }
.flex { flex: 1; font-family: monospace; }
.hint { font-size: 0.8rem; color: var(--md-on-surface-variant); }
.btn { padding: 7px 14px; background: var(--md-primary); color: var(--md-on-primary); border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.82rem; white-space: nowrap; }
.btn:hover { opacity: 0.9; }
.btn.tonal { background: var(--md-primary-container); color: var(--md-on-primary-container); }
.field-textarea { width: 100%; padding: 8px 10px; font-size: 0.82rem; border: 1px solid var(--md-outline); border-radius: 6px; outline: none; resize: vertical; font-family: monospace; }
.field-textarea:focus { border-color: var(--md-primary); }
.chip { margin-top: 8px; padding: 6px 12px; border-radius: 6px; font-size: 0.82rem; font-weight: 500; }
.chip-ok { background: #d4edda; color: #155724; }
.chip-err { background: #f8d7da; color: #721c24; }
.mt { margin-top: 10px; }
</style>