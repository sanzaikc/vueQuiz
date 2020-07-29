import axios from 'axios'

const state = {
    userList: [],
    token: localStorage.getItem('accessToken') || null, 

};
const mutations = {
    setUsers: (state, users) => {
        state.userList = users;
    }
};
const actions = {
    retrieveUsers: (context) => {
        return new Promise((resolve, reject)=>{
            axios.defaults.headers.common["Authorization"] = "Bearer " + context.state.token;
            axios.get('/users')
                    .then(res => {
                        let users = res.data.users;
                        context.commit("setUsers", users);
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