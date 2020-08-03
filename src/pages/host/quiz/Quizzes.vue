<template>
  <div>
    <div v-if="isLoading"> Loading </div>
    <div v-else>
      <div class="d-flex justify-content-between align-items-center">
        <fab
          v-b-toggle.sidebar-backdrop
          id="sidebar"
          bg-color="#007bff"
          style="outline:none">
        </fab>

        <quiz-sidebar :text="'Creat'" @onSubmit="createQuiz"></quiz-sidebar>
       
      </div>

      <div class="row">
        <quiz-card v-for="quiz in quizzes" :key="quiz.id" :quiz="quiz"></quiz-card>
      </div> 

    </div>
  </div>
</template>
<script>
import fab from 'vue-fab';
import { mapState } from "vuex";
import QuizCard from "../../../components/QuizCard.vue";
import QuizSidebar from "../../../components/QuizSidebar.vue";
export default {
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    document.title = "Quiz";
  },
  created() {
    this.$store.dispatch("retrieveQuiz").finally(this.isLoading = false);
  },
  computed: {
    ...mapState({
      quizzes: (state) => state.quiz.quizList,
    }),
  },
  methods: {
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