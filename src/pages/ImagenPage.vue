<script setup>
import { ref } from 'vue'

const mode = ref('encode')
const previewUrl = ref('')
const base64Output = ref('')
const base64Input = ref('')

function onFileSelected(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
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
  <div>
    <div class="tabs">
      <button :class="['tab', { active: mode === 'encode' }]" @click="mode = 'encode'">Imagen → Base64</button>
      <button :class="['tab', { active: mode === 'decode' }]" @click="mode = 'decode'">Base64 → Imagen</button>
    </div>

    <div v-if="mode === 'encode'" class="card">
      <label class="file-btn">
        <input type="file" accept="image/*" @change="onFileSelected" />
        <span>Examinar...</span>
      </label>

      <div v-if="base64Output">
        <img :src="previewUrl" alt="preview" class="thumb" />
        <textarea v-model="base64Output" class="field-textarea mt" rows="3" readonly></textarea>
        <button @click="copyToClipboard" class="btn mt">Copiar</button>
      </div>
    </div>

    <div v-else class="card">
      <textarea v-model="base64Input" placeholder="data:image/png;base64,..." class="field-textarea" rows="3"></textarea>
      <button @click="showImageFromBase64" class="btn mt">Mostrar imagen</button>
      <img v-if="previewUrl" :src="previewUrl" alt="base64 image" class="img mt" />
    </div>
  </div>
</template>

<style scoped>
.tabs { display: flex; gap: 4px; margin-bottom: 12px; }
.tab { flex: 1; padding: 8px; background: var(--md-surface); border: 1px solid var(--md-outline); border-radius: var(--md-radius-sm); cursor: pointer; font-weight: 500; font-size: 0.82rem; color: var(--md-on-surface-variant); }
.tab.active { background: var(--md-primary); color: var(--md-on-primary); border-color: var(--md-primary); }
.card { background: var(--md-surface); padding: 16px; border-radius: var(--md-radius-sm); box-shadow: var(--md-elevation-1); }
.file-btn { display: inline-block; position: relative; overflow: hidden; }
.file-btn input[type="file"] { position: absolute; left: 0; top: 0; opacity: 0; width: 100%; height: 100%; cursor: pointer; }
.file-btn span { display: inline-block; padding: 7px 14px; background: var(--md-secondary); color: var(--md-on-secondary); border-radius: 6px; font-weight: 600; font-size: 0.82rem; }
.thumb { max-width: 160px; max-height: 160px; border-radius: 6px; border: 1px solid var(--md-outline); }
.img { max-width: 100%; border-radius: 6px; border: 1px solid var(--md-outline); }
.field-textarea { width: 100%; padding: 8px 10px; font-size: 0.82rem; border: 1px solid var(--md-outline); border-radius: 6px; outline: none; resize: vertical; font-family: monospace; }
.field-textarea:focus { border-color: var(--md-primary); }
.btn { padding: 7px 14px; background: var(--md-primary); color: var(--md-on-primary); border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.82rem; }
.btn:hover { opacity: 0.9; }
.mt { margin-top: 10px; }
</style>