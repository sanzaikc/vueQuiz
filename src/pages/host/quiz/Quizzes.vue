<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <b-button
        v-b-toggle.sidebar-backdrop
        variant="primary"
        id="sidebar"
        class="fixed-bottom"
        style="position: fixed; top: 80vh; left: 80%; height: 3rem; width: 3rem; border-radius: 50%; box-shadow: 10px 10px 10px rgba(0,0,0,0.2)"
      >
        <b-icon icon="plus" scale="1.5"></b-icon>
      </b-button>

      <b-sidebar
        id="sidebar-backdrop"
        title="Create new Quiz"
        backdrop
        shadow
        :lazy="true"
        width="400px">
        <div class="px-3 py-2 border-top">
          <validation-observer ref="observer" v-slot="{ handleSubmit }">
            <b-form @submit.prevent="handleSubmit(createQuiz)">
              <validation-provider
                name="Name"
                :rules="{ required: true, min: 3}"
                v-slot="validationContext"
              >
                <b-form-group id="input-group-1" label="Name" label-for="name">
                  <b-form-input
                    id="name"
                    v-model="quiz.name"
                    type="text"
                    placeholder="Enter name"
                    :state="getValidationState(validationContext)"
                    aria-describedby="input-1-live-feedback"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    id="input-1-live-feedback"
                  >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

              <validation-provider
                name="Description"
                :rules="{ required: true, min: 10}"
                v-slot="validationContext"
              >
                <b-form-group id="input-group-2" label="Description" label-for="description">
                  <b-form-textarea
                    id="description"
                    v-model="quiz.description"
                    placeholder="Enter description for the quiz"
                    rows="3"
                    max-rows="6"
                    :state="getValidationState(validationContext)"
                    aria-describedby="input-2-live-feedback"
                  >></b-form-textarea>
                  <b-form-invalid-feedback
                    id="input-2-live-feedback"
                  >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

              <b-form-group id="input-group-2" label="Image (optional)" label-for="image">
                <b-form-file
                  id="image"
                  v-model="quiz.image"
                  :state="Boolean(quiz.image)"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                  accept=".jpg, .png, .gif"
                  @change="onFileChange"
                ></b-form-file>
              </b-form-group>

              <div class="my-3 d-flex">
                <img
                  v-if="quiz.image"
                  :src="url"
                  alt
                  height="150"
                  class="mx-auto rounded-lg border border-success"
                />
              </div>

              <b-button
                type="submit"
                variant="outline-primary"
                class="w-100"
                :disabled="isCreating"
              >
                {{ isCreating ? 'Creating' : 'Create' }}
                <b-spinner v-if="isCreating" small type="grow" class="ml-2"></b-spinner>
              </b-button>
            </b-form>
          </validation-observer>
        </div>
      </b-sidebar>
    </div>

    <div class="row">
      <quiz-card v-for="quiz in quizzes" :key="quiz.id" :quiz="quiz"></quiz-card>
    </div>
    
  </div>
</template>
<script>
import { mapState } from "vuex";
import QuizCard from "../../../components/QuizCard.vue";
export default {
  data() {
    return {
      isCreating: false,
      quiz: {
        name: "",
        description: "",
        image: null,
      },
      url: "",
    };
  },
  mounted() {
    document.title = "Quiz";
  },
  created() {
    this.$store.dispatch("retrieveQuiz");
  },
  computed: {
    ...mapState({
      quizzes: (state) => state.quiz.quizList,
    }),
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file ? file : "");
    },
    createQuiz() {
      this.isCreating = true;
      this.$store
        .dispatch("createQuiz", this.quiz)
        .then((res) => {
          this.$toasted.show("Quiz '" + res.name + "' created.");
          this.isCreating = false;
          this.quiz.name = "";
          this.quiz.description = "";
          this.quiz.image = null;
          document.getElementById("sidebar").click();
        })
        .catch((error) => {
          this.isCreating = false;
          this.$toasted.show(error, {
            theme: "bubble",
          });
        });
    },
  },
  components: {
    QuizCard,
  },
};
</script>