import Vue from 'vue';
import VueRouter from 'vue-router'
import {routes} from './routes'
import store from './store/store'

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
		if (!store.getters.loggedIn) {
			next({
				path: "/login",
			});
		} else {
			next();
		}
	} else if (to.matched.some((record) => record.meta.guest)) {
		if (store.getters.loggedIn) {
			if (store.getters.currentUser.is_admin)
				next({
					path: "/admin",
				});
			else
				next({
					path: "/home",
				});
		} else {
			next();
		}
	} else {
		next();
	}
})