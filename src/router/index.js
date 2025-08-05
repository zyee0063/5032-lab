import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import LogoutView from '../views/LogoutView.vue'
import AddBookView from '../views/AddBookView.vue'
import WeatherView from '../views/WeatherView.vue'   // ✅ 新增
import CountBookAPI         from '../views/CountBookAPI.vue'  // ✅ 新增

import { isAuthenticated } from '../stores/auth'

const routes = [
  { path: '/',      name: 'Home',        component: HomeView },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) {
        next('/login')
      } else {
        next()
      }
    }
  },
  { path: '/login',      name: 'Login',       component: LoginView },
  { path: '/FireLogin',   name: 'FireLogin',   component: FirebaseSigninView },
  { path: '/FireRegister',name: 'FireRegister',component: FirebaseRegisterView },
  { path: '/logout',     name: 'Logout',      component: LogoutView },
  { path: '/addbook',    name: 'AddBook',      component: AddBookView },
  { path: '/WeatherCheck', name: 'WeatherCheck', component: WeatherView }, // ✅ 新增天气页路由
  { path: '/CountBookAPI', name: 'CountBookAPI', component: CountBookAPI } // ✅ 新增
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
