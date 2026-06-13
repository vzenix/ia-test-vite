<script setup>
import { ref } from 'vue'

const input = ref('')
const output = ref('')
const error = ref('')

function decode() {
  error.value = ''; output.value = ''
  try { output.value = atob(input.value) }
  catch (e) { error.value = 'Base64 inválido: ' + e.message }
}

function encode() {
  error.value = ''; output.value = btoa(input.value)
}
</script>

<template>
  <div>
    <div class="card">
      <textarea v-model="input" placeholder="Introduce texto o Base64..." class="field-textarea" rows="4"></textarea>
      <div class="btn-row">
        <button @click="decode" class="btn">Decodificar</button>
        <button @click="encode" class="btn tonal">Codificar</button>
      </div>
      <div v-if="output" class="chip chip-ok">
        <pre class="pre">{{ output }}</pre>
      </div>
      <div v-if="error" class="chip chip-err">{{ error }}</div>
    </div>
  </div>
</template>

<style scoped>
.card { background: var(--md-surface); padding: 16px; border-radius: var(--md-radius-sm); box-shadow: var(--md-elevation-1); }
.field-textarea { width: 100%; padding: 8px 10px; font-size: 0.85rem; border: 1px solid var(--md-outline); border-radius: 6px; outline: none; resize: vertical; font-family: monospace; }
.field-textarea:focus { border-color: var(--md-primary); }
.btn-row { display: flex; gap: 6px; margin-top: 8px; }
.btn { padding: 7px 14px; background: var(--md-primary); color: var(--md-on-primary); border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.82rem; }
.btn:hover { opacity: 0.9; }
.btn.tonal { background: var(--md-secondary-container); color: var(--md-on-secondary-container); }
.chip { margin-top: 10px; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem; }
.chip-ok { background: #d4edda; color: #155724; }
.chip-err { background: #f8d7da; color: #721c24; }
.pre { margin: 0; white-space: pre-wrap; word-break: break-all; font-size: 0.8rem; }
</style>