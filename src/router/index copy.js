import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import LogoutView from '../views/LogoutView.vue' // ✅ 新增 Logout 页

import { isAuthenticated } from '../stores/auth'

import AddBookView from '../views/AddBookView.vue' // ✅ 添加此行



const routes = [
  { path: '/', name: 'Home', component: HomeView },
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
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/FireLogin', name: 'FireLogin', component: FirebaseSigninView },
  { path: '/FireRegister', name: 'FireRegister', component: FirebaseRegisterView },
  { path: '/logout', name: 'Logout', component: LogoutView }, // ✅ 新增
  { path: '/addbook', name: 'AddBook', component: AddBookView },// ✅ 添加此行

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
