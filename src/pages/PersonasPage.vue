<script setup>
import { ref } from 'vue'
import { generatePerson, generateMultiple } from '../utils/personas'

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
  <div class="page">
    <div class="card">
      <h2>Generar Perfiles</h2>
      <div class="input-group">
        <input 
          v-model="cantidad" 
          type="number" 
          min="1" 
          max="100" 
          class="input"
        />
        <button @click="generar" class="btn">Generar</button>
      </div>
    </div>

    <div v-for="(persona, index) in personas" :key="index" class="card resultado">
      <div class="field">
        <span class="label">Nombre:</span>
        <span class="value">{{ persona.nombre }}</span>
      </div>
      <div class="field">
        <span class="label">DNI:</span>
        <span class="value">{{ persona.dni }}</span>
      </div>
      <div class="field">
        <span class="label">IBAN:</span>
        <span class="value">{{ persona.iban }}</span>
      </div>
      <div class="field">
        <span class="label">BIC/SWIFT:</span>
        <span class="value">{{ persona.bic }}</span>
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

.resultado {
  background: white;
}

.field {
  display: flex;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.field:last-child {
  border-bottom: none;
}

.label {
  font-weight: 500;
  color: #555;
  width: 100px;
}

.value {
  color: #333;
}
</style>