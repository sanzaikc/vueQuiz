import Login from './pages/auth/Login.vue';
import Register from './pages/auth/Register.vue';
import Logout from './pages/auth/Logout.vue';
import Home from './pages/Home.vue';
import Welcome from './pages/Welcome.vue';
import Admin from './pages/admin/Admin.vue';
import User from './pages/admin/User.vue';
import Category from './pages/admin/Category.vue';

import store from './store/store';

function adminGuard(to, from, next) {
	if (store.getters.loggedIn && store.getters.currentUser.is_admin) next();
	else next({ name: "home" });
}

export const routes = [
	{
		path: "",
		component: Welcome,
		name: "welcome",
		meta: { guest: true },
	},
	{
		path: "/login",
		component: Login,
		name: "login",
		props: true,
		meta: { guest: true },
	},
	{
		path: "/register",
		component: Register,
		name: "register",
		meta: { guest: true },
	},
	{
		path: "/logout",
		component: Logout,
		name: "logout",
	},
	{
		path: "/home",
		component: Home,
		name: "home",
		meta: { auth: true },
	},
	{
		path: "/admin",
		component: Admin,
		name: "admin",
		beforeEnter: adminGuard,
        meta: { auth: true },
        redirect: {
            name: 'admin.users'
        },
        children: [
            {
                path: 'users',
                component: User,
                name: 'admin.users'
            },
            {
                path: 'categories',
                component: Category,
                name: 'admin.categories'
            }
        ]
	},
];

