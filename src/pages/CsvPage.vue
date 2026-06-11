<script setup>
import { ref, reactive } from 'vue'
import { COLUMN_TYPES, PROVINCIAS, buildCSV } from '../utils/csvGenerators.js'

const LS_KEY = 'csv_history'
const MAX_HISTORY = 10

const rows = ref(10)
const separator = ref(';')
const columns = reactive([{ name: 'Nombre', type: 'nombre', config: {} }])
const csvOutput = ref('')
const fileName = ref('datos')
const history = ref([])
const importJson = ref('')
const showImportInput = ref(false)
const selectedHistory = ref(-1)

const typesWithProvincia = ['cp', 'ciudad']

loadHistory()

function getConfig() {
  return {
    rows: rows.value,
    separator: separator.value,
    fileName: fileName.value,
    columns: columns.map(c => ({ name: c.name, type: c.type, config: { ...c.config } }))
  }
}

function setConfig(cfg) {
  rows.value = cfg.rows
  separator.value = cfg.separator
  fileName.value = cfg.fileName || 'datos'
  columns.splice(0, columns.length, ...cfg.columns.map(c => ({ name: c.name, type: c.type, config: { ...c.config } })))
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    history.value = raw ? JSON.parse(raw) : []
  } catch { history.value = [] }
}

function saveToHistory() {
  const entry = { ...getConfig(), savedAt: new Date().toISOString() }
  let list = history.value.filter((_, i) => i !== selectedHistory.value)
  list.unshift(entry)
  if (list.length > MAX_HISTORY) list = list.slice(0, MAX_HISTORY)
  history.value = list
  selectedHistory.value = 0
  localStorage.setItem(LS_KEY, JSON.stringify(list))
}

function loadConfig(index) {
  const cfg = history.value[index]
  if (cfg) {
    setConfig(cfg)
    selectedHistory.value = index
  }
}

function deleteHistoryItem(index) {
  history.value.splice(index, 1)
  localStorage.setItem(LS_KEY, JSON.stringify(history.value))
  if (selectedHistory.value === index) selectedHistory.value = -1
  else if (selectedHistory.value > index) selectedHistory.value--
}

function generate() {
  for (const col of columns) {
    if (col.type === 'conjunto') {
      col.config.valores = (col.config.valoresRaw || '')
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean)
    }
  }
  csvOutput.value = buildCSV(rows.value, separator.value, columns)
  saveToHistory()
}

function download() {
  const blob = new Blob([csvOutput.value], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName.value + '.csv'
  a.click()
  URL.revokeObjectURL(url)
}

function copy() {
  navigator.clipboard.writeText(csvOutput.value)
}

function addColumn() {
  columns.push({ name: 'columna' + (columns.length + 1), type: 'lorem_ipsum', config: {} })
}

function removeColumn(index) {
  columns.splice(index, 1)
}

function exportConfig() {
  const json = JSON.stringify(getConfig(), null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'csv-config.json'
  a.click()
  URL.revokeObjectURL(url)
}

function importConfigFromFile(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    try {
      setConfig(JSON.parse(reader.result))
    } catch { alert('JSON inválido') }
  }
  reader.readAsText(file)
}

function importFromPaste() {
  try {
    setConfig(JSON.parse(importJson.value))
    showImportInput.value = false
    importJson.value = ''
  } catch { alert('JSON inválido') }
}
</script>

<template>
  <div class="page">
    <div class="card">
      <h2>Configuración</h2>

      <div class="config-row">
        <label class="field">
          <span>Filas:</span>
          <input type="number" v-model.number="rows" min="1" max="10000" class="input-sm" />
        </label>
        <label class="field">
          <span>Separador:</span>
          <select v-model="separator" class="input-sm">
            <option value=";">Punto y coma (;)</option>
            <option value=",">Coma (,)</option>
          </select>
        </label>
        <label class="field">
          <span>Nombre archivo:</span>
          <input v-model="fileName" class="input-sm" />
        </label>
      </div>

      <div class="config-actions">
        <button @click="exportConfig" class="btn btn-outline">Exportar JSON</button>
        <label class="btn btn-outline btn-file">
          Importar JSON
          <input type="file" accept=".json" @change="importConfigFromFile" />
        </label>
        <button @click="showImportInput = !showImportInput" class="btn btn-outline">Pegar JSON</button>
      </div>

      <textarea v-if="showImportInput" v-model="importJson" class="textarea" rows="4" placeholder="Pega el JSON de configuración..."></textarea>
      <button v-if="showImportInput" @click="importFromPaste" class="btn" style="margin-bottom: 1rem;">Cargar</button>

      <div v-if="history.length" class="history">
        <h2>Historial</h2>
        <div
          v-for="(item, i) in history"
          :key="i"
          :class="['hist-item', { active: selectedHistory === i }]"
          @click="loadConfig(i)"
        >
          <span class="hist-info">
            {{ item.columns.length }} col· {{ item.rows }} filas —
            {{ new Date(item.savedAt).toLocaleString() }}
          </span>
          <button class="btn-icon-small" @click.stop="deleteHistoryItem(i)" title="Eliminar">&times;</button>
        </div>
      </div>

      <h2 style="margin-top:1rem">Columnas</h2>

      <div v-for="(col, i) in columns" :key="i" class="col-row">
        <button class="btn-icon" @click="removeColumn(i)" title="Eliminar columna">&times;</button>
        <input v-model="col.name" placeholder="Nombre columna" class="col-name" />
        <select v-model="col.type" class="col-type">
          <option v-for="t in COLUMN_TYPES" :key="t.value" :value="t.value">{{ t.label }}</option>
        </select>

        <div v-if="typesWithProvincia.includes(col.type)" class="col-extra">
          <label>Provincia:</label>
          <select v-model="col.config.provincia">
            <option value="">Todas</option>
            <option v-for="p in PROVINCIAS" :key="p.code" :value="p.code">{{ p.name }}</option>
          </select>
        </div>

        <div v-if="col.type === 'fecha'" class="col-extra">
          <label>Desde:</label>
          <input type="date" v-model="col.config.fechaInicio" />
          <label>Hasta:</label>
          <input type="date" v-model="col.config.fechaFin" />
        </div>

        <div v-if="col.type === 'conjunto'" class="col-extra col-extra-stacked">
          <label>Valores (uno por línea):</label>
          <textarea v-model="col.config.valoresRaw" class="valores-input" rows="3" placeholder="Valor 1&#10;Valor 2&#10;Valor 3"></textarea>
        </div>
      </div>

      <button @click="addColumn" class="btn btn-add">+ Añadir columna</button>

      <div class="actions">
        <button @click="generate" class="btn btn-primary">Generar CSV</button>
      </div>
    </div>

    <div v-if="csvOutput" class="card">
      <h2>Resultado</h2>
      <div class="btn-group">
        <button @click="copy" class="btn">Copiar</button>
        <button @click="download" class="btn btn-secondary">Descargar</button>
      </div>
      <textarea v-model="csvOutput" class="textarea" rows="12" readonly></textarea>
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

.config-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.config-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555;
  font-weight: 500;
}

