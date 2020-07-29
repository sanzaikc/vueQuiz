import axios from 'axios';
import store from '../store'

const state = {
    categories: []
};
const mutations = {
    setCategories: (state, categories) => {
        state.categories = categories;
    }
};
const actions = {
    retrieveCategories: ({commit}) => {
        axios.defaults.headers.common['Authorization'] = "Bearer " + store.getters.fetchToken;
        return new Promise((resolve, reject) => {
            axios.get('/categories')
            .then(res=> {
                let categories = res.data.categories;
                commit('setCategories', categories);
                resolve(res);
            })
            .catch(error => {
                console.log(error.response.data);
                reject(error);
            })  
        });
    }
};
const getters = {
    fetchCategories: state => {
        return state.categories;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}