<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const features = [
  { path: '/dni', label: 'DNI', icon: '🪪', desc: 'Valida y genera DNIs' },
  { path: '/iban', label: 'IBAN', icon: '💳', desc: 'Valida y genera IBANs' },
  { path: '/personas', label: 'Perfiles', icon: '👤', desc: 'Perfiles aleatorios' },
  { path: '/base64', label: 'Base64', icon: '🔐', desc: 'Codifica y decodifica' },
  { path: '/base642img', label: 'Base64 / Imagen', icon: '🖼️', desc: 'Imagen a Base64' },
  { path: '/uuid', label: 'UUID', icon: '🔑', desc: 'Genera y valida UUIDs' },
  { path: '/csv', label: 'CSV', icon: '📊', desc: 'Genera CSVs de ejemplo' },
  { path: '/json', label: 'JSON', icon: '📋', desc: 'Prettifica y colorea JSON' }
]
</script>

<template>
  <div class="home">
    <h2>Herramientas de identificación</h2>
    <p class="sub">Utilidades rápidas para generar y validar documentos</p>

    <div class="grid">
      <button v-for="f in features" :key="f.path" @click="router.push(f.path)" class="card-btn">
        <span class="card-icon">{{ f.icon }}</span>
        <div>
          <div class="card-label">{{ f.label }}</div>
          <div class="card-desc">{{ f.desc }}</div>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.home { width: 100%; }

.sub {
  font-size: 0.85rem;
  color: var(--md-on-surface-variant);
  margin-bottom: 16px;
}

.grid {
  display: grid;
  gap: 8px;
}

.card-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: var(--md-surface);
  border: 1px solid var(--md-outline-variant);
  border-radius: var(--md-radius-sm);
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
}

.card-btn:hover {
  border-color: var(--md-primary);
  box-shadow: var(--md-elevation-1);
}

.card-icon { font-size: 1.5rem; }

.card-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--md-on-surface);
}

.card-desc {
  font-size: 0.78rem;
  color: var(--md-on-surface-variant);
}
</style>