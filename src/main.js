import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

import NavBar from './components/NavBar.vue';
import AlertBox from './components/AlertBox.vue';

const app = createApp(App);
app.component('NavBar', NavBar);
app.component('AlertBox', AlertBox);
app.mount('#app');
