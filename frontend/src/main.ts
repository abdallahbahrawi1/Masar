import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Create the Vue app instance
const app = createApp(App)

// Use BootstrapVue and optionally install the BootstrapVue icon components plugin
// app.use(BootstrapVue)
// app.use(IconsPlugin)

// Mount the app instance to the '#app' element
app.use(router).mount('#app')
