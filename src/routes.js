import Welcome from './pages/Welcome.vue';
import Login from './pages/auth/Login.vue';
import Register from './pages/auth/Register.vue';
import Logout from './pages/auth/Logout.vue';
import Admin from './pages/admin/Admin.vue';
import User from './pages/admin/User.vue';
import Host from './pages/host/Host.vue';
// import Categories from './pages/admin/Categories.vue';

import store from './store/store';

function adminGuard(to, from, next) {
	if (store.getters.loggedIn && store.state.auth.currentUser.is_admin) next();
	else next({ name: "host.home" });
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
		meta: { auth: true }
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
	{
		path: "/host",
		name: "host",
		component: Host,
		meta: { auth: true },
		redirect: {
			name: 'host.home'
		},
		children: [
			{
				path: "home",
				name: "host.home",
				component: ()=> import(/* webpackChunkName: "home" */ './pages/host/Home.vue'),
			},
			{
				path: "quiz",
				name: "host.quiz",
				component:()=> import(/* webpackChunkName: "quiz" */ './pages/host/quiz/Quiz.vue'),
				redirect: {
					name: 'quizzes'
				},
				children: [
					{
						path: '',
						name: 'quizzes',
						component: ()=> import(/* webpackChunkName: "quizzes" */ './pages/host/quiz/Quizzes.vue')
					},
					{
						path: ':id',
						name: 'quizDetail',
						component: ()=> import(/* webpackChunkName: "quizDetail" */ './pages/host/quiz/QuizDetail.vue')
					}
				]
			},
			{
				path: "question",
				name: "host.question",
				component: ()=> import(/* webpackChunkName: "question" */ './pages/host/question/Question.vue')
			}
		]
	},
];

