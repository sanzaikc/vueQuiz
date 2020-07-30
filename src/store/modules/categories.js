import axios from 'axios';
import store from '../store'



export default {
    state: {
        categoryList: [],
    },
    mutations: {
        SET_CATEGORIES: (state, categories) => {
            state.categoryList = categories;
        }
    },
    actions: {
        retrieveCategories: ({commit}) => {
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            axios.defaults.headers.common["Authorization"] = "Bearer " + store.state.auth.token;
            return new Promise((resolve, reject) => {
                axios.get('/categories')
                .then(res=> {
                    let categories = res.data.categories;
                    commit('SET_CATEGORIES', categories);
                    resolve(res);
                })
                .catch(error => {
                    console.log(error.response.data);
                    reject(error);
                })  
            });
        }
    },
}