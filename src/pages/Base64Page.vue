<script setup>
import { ref, computed } from 'vue'

const input = ref('')
const output = ref('')
const error = ref('')

function decode() {
  error.value = ''
  output.value = ''
  try {
    const decoded = atob(input.value)
    output.value = decoded
  } catch (e) {
    error.value = 'Base64 inválido: ' + e.message
  }
}

function encode() {
  error.value = ''
  output.value = btoa(input.value)
}
</script>

<template>
  <div class="page">
    <div class="card">
      <h2>Base64 Decoder / Encoder</h2>
      <textarea 
        v-model="input" 
        placeholder="Introduce texto o Base64..."
        class="textarea"
        rows="5"
      ></textarea>
      <div class="btn-group">
        <button @click="decode" class="btn">Decodificar</button>
        <button @click="encode" class="btn btn-secondary">Codificar</button>
      </div>
      <div v-if="output" class="result valid">
        Resultado:
        <pre>{{ output }}</pre>
      </div>
      <div v-if="error" class="result invalid">
        {{ error }}
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

.textarea {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  outline: none;
  resize: vertical;
  font-family: monospace;
}

.textarea:focus { border-color: #42b883; }

.btn-group {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

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

.btn-secondary {
  background: #667eea;
}

.btn-secondary:hover { background: #5a6fd6; }

.result {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 500;
  word-break: break-all;
}

.result.valid {
  background: #d4edda;
  color: #155724;
}

.result.invalid {
  background: #f8d7da;
  color: #721c24;
}

pre {
  margin-top: 0.5rem;
  white-space: pre-wrap;
  font-size: 0.9rem;
}
</style>