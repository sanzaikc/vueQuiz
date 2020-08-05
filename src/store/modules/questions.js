import axios from "axios";
import store from "../store";

const state = {
	questionList: [],
};
const mutations = {};
const actions = {
	retriveQuestions: () => {},
	createQuestion: (context, question) => {
		let questionData = new FormData();
		questionData.append("body", question.body);
		questionData.append("category_id", question.category_id);

		for (var i = 0; i < question.options.length; i++) {
			questionData.append(`options[${i}]['body']`, question.options[i].body);
			questionData.append(
				`options[${i}]['correct']`,
				question.options[i].correct
			);
		}
		questionData.append("image", question.image);

		axios.defaults.headers.common["Authorization"] =
			"Bearer " + store.state.auth.token;
		axios.post("/questions", questionData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
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
