import axios from 'axios';
import store from '../store'



export default {
    state: {
        categoryList: [],
    },
    mutations: {
        SET_CATEGORIES: (state, categories) => {
            state.categoryList = categories;
        },
        ADD_CATEGORY: (state, category) => {
            state.categoryList = [category, ...state.categoryList];
        },
        REMOVE_CATEGORY :(state, category) => {
            let updatedList = state.categoryList.filter(q => q.id != category.id);
            state.categoryList = [...updatedList];
        }
    },
    actions: {
        retrieveCategories: ({commit}) => {
            // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            axios.defaults.headers.common["Authorization"] = "Bearer " + store.state.auth.token;
            return new Promise((resolve, reject) => {
                axios.get("/categories")
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
        },
        createCategory: ({commit}, category) => {
            axios.defaults.headers.common["Authorization"] = "Bearer " + store.state.auth.token;
            return new Promise((resolve, reject)=>{
                axios.post("/categories", category)
                .then(res => {
                    let newCategory = res.data.category;
                    commit('ADD_CATEGORY', newCategory);
                    resolve(res);
                })
                .catch(error => {
                    reject(error.response.data.errors.name);
                })
            });
        },
        deleteCategory: ({commit}, category) => {
            axios.defaults.headers.common["Authorization"] = "Bearer " + store.state.auth.token;
            if(confirm("Are you sure you want to delete?")){
                axios.delete("/categories/"+ category.id)
                .then(res => {
                    let cate = res.data.category;
                    commit("REMOVE_CATEGORY",cate)
                })
                .catch(error => {
                    console.log(error.response.data.errors.name);
                })
            }
        },

    },
}