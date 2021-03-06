import axios from "axios";

const state = {
    token: localStorage.getItem('accessToken') || null, 
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
};
const mutations = {
	RETRIEVE_TOKEN: (state, token) => {
		state.token = token;
		localStorage.setItem("accessToken", token); 
	},
	DESTROY_TOKEN: (state) => {
		state.token = null; 
		localStorage.removeItem("accessToken"); 
	},
	SET_CURRENT_USER: (state, user) => {
		state.currentUser = user; 
		localStorage.setItem("currentUser", JSON.stringify(user)); 
	},
	REMOVE_USER: (state) => {
		state.currentUser = null; 
		localStorage.removeItem("currentUser"); 
	},
};
const actions = {
	restoreToken: (context) => {
		let token = localStorage.getItem("accessToken");
		if (token) {
			axios.defaults.headers.common["Authorization"] = "Bearer " + token;
			return new Promise((resolve, reject) => {
				axios
					.get("/users/me")
					.then((res) => {
						let user = res.data.user;
						context.commit("SET_CURRENT_USER", user);

						resolve(res);
					})
					.catch((error) => {
						context.commit("DESTROY_TOKEN");
						context.commit("REMOVE_USER");
						reject(error);
					});
			});
		}
	},
	login: ({ commit }, credentials) => {
		return new Promise((resolve, reject) => {
			axios
				.post("/login", credentials)
				.then((res) => {
					let token = res.data.token;
					commit("RETRIEVE_TOKEN", token); 

					let user = res.data.user;
					commit("SET_CURRENT_USER", user);

					resolve(res);
				})
				.catch((error) => {
					reject(error.response.data.message);
				});
		});
	},
	register: (context,credentials) => {
		return new Promise((resolve, reject) => {
			axios
				.post("/register", credentials)
				.then((res) => {
					resolve(res);
				})
				.catch((error) => {
					reject(error.response.data.errors.email[0]);
				});
		});
	},
	logout: (context) => {
		axios.defaults.headers.common["Authorization"] = "Bearer " + context.state.token;
		if (context.getters.loggedIn) {
			return new Promise((resolve, reject) => {
				axios
					.post("/logout")
					.then((res) => {
						context.commit("DESTROY_TOKEN");
						context.commit("REMOVE_USER");
						resolve(res);
					})
					.catch((error) => {
						context.commit("DESTROY_TOKEN");
						context.commit("REMOVE_USER");
						reject(error.response.data.message);
					});
			});
		}
	},
};
const getters = {
	loggedIn: (state) => {
		return state.token != null;
	},
	isAdmin: state => {
		return state.currentUser.is_admin;
	},
	isDisabled: state => {
		return state.currentUser && state.currentUser.is_disabled;
	}
};

export default {
	state,
	mutations,
	actions,
	getters,
};
