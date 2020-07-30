import axios from 'axios'
import store from '../store'

const state = {
    userList: [],
};
const mutations = {
    SET_USERS: (state, users) => {
        state.userList = users;
    }
};
const actions = {
    retrieveUsers: ({commit}) => {
        return new Promise((resolve, reject)=>{
            axios.defaults.headers.common["Authorization"] = "Bearer " + store.state.auth.token;
            axios.get('/users')
                    .then(res => {
                        let users = res.data.users;
                        commit("SET_USERS", users);
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
};

export default {
    state,
    mutations,
    actions,
    getters
}