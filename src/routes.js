import Login from './components/Auth/Login.vue';
import Register from './components/Auth/Register.vue';
import Logout from './components/Auth/Logout.vue';
import Home from './components/Home.vue';
import Welcome from './components/Welcome.vue';

export const routes = [
    { 
        path: '', 
        component: Welcome, 
        name: 'welcome', 
    },
    { 
        path: '/home', 
        component: Home, 
        name: 'home', 
        meta: { requiresAuth: true } 
    },
    { 
        path: '/login', 
        component: Login, 
        name: 'login', 
        meta: { requiresVisitor: true } 
    },
    { 
        path: '/register', 
        component: Register, 
        name: 'register',
         meta: { requiresVisitor: true } 
        },
    { 
        path: '/logout', 
        component: Logout, 
        name: 'logout' 
    },
];