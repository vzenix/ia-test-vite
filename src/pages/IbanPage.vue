<script setup>
import { ref, computed } from 'vue'
import { validateIBAN, formatIBAN, generateIBAN, getSupportedCountries } from '../utils/iban'

const ibanInput = ref('')
const selectedCountry = ref('ES')
const currentIBAN = ref('')

const ibanValidation = computed(() => {
  if (!ibanInput.value) return null
  return validateIBAN(ibanInput.value)
})

const formattedIBAN = computed(() => {
  if (!ibanInput.value) return null
  return formatIBAN(ibanInput.value)
})

const supportedCountries = getSupportedCountries()

function generateNew() {
  currentIBAN.value = generateIBAN(selectedCountry.value)
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <div>
    <div class="card">
      <h2>Validar IBAN</h2>
      <input v-model="ibanInput" type="text" placeholder="ES12 3456 7890 1234 5678 9012" class="field-input uppercase" />
      <div v-if="formattedIBAN" class="mono mt-sm">{{ formattedIBAN }}</div>
      <div v-if="ibanValidation" :class="['chip', ibanValidation.valid ? 'chip-ok' : 'chip-err']">
        <span v-if="ibanValidation.valid">IBAN válido ({{ ibanValidation.countryCode }})</span>
        <span v-else>{{ ibanValidation.reason }}</span>
      </div>
    </div>

    <div class="card">
      <h2>Generar IBAN</h2>
      <div class="row">
        <select v-model="selectedCountry" class="field-input flex">
          <option v-for="c in supportedCountries" :key="c" :value="c">{{ c }}</option>
        </select>
        <button @click="generateNew" class="btn">Generar</button>
      </div>
      <div v-if="currentIBAN" class="chip chip-ok mono">
        {{ formatIBAN(currentIBAN) }}
        <button @click="copyToClipboard(currentIBAN)" class="btn-sm">Copiar</button>
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
.btn-sm { padding: 2px 8px; background: var(--md-primary); color: var(--md-on-primary); border: none; border-radius: 4px; cursor: pointer; font-size: 0.75rem; margin-left: 6px; }
.chip { margin-top: 8px; padding: 6px 12px; border-radius: 6px; font-size: 0.82rem; font-weight: 500; }
.chip-ok { background: #d4edda; color: #155724; }
.chip-err { background: #f8d7da; color: #721c24; }
.mono { font-family: monospace; }
.mt-sm { margin-top: 6px; font-size: 0.8rem; color: var(--md-on-surface-variant); }
</style>