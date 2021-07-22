import { createApp } from 'vue'
import mitt from 'mitt'
import App from './App.vue'
import store from './store'

const app = createApp(App)
app.use(store)

const emitter = mitt()
app.config.globalProperties.emitter = emitter

app.mount('#app')