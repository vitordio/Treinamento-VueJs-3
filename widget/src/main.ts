import { createApp } from 'vue'
import { setup } from './utils/bootstrap'

import App from './App.vue'
import Playground from './views/Playground/index.vue'

import '@/assets/css/tailwind.css'
import '@/assets/css/font.css'
import 'animate.css'

setup({
  onProduction: () => {
    createApp(App).mount('#app')
  },

  onDevelopment: () => {
    createApp(Playground).mount('#app')
  }
})
