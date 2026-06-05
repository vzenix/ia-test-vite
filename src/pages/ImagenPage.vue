<script setup>
import { ref, computed } from 'vue'

const mode = ref('encode')
const imageUrl = ref('')
const base64Output = ref('')
const base64Input = ref('')
const previewUrl = ref('')

function onFileSelected(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    imageUrl.value = reader.result
    base64Output.value = reader.result
    previewUrl.value = reader.result
  }
  reader.readAsDataURL(file)
}

function showImageFromBase64() {
  previewUrl.value = base64Input.value
}

function copyToClipboard() {
  navigator.clipboard.writeText(base64Output.value)
}
</script>

<template>
  <div class="page">
    <div class="card">
      <div class="mode-tabs">
        <button :class="['tab', { active: mode === 'encode' }]" @click="mode = 'encode'">Imagen → Base64</button>
        <button :class="['tab', { active: mode === 'decode' }]" @click="mode = 'decode'">Base64 → Imagen</button>
      </div>

      <div v-if="mode === 'encode'" class="section">
        <h2>Sube una imagen</h2>
        <label class="file-btn">
          <input type="file" accept="image/*" @change="onFileSelected" />
          <span>Examinar...</span>
        </label>

        <div v-if="base64Output" class="result-box">
          <label>Base64 (Data URL):</label>
          <textarea v-model="base64Output" class="textarea" rows="4" readonly></textarea>
          <button @click="copyToClipboard" class="btn">Copiar</button>
          <div class="preview">
            <img :src="previewUrl" alt="preview" class="thumb" />
          </div>
        </div>
      </div>

      <div v-else class="section">
        <h2>Pega un Base64</h2>
        <textarea v-model="base64Input" placeholder="data:image/png;base64,... o solo el base64" class="textarea" rows="4"></textarea>
        <button @click="showImageFromBase64" class="btn">Mostrar imagen</button>

        <div v-if="previewUrl" class="result-box">
          <img :src="previewUrl" alt="base64 image" class="display-img" />
        </div>
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
}

.mode-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tab {
  flex: 1;
  padding: 0.6rem 1rem;
  border: 2px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  color: #555;
  transition: all 0.2s;
}

.tab.active {
  border-color: #42b883;
  background: #42b883;
  color: white;
}

.section h2 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: #555;
}

.file-btn {
  display: inline-block;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
}

.file-btn input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.file-btn span {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background: #667eea;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.95rem;
}

.file-btn:hover span {
  background: #5a6fd6;
}

.preview {
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.thumb {
  max-width: 200px;
  max-height: 200px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

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

.result-box {
  margin-top: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 6px;
}

.result-box label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.display-img {
  max-width: 100%;
  border-radius: 6px;
  border: 1px solid #ddd;
}
</style>