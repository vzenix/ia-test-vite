<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const navItems = [
  { path: '/', label: 'Inicio', icon: '🏠' },
  { path: '/dni', label: 'DNI', icon: '🪪' },
  { path: '/iban', label: 'IBAN', icon: '💳' },
  { path: '/personas', label: 'Perfiles', icon: '👤' },
  { path: '/base64', label: 'Base64', icon: '🔐' },
  { path: '/base642img', label: 'Base64 / Imagen', icon: '🖼️' },
  { path: '/uuid', label: 'UUID', icon: '🔑' },
  { path: '/csv', label: 'CSV', icon: '📊' }
]

const bottomItems = [
  { path: '/acerca-de', label: 'Acerca de', icon: 'ℹ️' }
]
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="sidebar-head">Herramientas</div>
      <nav class="nav">
        <button
          v-for="item in navItems"
          :key="item.path"
          @click="router.push(item.path)"
          :class="['nav-btn', { active: route.path === item.path }]"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </button>
      </nav>
      <div class="spacer"></div>
      <nav class="nav">
        <button
          v-for="item in bottomItems"
          :key="item.path"
          @click="router.push(item.path)"
          :class="['nav-btn', { active: route.path === item.path }]"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </button>
      </nav>
    </aside>
    <main class="main">
      <div class="container">
        <h1 v-if="route.path === '/dni'">DNI</h1>
        <h1 v-else-if="route.path === '/iban'">IBAN</h1>
        <h1 v-else-if="route.path === '/personas'">Perfiles</h1>
        <h1 v-else-if="route.path === '/base64'">Base64</h1>
        <h1 v-else-if="route.path === '/base642img'">Base64 / Imagen</h1>
        <h1 v-else-if="route.path === '/uuid'">UUID</h1>
        <h1 v-else-if="route.path === '/csv'">Generador de CSVs</h1>
        <h1 v-else-if="route.path === '/acerca-de'">Acerca de</h1>
        <router-view />
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 180px;
  background: var(--md-surface);
  border-right: 1px solid var(--md-outline-variant);
  padding: 12px;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar-head {
  font-size: 1rem;
  font-weight: 700;
  padding: 8px 12px;
  margin-bottom: 8px;
  color: var(--md-primary);
  letter-spacing: 0.01em;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.spacer {
  flex: 1;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: var(--md-radius-sm);
  cursor: pointer;
  font-size: 0.85rem;
  color: var(--md-on-surface-variant);
  text-align: left;
  transition: all 0.15s;
}

.nav-btn:hover {
  background: var(--md-surface-dim);
  color: var(--md-on-surface);
}

.nav-btn.active {
  background: var(--md-primary-container);
  color: var(--md-on-primary-container);
  font-weight: 600;
}

.nav-icon { font-size: 1.1rem; }

.main {
  flex: 1;
  padding: 24px;
  display: flex;
  justify-content: center;
  min-width: 0;
}

.container {
  max-width: 100%;
  width: 720px;
}

h1 {
  margin-bottom: 16px;
  color: var(--md-on-surface);
}
</style>