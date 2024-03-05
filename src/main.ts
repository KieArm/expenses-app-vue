import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import './assets/style.css'
import App from './App.vue'
import HomePage from './components/HomePage.vue'
import SettingsView from './components/SettingsView.vue'
import { store, key } from './store/store'

const router: any = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/settings', name: 'Settings', component: SettingsView }
  ]
})

const app = createApp(App)
app.use(store, key)
app.use(Toast)
app.use(router)
app.mount('#app')
