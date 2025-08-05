import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// ❌ 不再需要：import { initializeApp } from 'firebase/app'
// ✅ firebase 初始化已移入 src/firebase/init.js
import './firebase/init.js'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
app.mount('#app')
