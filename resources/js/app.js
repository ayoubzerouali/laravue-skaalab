import "./bootstrap";

import { createApp } from "vue";

import App from "./App.vue";
import router from "./router/index.js";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";

const app = createApp(App);
app.use(createPinia());
app.use(router).use(PrimeVue).mount("#app");
