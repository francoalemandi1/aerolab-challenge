import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import axios from 'axios'
import VueAxios from 'vue-axios';
import store from './store';

import mitt from 'mitt';                  // Import mitt
const emitter = mitt(); 

const app = createApp(App)
  app.use(VueAxios, axios)
  app.provide('emitter', emitter); 
  app.use(store)
  app.mount('#app')
