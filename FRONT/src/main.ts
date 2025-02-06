import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Importar Vue Toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);


// Usar los plugins
app.use(createPinia());
app.use(router);
app.use(Toast);

app.mount('#app');
