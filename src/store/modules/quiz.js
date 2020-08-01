import axios from 'axios';
import store from '../store';

const state = {
    quizList: [],
};
const mutations = {
    SET_QUIZ_LIST: (state, list) => {
        state.quizList = list;
    },
    ADD_QUIZ: (state, quiz) => {
        state.quizList = [quiz, ...state.quizList]
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
    
        let quizData = new FormData();
        quizData.append('name', quiz.name);
        quizData.append('description', quiz.description);
        quizData.append('image', quiz.img);

              
        axios.post('/quizzes', quizData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log(res);
            let quiz = res.data.quiz;
            commit('ADD_QUIZ', quiz);
        })
        .catch(error => {
            console.log(error.response.data);
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