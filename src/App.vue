<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

function navigate(path) {
  router.push(path)
}

const navItems = [
  { path: '/', label: 'Inicio', icon: '🏠' },
  { path: '/dni', label: 'DNI', icon: '🪪' },
  { path: '/iban', label: 'IBAN', icon: '💳' },
  { path: '/personas', label: 'Perfiles', icon: '👤' },
  { path: '/base64', label: 'Base64', icon: '🔐' },
  { path: '/base642img', label: 'Base64 / Imagen', icon: '🖼️' },
  { path: '/uuid', label: 'UUID', icon: '🔑' }
]
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <h2 class="logo">Herramientas</h2>
      <nav class="nav">
        <button 
          v-for="item in navItems" 
          :key="item.path"
          @click="navigate(item.path)" 
          :class="['nav-btn', { active: route.path === item.path }]"
        >
          <span class="icon">{{ item.icon }}</span>
          <span class="label">{{ item.label }}</span>
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
        <router-view />
      </div>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
}

.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 200px;
  background: #2c3e50;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.logo {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  color: #a0aec0;
  text-align: left;
  transition: all 0.2s;
}

.nav-btn:hover {
  background: #34495e;
  color: white;
}

.nav-btn.active {
  background: #42b883;
  color: white;
}

.icon {
  font-size: 1.2rem;
}

.label {
  font-weight: 500;
}

.main {
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.container {
  max-width: 100%;
  width: 100%;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}
</style>