import axios from 'axios'
import store from '../store'

const state = {
    userList: [],
};
const mutations = {
    setUsers: (state, users) => {
        state.userList = users;
    }
};
const actions = {
    retrieveUsers: ({commit}) => {
        return new Promise((resolve, reject)=>{
            axios.defaults.headers.common["Authorization"] = "Bearer " + store.getters.fetchToken;
            axios.get('/users')
                    .then(res => {
                        let users = res.data.users;
                        commit("setUsers", users);
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
    fetchUsers: (state )=> {
        return state.userList;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}