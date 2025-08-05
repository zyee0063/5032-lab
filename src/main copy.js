import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import { initializeApp } from 'firebase/app'

// ✅ 从 Firebase 控制台粘贴你的配置对象
const firebaseConfig = {
  apiKey: "AIzaSyDOhIanWN8ziS9y2xGrL0-ZRtxhALR_7fw",
  authDomain: "fit5032-lab7-5676b.firebaseapp.com",
  projectId: "fit5032-lab7-5676b",
  storageBucket: "fit5032-lab7-5676b.firebasestorage.app",
  messagingSenderId: "705717394327",
  appId: "1:705717394327:web:f1c8327d82b787a81602d2"
}

// ✅ 初始化 Firebase
initializeApp(firebaseConfig)

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
app.mount('#app')
