import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import DniPage from '../pages/DniPage.vue'
import IbanPage from '../pages/IbanPage.vue'
import PersonasPage from '../pages/PersonasPage.vue'
import Base64Page from '../pages/Base64Page.vue'
import ImagenPage from '../pages/ImagenPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/dni', component: DniPage },
  { path: '/iban', component: IbanPage },
  { path: '/personas', component: PersonasPage },
  { path: '/base64', component: Base64Page },
  { path: '/base642img', component: ImagenPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router