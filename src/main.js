import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'

import { router } from './router/router.js'

createApp(App)
    .use(Varlet)
    .use(router)
    .mount('#app')
