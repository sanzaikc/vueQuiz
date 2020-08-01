import Login from './pages/auth/Login.vue';
import Register from './pages/auth/Register.vue';
import Logout from './pages/auth/Logout.vue';
import Home from './pages/Home.vue';
import Welcome from './pages/Welcome.vue';
import Admin from './pages/admin/Admin.vue';
import User from './pages/admin/User.vue';
// import Categories from './pages/admin/Categories.vue';

import store from './store/store';

function adminGuard(to, from, next) {
	if (store.getters.loggedIn && store.state.auth.currentUser.is_admin) next();
	else next({ name: "home" });
}

export const routes = [
	{
		path: "",
		name: "welcome",
		component: Welcome,
		meta: { guest: true },
	},
	{
		path: "/login",
		name: "login",
		component: Login,
		props: true,
		meta: { guest: true },
	},
	{
		path: "/register",
		name: "register",
		component: Register,
		meta: { guest: true },
	},
	{
		path: "/logout",
		name: "logout",
		component: Logout,
	},
	{
		path: "/home",
		component: Home,
		name: "home",
		meta: { auth: true },
	},
	{
		path: "/admin",
		name: "admin",
		component: Admin,
		beforeEnter: adminGuard,
        meta: { auth: true },
        redirect: {
            name: 'admin.users'
        },
        children: [
            {
                path: 'users',
                name: 'admin.users',
                component: User,
            },
            {
                path: 'categories',
				name: 'admin.categories',
                component: ()=> import(/* webpackChunkName: "categories" */ './pages/admin/Categories.vue'),
            }
        ]
	},
];

