import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import DniPage from '../pages/DniPage.vue'
import IbanPage from '../pages/IbanPage.vue'
import PersonasPage from '../pages/PersonasPage.vue'
import Base64Page from '../pages/Base64Page.vue'
import ImagenPage from '../pages/ImagenPage.vue'
import UuidPage from '../pages/UuidPage.vue'
import CsvPage from '../pages/CsvPage.vue'
import AboutPage from '../pages/AboutPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/dni', component: DniPage },
  { path: '/iban', component: IbanPage },
  { path: '/personas', component: PersonasPage },
  { path: '/base64', component: Base64Page },
  { path: '/base642img', component: ImagenPage },
  { path: '/uuid', component: UuidPage },
  { path: '/csv', component: CsvPage },
  { path: '/acerca-de', component: AboutPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router