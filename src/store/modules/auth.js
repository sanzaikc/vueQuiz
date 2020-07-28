import axios from 'axios'

const state = {
    token: localStorage.getItem('accessToken') || null, 
    currentUser: localStorage.getItem('currentUser') || null,
};
const mutations = {
    retrieveToken: (state, token) => {
        state.token = token;
        localStorage.setItem('accessToken', token);
    },
    destroyToken: (state) => {
        state.token = null;
        localStorage.removeItem('accessToken');
    },
    setCurrentUser: (state, user) => {
        state.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    },
    removeUser: (state) => {
        state.currentUser = null;
        localStorage.removeItem('currentUser');
    }
};
const actions = {
    login: ({ commit }, credentials) => {
        return new Promise((resolve, reject)=>{
            axios.post('/login', credentials)
            .then(res => {
                let token = res.data.token;
                commit('retrieveToken', token);

                let user = res.data.user;
                commit('setCurrentUser', user);

                resolve(res);
            })
            .catch(error => {
                console.log(error.response.data);
                reject(error);
            });
        });
    },
    register: (context, credentials) => {
        return new Promise((resolve, reject)=>{
            axios.post('/register', credentials)
            .then(res => {
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
                    context.commit('destroyToken');
                    context.commit('removeUser');
                    resolve(res);
                })
                .catch(error => {
                    context.commit('destroyToken');
                    context.commit('removeUser');
                    reject(error);
                });
            });
        }   
    }
};
const getters = {
    loggedIn: state => {
        return state.token != null;
    },
    currentUser: state => {
        return state.currentUser;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};