<template>
  <div>
    <button id="sidebar" v-b-toggle.sidebar-backdrop hidden></button>
    <b-sidebar
      id="sidebar-backdrop"
      :title="text + 'e Question'"
      backdrop
      shadow
      :lazy="true"
      width="400px"
    >
      <b-form class="p-3" @submit.prevent="handleSubmit">
        <b-form-textarea
          id="textarea"
          size="sm"
          v-model="question.body"
          placeholder="Question"
          rows="3"
          max-rows="3"
          class="my-3"
          required
        ></b-form-textarea>

        <b-form-group id="input-group-3" label="Category" label-for="category">
          <b-form-select
            id="category"
            v-model="question.category_id"
            :options="categories"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group
          v-for="(option, key) in question.options"
          :key="key"
          :id="'option' + key"
          :label="key === 0 ? 'Answer' : 'Option ' + key"
          :label-for="'option' + key"
        >
          <b-form-input
            id="answer"
            v-model="question.options[key].body"
            required
            placeholder="Enter answer"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-sidebar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  mounted() {
    this.$store.dispatch("retrieveCategories")
  },
  props: {
    text: {
      type: String,
    },
  },
  data() {
    return {
      isCreating: false,  
      question: {
        body: "",
        category_id: null,
        options: [
          {
            body: "",
            correct: true,
          },
          {
            body: "",
            correct: false,
          },
          {
            body: "",
            correct: false,
          },
          {
            body: "",
            correct: false,
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.question);
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file ? file : "");
    },
    onSubmit() {
      console.log("Submitted");
    },
  },
  computed: {
    ...mapGetters([
      'categories',
    ])
  },
};
</script>