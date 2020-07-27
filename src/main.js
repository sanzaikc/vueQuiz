import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueRouter from 'vue-router'
import {routes} from './routes'

import Axios from 'axios'

import store from './store/store'

Axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});

// Navigation Guard 
router.beforeEach((to, from, next) => {
  // this route requires auth, check if loggedIn 
  // if not, redirect to login 
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!store.getters.loggedIn){
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      });
    }else{
      next();
    }
  }else if(to.matched.some(record => record.meta.requiresVisitor)){
    if(store.getters.loggedIn){
      next({
        name: 'home',
        query: { redirect: to.fullPath }
      });
    }else{
       next();
    }
  }
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
