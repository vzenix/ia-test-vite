<script setup>
import { ref, computed } from 'vue'
import { validateDNI, generateDNI, generateRandomDNI, getLetterFromDNI } from '../utils/dni'

const dniInput = ref('')
const numberInput = ref('')

const validation = computed(() => {
  if (!dniInput.value) return null
  return validateDNI(dniInput.value)
})

const generatedDNI = computed(() => {
  if (!numberInput.value || numberInput.value.length !== 8) return null
  return generateDNI(numberInput.value)
})

const generatedLetter = computed(() => {
  if (!numberInput.value) return null
  return getLetterFromDNI(numberInput.value)
})

function generateRandom() {
  const dni = generateRandomDNI()
  numberInput.value = dni.slice(0, 8)
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <div>
    <div class="card">
      <h2>Validar DNI</h2>
      <input v-model="dniInput" type="text" placeholder="12345678A" maxlength="9" class="field-input uppercase" />
      <div v-if="validation" :class="['chip', validation.valid ? 'chip-ok' : 'chip-err']">
        <span v-if="validation.valid">DNI válido</span>
        <span v-else>{{ validation.reason }}</span>
      </div>
    </div>

    <div class="card">
      <h2>Generar DNI</h2>
      <div class="row">
        <input v-model="numberInput" type="text" placeholder="Número de 8 dígitos" maxlength="8" class="field-input flex" />
        <button @click="generateRandom" class="btn tonal">Aleatorio</button>
      </div>
      <div v-if="generatedLetter" class="mt chip chip-ok">
        Letra: <strong>{{ generatedLetter }}</strong>
      </div>
      <div v-if="generatedDNI" class="chip chip-ok">
        DNI: {{ generatedDNI }}
        <button @click="copyToClipboard(generatedDNI)" class="btn-sm">Copiar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card { background: var(--md-surface); padding: 16px; border-radius: var(--md-radius-sm); box-shadow: var(--md-elevation-1); margin-bottom: 12px; }
h2 { font-size: 0.9rem; margin-bottom: 10px; color: var(--md-on-surface-variant); }
.field-input { width: 100%; padding: 8px 10px; font-size: 0.9rem; border: 1px solid var(--md-outline); border-radius: 6px; outline: none; }
.field-input:focus { border-color: var(--md-primary); }
.uppercase { text-transform: uppercase; }
.flex { flex: 1; }
.row { display: flex; gap: 6px; }
.btn { padding: 7px 14px; background: var(--md-primary); color: var(--md-on-primary); border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.82rem; white-space: nowrap; }
.btn:hover { opacity: 0.9; }
.btn.tonal { background: var(--md-primary-container); color: var(--md-on-primary-container); }
.btn-sm { padding: 2px 8px; background: var(--md-primary); color: var(--md-on-primary); border: none; border-radius: 4px; cursor: pointer; font-size: 0.75rem; margin-left: 6px; }
.chip { margin-top: 8px; padding: 6px 12px; border-radius: 6px; font-size: 0.82rem; font-weight: 500; }
.chip-ok { background: #d4edda; color: #155724; }
.chip-err { background: #f8d7da; color: #721c24; }
.mt { margin-top: 10px; }
</style>