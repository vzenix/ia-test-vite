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
  if (cfg) { setConfig(cfg); selectedHistory.value = index }
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
      col.config.valores = (col.config.valoresRaw || '').split('\n').map(s => s.trim()).filter(Boolean)
    }
  }
  csvOutput.value = buildCSV(rows.value, separator.value, columns)
  saveToHistory()
}

function download() {
  const blob = new Blob([csvOutput.value], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = fileName.value + '.csv'; a.click()
  URL.revokeObjectURL(url)
}

function copy() { navigator.clipboard.writeText(csvOutput.value) }

function addColumn() {
  columns.push({ name: 'col' + (columns.length + 1), type: 'lorem_ipsum', config: {} })
}

function removeColumn(index) { columns.splice(index, 1) }

function exportConfig() {
  const json = JSON.stringify(getConfig(), null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'csv-config.json'; a.click()
  URL.revokeObjectURL(url)
}

function importConfigFromFile(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => { try { setConfig(JSON.parse(reader.result)) } catch { alert('JSON inválido') } }
  reader.readAsText(file)
}

function importFromPaste() {
  try { setConfig(JSON.parse(importJson.value)); showImportInput.value = false; importJson.value = '' }
  catch { alert('JSON inválido') }
}
</script>

<template>
  <div>
    <div class="card">
      <div class="row">
        <label class="fl">Filas <input type="number" v-model.number="rows" min="1" max="10000" class="fi" style="width:64px" /></label>
        <label class="fl">Sep. <select v-model="separator" class="fi"><option value=";">(;)</option><option value=",">(,)</option></select></label>
        <label class="fl">Archivo <input v-model="fileName" class="fi" style="width:90px" /></label>
        <button @click="exportConfig" class="btn-outline">Exportar</button>
        <label class="btn-outline btn-file">Importar<input type="file" accept=".json" @change="importConfigFromFile" /></label>
        <button @click="showImportInput = !showImportInput" class="btn-outline">Pegar</button>
      </div>
      <textarea v-if="showImportInput" v-model="importJson" class="ft" rows="2" placeholder="Pega el JSON..."></textarea>
      <button v-if="showImportInput" @click="importFromPaste" class="btn mt-sm">Cargar</button>
    </div>

    <div v-if="history.length" class="card">
      <div v-for="(item, i) in history" :key="i" :class="['hist', { active: selectedHistory === i }]" @click="loadConfig(i)">
        <span>{{ item.columns.length }} col · {{ item.rows }} filas — {{ new Date(item.savedAt).toLocaleString() }}</span>
        <button class="del" @click.stop="deleteHistoryItem(i)">&times;</button>
      </div>
    </div>

    <div class="card">
      <div v-for="(col, i) in columns" :key="i" class="col-row">
        <button class="del" @click="removeColumn(i)">&times;</button>
        <input v-model="col.name" class="fi" style="width:100px" />
        <select v-model="col.type" class="fi" style="min-width:150px">
          <option v-for="t in COLUMN_TYPES" :key="t.value" :value="t.value">{{ t.label }}</option>
        </select>
        <div v-if="typesWithProvincia.includes(col.type)" class="cx">
          <select v-model="col.config.provincia" class="fi xs">
            <option value="">Todas</option>
            <option v-for="p in PROVINCIAS" :key="p.code" :value="p.code">{{ p.name }}</option>
          </select>
        </div>
        <div v-if="col.type === 'fecha'" class="cx">
          <input type="date" v-model="col.config.fechaInicio" class="fi xs" />
          <input type="date" v-model="col.config.fechaFin" class="fi xs" />
        </div>
        <div v-if="col.type === 'conjunto'" class="cx" style="flex:1;min-width:120px">
          <textarea v-model="col.config.valoresRaw" class="ft" rows="2" placeholder="Valor 1&#10;Valor 2"></textarea>
        </div>
      </div>
      <button @click="addColumn" class="btn tonal mt-sm">+ Añadir columna</button>
      <button @click="generate" class="btn mt-sm" style="margin-left:6px">Generar CSV</button>
    </div>

    <div v-if="csvOutput" class="card">
      <div class="btn-row">
        <button @click="copy" class="btn tonal">Copiar</button>
        <button @click="download" class="btn">Descargar</button>
      </div>
      <textarea v-model="csvOutput" class="ft mono" rows="10" readonly></textarea>
    </div>
  </div>
</template>

<style scoped>
.card { background: var(--md-surface); padding: 14px 16px; border-radius: var(--md-radius-sm); box-shadow: var(--md-elevation-1); margin-bottom: 10px; }
.row { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.fl { display: flex; align-items: center; gap: 4px; font-size: 0.82rem; color: var(--md-on-surface-variant); }
.fi { padding: 6px 8px; font-size: 0.82rem; border: 1px solid var(--md-outline); border-radius: 6px; outline: none; }
.fi:focus { border-color: var(--md-primary); }
.xs { width: auto; font-size: 0.78rem; }
.ft { width: 100%; padding: 6px 8px; font-size: 0.8rem; border: 1px solid var(--md-outline); border-radius: 6px; outline: none; resize: vertical; }
.ft:focus { border-color: var(--md-primary); }
.mono { font-family: monospace; }
.col-row { display: flex; align-items: center; gap: 6px; padding: 5px 0; border-bottom: 1px solid var(--md-outline-variant); flex-wrap: wrap; }
.col-row:last-child { border-bottom: none; }
.cx { display: flex; align-items: center; gap: 4px; }
.btn { padding: 6px 12px; background: var(--md-primary); color: var(--md-on-primary); border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.8rem; }
.btn:hover { opacity: 0.9; }
.btn.tonal { background: var(--md-primary-container); color: var(--md-on-primary-container); }
.btn-outline { padding: 6px 12px; background: transparent; border: 1px solid var(--md-secondary); color: var(--md-secondary); border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.78rem; white-space: nowrap; }
.btn-outline:hover { background: var(--md-secondary); color: var(--md-on-secondary); }
.btn-file { position: relative; overflow: hidden; }
.btn-file input[type="file"] { position: absolute; left:0; top:0; opacity:0; width:100%; height:100%; cursor:pointer; }
.btn-row { display: flex; gap: 6px; margin-bottom: 8px; }
.del { background: transparent; border: none; color: var(--md-error); font-size: 1.1rem; cursor: pointer; padding: 0 2px; }
.hist { display: flex; align-items: center; justify-content: space-between; padding: 5px 8px; border: 1px solid var(--md-outline-variant); border-radius: 6px; cursor: pointer; font-size: 0.78rem; color: var(--md-on-surface-variant); margin-bottom: 3px; }
.hist:hover, .hist.active { border-color: var(--md-primary); background: var(--md-primary-container); }
.mt-sm { margin-top: 8px; }
</style>