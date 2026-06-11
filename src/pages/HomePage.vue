<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function navigate(path) {
  router.push(path)
}

const features = [
  { path: '/dni', label: 'DNI', icon: '🪪', desc: 'Valida y genera DNIs españoles' },
  { path: '/iban', label: 'IBAN', icon: '💳', desc: 'Valida y genera IBANs internacionales' },
  { path: '/personas', label: 'Perfiles', icon: '👤', desc: 'Genera perfiles aleatorios' },
  { path: '/base64', label: 'Base64', icon: '🔐', desc: 'Codifica y decodifica Base64' },
  { path: '/base642img', label: 'Base64 / Imagen', icon: '🖼️', desc: 'Convierte imágenes a Base64 y viceversa' },
  { path: '/uuid', label: 'UUID', icon: '🔑', desc: 'Genera y valida UUIDs v4' },
  { path: '/csv', label: 'CSV', icon: '📊', desc: 'Genera CSVs con datos de ejemplo' }
]
</script>

<template>
  <div class="home">
    <div class="intro">
      <h1>Herramientas de Identificación</h1>
      <p class="tagline">Utilidades para generar y validar documentos de identificación</p>
    </div>

    <div class="features">
      <button 
        v-for="f in features" 
        :key="f.path"
        @click="navigate(f.path)"
        class="feature-card"
      >
        <span class="feature-icon">{{ f.icon }}</span>
        <span class="feature-label">{{ f.label }}</span>
        <span class="feature-desc">{{ f.desc }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  max-width: 600px;
}

.intro {
  text-align: center;
  margin-bottom: 2rem;
}

.intro h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.tagline {
  color: #666;
  margin-bottom: 1.5rem;
}


.features {
  display: grid;
  gap: 1rem;
}

.feature-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.feature-card:hover {
  border-color: #42b883;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.2);
}

.feature-icon {
  font-size: 2rem;
}

.feature-label {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.feature-desc {
  color: #666;
  font-size: 0.9rem;
}
</style>