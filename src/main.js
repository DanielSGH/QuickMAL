import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

import NavBar from './components/NavBar.vue';
import AlertBox from './components/AlertBox.vue';
import MAL from './api/MAL.js';

const app = createApp(App);
app.component('NavBar', NavBar);
app.component('AlertBox', AlertBox);

app.config.globalProperties.mal = MAL;

app.mount('#app');
