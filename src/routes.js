import Login from './pages/auth/Login.vue';
import Register from './pages/auth/Register.vue';
import Logout from './pages/auth/Logout.vue';
import Home from './pages/Home.vue';
import Welcome from './pages/Welcome.vue';

import store from './store/store'

function authGuard(to, from, next)
{
    var isAuthenticated= false;
    //this is just an example. You will have to find a better or 
    // centralised way to handle you localstorage data handling 
    if(store.getters.loggedIn)
    isAuthenticated = true;
    else
    isAuthenticated= false;
    
    if(isAuthenticated) 
    next(); // allow to enter route
    else
    next({name: 'login'}); // go to '/login';
}

function guestGuard(to, from, next)
{
    var isAuthenticated= false;
    
    if(store.getters.loggedIn)
    isAuthenticated = true;
    else
    isAuthenticated= false;

    if(!isAuthenticated) 
    next(); 
    else
    next({name: 'home'});
}

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
        beforeEnter: authGuard,
    },
    { 
        path: '/login', 
        component: Login, 
        name: 'login', 
        beforeEnter: guestGuard,
    },
    { 
        path: '/register', 
        component: Register, 
        name: 'register',
        beforeEnter: guestGuard,
    },
    { 
        path: '/logout', 
        component: Logout, 
        name: 'logout' 
    },
];

