import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import users from './modules/users'
import categories from './modules/categories'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: [
        auth,
        users,
        categories
    ],
});