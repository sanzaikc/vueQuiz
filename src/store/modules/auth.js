import axios from 'axios'

const state = {
    token: localStorage.getItem('access_token') || null, 
    currentUser: {},
};
const mutations = {
    retrieveToken: (state, token) => {
        state.token = token;
    }
};
const actions = {
    login: ({ commit }, credentials) => {
        return new Promise((resolve, reject)=>{
            axios.post('/login', credentials)
            .then(res => {
                let token = res.data.token;
                localStorage.setItem('access_token', token);
                commit('retrieveToken', token);
                resolve(res);
            })
            .catch(error => {
                console.log(error.response.data);
                reject(error);
            });
        });
    }
};
const getters = {
    
};

export default {
    state,
    mutations,
    actions,
    getters
};