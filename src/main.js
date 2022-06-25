import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import routes from './router/routes.js';
import './assets/tailwind.css'

import NavBar from './components/NavBar.vue';
import AlertBox from './components/AlertBox.vue';
import MAL from './api/MAL.js';


const router = createRouter({
  history: createWebHistory(),
  routes,
})


const app = createApp(App);
app.component('NavBar', NavBar);
app.component('AlertBox', AlertBox);

app.config.globalProperties.mal = MAL;

app.use(router);
app.mount('#app');
