import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Homeview.vue'
import Paciente from '@/components/Paciente.vue'
import LoginPaciente from '@/components/LOGIN/LoginPaciente.vue'
import LoginPsicologo from '@/components/LOGIN/LoginPsicologo.vue'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: HomeView
  },
  {
    path: '/pacientes',
    name: 'Pacientes',
    component: Paciente           // aqui cambie la ruta aqui debo colocar mis rutas de mis demas archivos vue
  },
  {
    path: '/LoginPaciente',
    name: 'loginPaciente',
    component: LoginPaciente           
  },

  {
    path: '/LoginPsicologo',
    name: 'loginpsicologo',
    component: LoginPsicologo          
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
