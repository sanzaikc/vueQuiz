import Login from './components/Auth/Login.vue';
import Register from './components/Auth/Register.vue';
import Logout from './components/Auth/Logout.vue';
import Home from './components/Home.vue';

export const routes = [
    { path: '', component: Home, name: 'home' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/logout', component: Logout, name: 'logout' },
];