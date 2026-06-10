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
  <div class="page">
    <div class="card">
      <h2>Generar UUID v4</h2>
      <div class="gen-row">
        <input type="number" v-model.number="count" min="1" max="50" class="num-input" />
        <span>cantidad (máx 50)</span>
        <button @click="generate" class="btn">Generar</button>
      </div>
      <textarea v-if="generatedUuid" v-model="generatedUuid" class="textarea" rows="6" readonly></textarea>
      <button v-if="generatedUuid" @click="copyAll" class="btn copy-btn">Copiar todo</button>
    </div>

    <div class="card">
      <h2>Validar UUID</h2>
      <input v-model="uuidInput" placeholder="Introduce un UUID..." class="text-input" />
      <button @click="validate" class="btn">Validar</button>
      <div v-if="validationResult !== null" :class="['result', validationResult ? 'valid' : 'invalid']">
        {{ validationResult ? 'UUID válido' : 'UUID no válido' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { width: 100%; }

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

.gen-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: #666;
}

.num-input {
  width: 60px;
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  text-align: center;
  outline: none;
}

.num-input:focus { border-color: #42b883; }

.text-input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  outline: none;
  margin-bottom: 0.75rem;
  font-family: monospace;
}

.text-input:focus { border-color: #42b883; }

.textarea {
  width: 100%;
  padding: 0.75rem;
  font-size: 0.85rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  outline: none;
  resize: vertical;
  font-family: monospace;
  margin-bottom: 0.75rem;
}

.textarea:focus { border-color: #42b883; }

.btn {
  padding: 0.6rem 1rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn:hover { background: #3aa876; }

.copy-btn { margin-top: 0; }

.result {
  margin-top: 0.75rem;
  padding: 0.6rem 1rem;
  border-radius: 6px;
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
</style>