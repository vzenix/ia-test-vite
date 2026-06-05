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
  <div class="page">
    <div class="card">
      <h2>Validar IBAN</h2>
      <input 
        v-model="ibanInput" 
        type="text" 
        placeholder="ES12 3456 7890 1234 5678 9012" 
        class="input"
      />
      <div v-if="formattedIBAN" class="formatted">
        {{ formattedIBAN }}
      </div>
      <div v-if="ibanValidation" :class="['result', ibanValidation.valid ? 'valid' : 'invalid']">
        <span v-if="ibanValidation.valid">IBAN válido ({{ ibanValidation.countryCode }})</span>
        <span v-else>{{ ibanValidation.reason }}</span>
      </div>
    </div>

    <div class="card">
      <h2>Generar IBAN</h2>
      <div class="input-group">
        <select v-model="selectedCountry" class="input select">
          <option v-for="country in supportedCountries" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
        <button @click="generateNew" class="btn">Generar</button>
      </div>
      <div v-if="currentIBAN" class="result valid">
        {{ formatIBAN(currentIBAN) }}
        <button @click="copyToClipboard(currentIBAN)" class="btn-small">Copiar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  width: 100%;
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #555;
}

.input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1.1rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  outline: none;
  text-transform: uppercase;
}

.input:focus {
  border-color: #42b883;
}

.input-group {
  display: flex;
  gap: 0.5rem;
}

.input-group .input,
.select {
  flex: 1;
}

.btn {
  padding: 0.75rem 1rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn:hover {
  background: #3aa876;
}

.btn-small {
  padding: 0.25rem 0.5rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.result {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
}

.result.valid {
  background: #d4edda;
  color: #155724;
}

.result.invalid {
  background: #f8d7da;
  color: #721c24;
}

.formatted {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #666;
  font-family: monospace;
}

.select {
  cursor: pointer;
}
</style>