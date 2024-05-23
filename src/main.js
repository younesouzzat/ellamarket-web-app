import { createApp } from "vue";

// App
import App from "./App.vue";

// Router
import router from "./routes/indexRoutes";

// font
import "@fortawesome/fontawesome-free/css/all.min.css";

// Tailwind
import './style.css';

// Store
import { store } from "./store/indexStore";

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Pinia
import { createPinia } from "pinia";

// Emitter
import mitt from "mitt";
const Emitter = mitt();

// Swiper config
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)
  .use(createPinia())
  .provide("Emitter", Emitter)
  .mount("#app");
