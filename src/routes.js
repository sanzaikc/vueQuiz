import Welcome from './pages/Welcome.vue';
import store from './store/store';

function adminGuard(to, from, next) {
	if (store.getters.loggedIn && store.state.auth.currentUser.is_admin) next();
	else next({ name: "host.home" });
}

function disableGuard(to, from, next) {
	if (store.state.auth.currentUser.is_disabled) next({ name: "host" });
	else next();
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
		component: () => import(/* webpackChunkName: "login" */ './pages/auth/Login.vue'),
		props: true,
		meta: { guest: true },
	},
	{
		path: "/register",
		name: "register",
		component: () => import(/* webpackChunkName: "register" */ './pages/auth/Register.vue'),
		meta: { guest: true },
	},
	{
		path: "/logout",
		name: "logout",
		component: () => import(/* webpackChunkName: "logout" */ './pages/auth/Logout.vue'),
		meta: { auth: true }
	},
	{
		path: "/admin",
		name: "admin",
		component: () => import(/* webpackChunkName: "admin" */ './pages/admin/Admin.vue'),
		beforeEnter: adminGuard,
        meta: { auth: true },
        redirect: {
            name: 'admin.users'
        },
        children: [
            {
                path: 'users',
                name: 'admin.users',
				component: () => import(/* webpackChunkName: "login" */ './pages/admin/User.vue'),
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
		component: () => import(/* webpackChunkName: "login" */ './pages/host/Host.vue'),
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
				path: "quizzes",
				name: "host.quiz",
				beforeEnter: disableGuard,
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
					},
					{
						path:'startQuiz/:id',
						name: 'quiz.start',
						component: () => import( /* webpackChunkName: "hostQuiz" */ './pages/host/quiz/HostQuiz.vue')
					}
				]
			},
			{
				path: "question",
				name: "host.question",
				beforeEnter: disableGuard,
				component: ()=> import(/* webpackChunkName: "question" */ './pages/host/question/Question.vue')
			}
		]
	},
	{
		path: '/game',
		name: 'game',
		props: true,
		component: () => import(/* webpackChunkName: "game" */ './pages/Game.vue')
	}
];