.input-sm {
  padding: 0.4rem 0.6rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
}

.input-sm:focus { border-color: #42b883; }

.history {
  margin-bottom: 0.5rem;
}

.hist-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0.6rem;
  margin-bottom: 0.3rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.82rem;
  color: #555;
  transition: all 0.15s;
}

.hist-item:hover {
  border-color: #42b883;
  background: #f0fdf4;
}

.hist-item.active {
  border-color: #42b883;
  background: #e8f8ef;
}

.hist-info {
  flex: 1;
}

.btn-icon-small {
  background: transparent;
  color: #999;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0 0.25rem;
}

.btn-icon-small:hover { color: #e74c3c; }

.col-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.2rem;
  border-bottom: 1px solid #eee;
  flex-wrap: wrap;
}

.col-row:last-child { border-bottom: none; }

.btn-icon {
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  width: 26px;
  height: 26px;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.btn-icon:hover { background: #c0392b; }

.col-name {
  padding: 0.4rem 0.6rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  width: 150px;
}

.col-name:focus { border-color: #42b883; }

.col-type {
  padding: 0.4rem 0.6rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  min-width: 180px;
}

.col-type:focus { border-color: #42b883; }

.col-extra {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: #555;
}

.col-extra select,
.col-extra input[type="date"] {
  padding: 0.3rem 0.5rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 0.85rem;
  outline: none;
}

.col-extra select:focus,
.col-extra input[type="date"]:focus { border-color: #42b883; }

.col-extra-stacked {
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.valores-input {
  width: 100%;
  padding: 0.4rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 0.85rem;
  outline: none;
  resize: vertical;
  font-family: monospace;
}

.valores-input:focus { border-color: #42b883; }

.btn-add {
  margin-top: 0.75rem;
}

.actions {
  margin-top: 1rem;
}

.btn {
  padding: 0.6rem 1rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
}

.btn:hover { background: #3aa876; }

.btn-outline {
  background: transparent;
  border: 2px solid #667eea;
  color: #667eea;
}

.btn-outline:hover {
  background: #667eea;
  color: white;
}

.btn-file {
  position: relative;
  overflow: hidden;
}

.btn-file input[type="file"] {
  position: absolute;
  left: 0; top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.btn-add {
  background: #667eea;
}

.btn-add:hover { background: #5a6fd6; }

.btn-primary {
  background: #42b883;
  font-size: 1rem;
  padding: 0.75rem 2rem;
}

.btn-secondary {
  background: #667eea;
}

.btn-secondary:hover { background: #5a6fd6; }

.btn-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.textarea {
  width: 100%;
  padding: 0.75rem;
  font-size: 0.8rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  outline: none;
  resize: vertical;
  font-family: monospace;
}

.textarea:focus { border-color: #42b883; }
</style>