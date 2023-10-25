import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'

import { router } from './router/router.js'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia).use(Varlet).use(router).mount('#app')
