import axios from 'axios'

const state = {
    token: localStorage.getItem('access_token') || null, 
    currentUser: {},
};
const mutations = {
    retrieveToken: (state, token) => {
        state.token = token;
    },
    destroyToken: (state) => {
        state.token = null;
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
    },
    logout: (context) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
        if(context.getters.loggedIn) {
            return new Promise((resolve, reject)=>{
                axios.post('/logout')
                .then(res => {
                    localStorage.removeItem('access_token');
                    context.commit('destroyToken');
                    resolve(res);
                })
                .catch(error => {
                    localStorage.removeItem('access_token');
                    context.commit('destroyToken');
                    reject(error);
                });
            });
        }   
    }
};
const getters = {
    loggedIn: state => {
        return state.token != null;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};