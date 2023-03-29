import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import Vue3TouchEvents from "vue3-touch-events";
import store from '@/store';


createApp(App)
    .use(Vue3TouchEvents)
    .use(router)
    .use(store)
    .mount('#app')
