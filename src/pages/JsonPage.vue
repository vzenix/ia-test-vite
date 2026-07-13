<script setup>
import { ref, computed } from 'vue'

const input = ref('')
const error = ref('')

const formatted = computed(() => {
  error.value = ''
  if (!input.value.trim()) return ''
  try {
    const parsed = JSON.parse(input.value)
    return JSON.stringify(parsed, null, 2)
  } catch (e) {
    error.value = 'JSON inválido: ' + e.message
    return ''
  }
})

const highlighted = computed(() => {
  const raw = formatted.value
  if (!raw) return ''
  return raw.replace(/("(?:\\.|[^"\\])*")\s*:/g, '<span class="k">$1</span>:')
    .replace(/:(\s*)("(?:\\.|[^"\\])*")/g, ':$1<span class="s">$2</span>')
    .replace(/:\s*(\d+(?:\.\d+)?)/g, ': <span class="n">$1</span>')
    .replace(/:\s*(true|false|null)/g, ': <span class="b">$1</span>')
})

function copy() {
  navigator.clipboard.writeText(formatted.value)
}

function clearInput() {
  input.value = ''
}
</script>

<template>
  <div>
    <div class="card">
      <textarea v-model="input" placeholder="Pega tu JSON aquí..." class="ft" rows="6" spellcheck="false"></textarea>
      <div class="row">
        <button @click="clearInput" class="btn tonal" v-if="input">Limpiar</button>
        <button @click="copy" class="btn" v-if="formatted">Copiar formateado</button>
      </div>
    </div>

    <div v-if="error" class="card card-err">{{ error }}</div>

    <div v-if="formatted" class="card">
      <pre class="pre" v-html="highlighted"></pre>
    </div>
  </div>
</template>

<style scoped>
.card { background: var(--md-surface); padding: 16px; border-radius: var(--md-radius-sm); box-shadow: var(--md-elevation-1); margin-bottom: 12px; }
.card-err { background: #f8d7da; color: #721c24; font-size: 0.85rem; }
.ft { width: 100%; padding: 10px; font-size: 0.82rem; border: 1px solid var(--md-outline); border-radius: 6px; outline: none; resize: vertical; font-family: monospace; }
.ft:focus { border-color: var(--md-primary); }
.row { display: flex; gap: 6px; margin-top: 8px; }
.btn { padding: 6px 12px; background: var(--md-primary); color: var(--md-on-primary); border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.8rem; }
.btn:hover { opacity: 0.9; }
.btn.tonal { background: var(--md-primary-container); color: var(--md-on-primary-container); }
.pre { margin: 0; font-size: 0.8rem; line-height: 1.5; overflow-x: auto; white-space: pre; }
.pre :deep(.k) { color: #0550ae; }
.pre :deep(.s) { color: #0a3069; }
.pre :deep(.n) { color: #0550ae; }
.pre :deep(.b) { color: #8250df; }
</style>