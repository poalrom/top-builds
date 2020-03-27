import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import { initStore } from './store';

Vue.use(VueResource);

initStore();

new Vue(App).$mount('#root');