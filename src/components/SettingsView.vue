<template>
  <h2>Settings</h2>
  <div class="container">
    <button class="btn-clear" @click="clearLocalStorage()">Delete saved data</button>
    <button class="btn" @click="onToggle()">
      {{ store.state.chart ? 'Hide Chart' : 'Show Chart' }}
    </button>
  </div>
  <button class="btn-green" @click="$router.push('/')">Done</button>
  <div class="container">
    <h3>About</h3>
    <p>This app was built with Vue 3, composition API, Vue router, Vuex and local storage.</p>
    <h3>Packages</h3>
    <div class="list-style-none">
      <li>
        <span>
          Charts - <a href="https://www.npmjs.com/package/chart.js">chart.js</a> and
          <a href="https://www.npmjs.com/package/vue-chartjs">vue-chartjs</a>
        </span>
      </li>
      <li>
        <span>
          Notifications - <a href="https://www.npmjs.com/package/react-toastify">React-Toastify</a>
        </span>
      </li>
      <li>
        <span> Unique ID - <a href="https://www.npmjs.com/package/uuid">uuid</a> </span>
      </li>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { useStore } from '../store/store'

const store = useStore()
const toast = useToast()

const onToggle = () => {
  const toggle = !store.state.chart
  toast.success(`Chart ${store.state.chart ? 'disabled' : 'enabled'}`)
  store.commit('toggleChart', toggle)
}
// Clear local storage
const clearLocalStorage = () => {
  localStorage.clear()
  toast.success('All saved data deleted')
}
</script>
