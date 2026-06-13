<script setup>
const prompts = [
  'Crea un proyecto Vue con Vite',
  'Añade validación y generación de DNI español con letra',
  'Añade sección IBAN con validador ISO 7064 MOD 97 y generador',
  'Añade menú lateral con navegación',
  'Añade generador de perfiles aleatorios con nombre, DNI, IBAN y BIC',
  'Elimina padding y max-width de #app',
  'Build de producción',
  'Añade sección de decodificación Base64',
  'Añade página de inicio con badge de IA',
  'Quita el badge de IA de la página de inicio',
  'Añade imagen a Base64 y viceversa',
  'Añade generador y validador de UUIDs v4',
  'Añade generador de CSVs con tipos de campo configurables',
  'Añade tipos Vacío, Conjunto limitado y UUID al CSV',
  'Guarda historial de configuraciones CSV en localStorage',
  'Exporta e importa configuración CSV como JSON',
  'Rediseño completo con Material Design 3',
  'Añade sección Acerca de con enlaces y resumen de prompts'
]
</script>

<template>
  <div>
    <div class="card">
      <h2>Acerca de</h2>
      <p class="p">Aplicación desarrollada íntegramente con inteligencia artificial generativa.</p>
      <p class="p">
        Repositorio:
        <a href="https://github.com/vzenix/ia-test-vite" target="_blank" rel="noopener">github.com/vzenix/ia-test-vite</a>
      </p>
      <p class="p">
        Creador:
        <a href="https://vzenix.es" target="_blank" rel="noopener">vzenix.es</a>
      </p>
    </div>

    <div class="card">
      <h2>Resumen de prompts utilizados</h2>
      <div class="prompt-list">
        <div v-for="(p, i) in prompts" :key="i" class="prompt-item">
          <span class="prompt-num">{{ i + 1 }}</span>
          <span class="prompt-text">{{ p }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card { background: var(--md-surface); padding: 16px; border-radius: var(--md-radius-sm); box-shadow: var(--md-elevation-1); margin-bottom: 12px; }
h2 { font-size: 0.9rem; margin-bottom: 10px; color: var(--md-on-surface-variant); }
.p { font-size: 0.85rem; margin-bottom: 8px; line-height: 1.5; }
.p a { color: var(--md-primary); text-decoration: none; font-weight: 500; }
.p a:hover { text-decoration: underline; }
.prompt-list { display: flex; flex-direction: column; gap: 3px; }
.prompt-item { display: flex; gap: 8px; font-size: 0.82rem; padding: 3px 0; border-bottom: 1px solid var(--md-outline-variant); }
.prompt-item:last-child { border-bottom: none; }
.prompt-num { color: var(--md-primary); font-weight: 700; min-width: 20px; }
.prompt-text { color: var(--md-on-surface); }
</style>