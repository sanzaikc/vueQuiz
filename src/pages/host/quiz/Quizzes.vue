<template>
	<div>
		<b-spinner
			v-if="isLoading"
			variant="primary"
			label="Spinning"
			style="position: fixed; top: 50%; left: 50%"
		></b-spinner>
		<div v-else>
			<div class="d-flex justify-content-between align-items-center">
				<fab
					main-icon="menu"
					bg-color="#007bff"
					:actions="fabActions"
					@show="showSidebar"
				>
				</fab>
				<quiz-sidebar :text="'Creat'" @onSubmit="createQuiz"></quiz-sidebar>
			</div>

			<div v-if="quizzes.length > 0" class="row">
				<quiz-card
					v-for="quiz in quizzes"
					:key="quiz.id"
					:quiz="quiz"
				></quiz-card>
			</div>

			<div v-else>
				No quizzes by you, yet!
			</div>
		</div>
	</div>
</template>
<script>
import fab from "vue-fab";
import { mapState } from "vuex";
import QuizCard from "../../../components/QuizCard.vue";
import QuizSidebar from "../../../components/QuizSidebar.vue";
export default {
	data() {
		return {
			isLoading: true,
			fabActions: [
				{
					name: "show",
					icon: "add",
				},
			],
		};
	},
	mounted() {
		document.title = "Quiz";
	},
	created() {
		this.$store
			.dispatch("retrieveQuiz")
			.then((res) => {
				if (res) this.isLoading = false;
			})
			.catch((error) => console.log(error));
	},
	computed: {
		...mapState({
			quizzes: (state) => state.quiz.quizList,
		}),
	},
	methods: {
		showSidebar() {
			document.getElementById("sidebar").click();
		},
		createQuiz(quiz) {
			this.$store
				.dispatch("createQuiz", quiz)
				.then((res) => {
					this.$toasted.show("Quiz '" + res.name + "' created.");
					document.getElementById("sidebar").click();
				})
				.catch((error) => {
					this.$toasted.show(error, {
						theme: "bubble",
					});
				});
		},
	},
	components: {
		fab,
		QuizCard,
		QuizSidebar,
	},
};
</script>
