import axios from "axios";
import store from "../store";

const state = {
	questionList: [],
};
const mutations = {
    SET_QUESTION_LIST: (state, list) => {
        state.questionList = list;
    },
    ADD_QUESTION: (state, question) => {
        state.questionList = [question, ...state.questionList];
    },
    REMOVE_QUESTION: (state, question) => {
        let newList = state.questionList.filter(q => q.id != question.id);
        state.questionList = [...newList];
    }
};
const actions = {
	retriveQuestions: ({commit}) => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + store.state.auth.token;
        return new Promise((resolve, reject)=>{
            axios.get('/questions')
                .then(res => {
                    commit('SET_QUESTION_LIST', res.data.questions)
                    resolve(res.data);
                })
                .catch(error=> {
                    reject(error.response.data);
                });
        });
    },
	createQuestion: ({commit}, question) => {
		let questionData = new FormData();
		questionData.append("body", question.body);
		questionData.append("category_id", question.category_id);

		for (var i = 0; i < question.options.length; i++) {
			questionData.append(`options[${i}]['body']`, question.options[i].body);
			questionData.append(`options[${i}]['correct']`,question.options[i].correct);
		}
		questionData.append("image", question.image);

		return new Promise((resolve, reject)=>{
            axios.post("/questions", questionData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(res=>{
                    console.log(res.data);
                    let question = res.data.question;
                    commit('ADD_QUESTION', question);
                    resolve(res.data.question);
                })
                .catch(error => {
                    console.log(error.response.data.errors.body[0]);
                    reject(error.response.data);
                })
        });
	},
	deleteQuestion: ({commit}, id) => {
        return new Promise((resolve, reject) => {
           axios.delete('/questions/'+ id)
           .then(res=>{
               commit('REMOVE_QUESTION', res.data.question);            
               resolve(res.data.message);
           })
           .catch(error=>{
               reject(error.response.data);
           })
        })
       },
	updateQuestion: () => {},
};
const getters = {};

export default {
	state,
	mutations,
	actions,
	getters,
};
