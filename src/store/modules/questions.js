import axios from "axios";
import store from "../store";

const state = {
	questionList: [],
};
const mutations = {
    SET_QUESTION_LIST: (state, list) => {
        state.questionList = list;
    }
};
const actions = {
	retriveQuestions: ({commit}) => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + store.state.auth.token;
        axios.get('/questions')
            .then(res => {
                commit('SET_QUESTION_LIST', res.data.questions)
            })
    },
	createQuestion: (context, question) => {
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
                    resolve(res.data.question);
                })
                .catch(error => {
                    console.log(error.response.data.errors.body[0]);
                    reject(error.response.data);
                })
        });
	},
	removeQuestion: () => {},
	updateQuestion: () => {},
};
const getters = {};

export default {
	state,
	mutations,
	actions,
	getters,
};
