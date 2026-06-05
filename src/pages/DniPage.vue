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
  <div class="page">
    <div class="card">
      <h2>Validar DNI</h2>
      <input 
        v-model="dniInput" 
        type="text" 
        placeholder="12345678A" 
        maxlength="9"
        class="input"
      />
      <div v-if="validation" :class="['result', validation.valid ? 'valid' : 'invalid']">
        <span v-if="validation.valid">DNI válido</span>
        <span v-else>{{ validation.reason }}</span>
      </div>
    </div>

    <div class="card">
      <h2>Generar DNI</h2>
      <div class="input-group">
        <input 
          v-model="numberInput" 
          type="text" 
          placeholder="Número de 8 dígitos" 
          maxlength="8"
          class="input"
        />
        <button @click="generateRandom" class="btn">Aleatorio</button>
      </div>
      <div v-if="generatedLetter" class="generated">
        Letra: <strong>{{ generatedLetter }}</strong>
      </div>
      <div v-if="generatedDNI" class="result valid">
        DNI: {{ generatedDNI }}
        <button @click="copyToClipboard(generatedDNI)" class="btn-small">Copiar</button>
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

.input-group .input {
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

.generated {
  margin-top: 1rem;
  color: #555;
}
</style>