import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import users from './modules/users'
import categories from './modules/categories'
import quiz from './modules/quiz'
import questions from './modules/questions'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        users,
        categories,
        quiz,
        questions
    },
});