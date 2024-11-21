import './assets/css/main.css';

import { createApp } from 'vue'
import App from "./App.vue"
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from "./router/index.js";
import { createPinia } from 'pinia'
import VueLazyload from 'vue-lazyload'
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueLazyload, {
    preLoad: 1.3,
    error: 'https://via.placeholder.com/300',
    loading: 'https://via.placeholder.com/300',
    attempt: 1
})

app.mount('#app')