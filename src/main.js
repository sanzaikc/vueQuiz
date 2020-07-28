import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";

import VueRouter from 'vue-router'
import {routes} from './routes'
import store from './store/store'

import Axios from 'axios'
Axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

import { ValidationObserver, ValidationProvider, extend, localize } from "vee-validate";

// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
localize("en", en);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
