import axios from 'axios';
import store from '../store';

const state = {
    quizList: [],
    quizDetail: {},
};
const mutations = {
    SET_QUIZ_LIST: (state, list) => {
        state.quizList = list;
    },
    ADD_QUIZ: (state, quiz) => {
        state.quizList = [quiz, ...state.quizList]
    },
    REMOVE_QUIZ: (state, quiz) => {
        let newList = state.quizList.filter(q => q.id != quiz.id);
        state.quizList = [...newList];
    },
    QUIZ_DETAIL: (state, id) => {
        state.quizDetail = state.quizList.find(q => q.id == id);
    }
};
const actions = {
    retrieveQuiz: ({commit}) => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + store.state.auth.token;
        return new Promise((resolve, reject)=> {
            axios.get('/quizzes')
            .then(res => {
                let quizzes = res.data.quizzes;
                commit('SET_QUIZ_LIST', quizzes);
                resolve(res.data.quizzes);
            })
            .catch(error => {
                // console.log(error.response.data);
                reject(error.response.data);
            });
        });
    },
    createQuiz: ( {commit}, quiz) => {   
        console.log(quiz);
        let quizData = new FormData();
        quizData.append('name', quiz.name);
        quizData.append('description', quiz.description);
        quizData.append('image', quiz.image);
      
        return new Promise((resolve, reject) => {
            axios.post('/quizzes', quizData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                let quiz = res.data.quiz;
                commit('ADD_QUIZ', quiz);
                resolve(res.data.quiz);
            })
            .catch(error => {
                reject(error.response.data.errors.name)
            })
        });
    },
    retreiveDetail: ({commit}, id) => {
        commit('QUIZ_DETAIL', id);
    },
    deleteQuiz: ({commit}, id) => {
     return new Promise((resolve, reject) => {
        axios.delete('/quizzes/'+ id)
        .then(res=>{
            commit('REMOVE_QUIZ', res.data.quiz);            
            resolve(res.data.message);
        })
        .catch(error=>{
            reject(error.response.data);
        })
     })
    },
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters,
}