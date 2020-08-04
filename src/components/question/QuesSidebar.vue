<template>
	<div>
    <button id="sidebar" v-b-toggle.sidebar-backdrop hidden> </button>
    <b-sidebar
        id="sidebar-backdrop"
        :title="text + 'e Question'"
        backdrop
        shadow
        :lazy="true"
        width="400px"
	>
          <div class="px-3 py-2 border-top">
            <validation-observer ref="observer" v-slot="{ handleSubmit }">
              <b-form @submit.prevent="handleSubmit(onSubmit)">
                <validation-provider
                  name="Question"
                  :rules="{ required: true, min: 10}"
                  v-slot="validationContext">
                  <b-form-group id="input-group-1" label="Question" label-for="question">
                     <b-form-textarea
						id="question"
						v-model="question.body"
						placeholder="Enter Question"
						rows="3"
						max-rows="6"
						:state="getValidationState(validationContext)"
						aria-describedby="input-1-live-feedback"></b-form-textarea>
                    <b-form-invalid-feedback
                      id="input-1-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>

                <validation-provider
                  name="Category"
                  :rules="{ required: true }"
                  v-slot="validationContext">
                  <b-form-group id="input-group-2" label="Category" label-for="category">
                    <b-form-select 
						id="category"
						class="form-control" 
						v-model="question.category_id"
						:state="getValidationState(validationContext)"
						aria-describedby="input-2-live-feedback">
						<option disabled value="">Choose Category</option>
						<option v-for="category in categories" :value="category.id" :key="category.id" >{{ category.name }}</option>
					</b-form-select>
                    <b-form-invalid-feedback
                      id="input-2-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
				
				<validation-provider
                  name="Option"
                  :rules="{ required: true, min: 3}"
                  v-slot="validationContext">
                  <b-form-group id="input-group-1" label="Option 1" label-for="option1">
                    <b-form-input
                      id="option1"
                      v-model="question.options[0]"
                      type="text"
                      placeholder="Enter option"
                      :state="getValidationState(validationContext)"
                      aria-describedby="input-1-live-feedback"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      id="input-1-live-feedback"
                    >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>

                <b-form-group id="input-group-2" label="Image (optional)" label-for="image">
                  <b-form-file
                    id="image"
                    v-model="question.image"
                    :state="Boolean(question.image)"
                    placeholder="Choose a file or drop it here..."
                    accept=".jpg, .png, .gif"
                    @change="onFileChange"
                  ></b-form-file>
                </b-form-group>

                <div class="my-3 d-flex">
                  <img
                    v-if="question.image"
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
                  {{ isCreating ? text+'ing' : text+'e' }}
                  <b-spinner v-if="isCreating" small type="grow" class="ml-2"></b-spinner>
                </b-button>
              </b-form>
            </validation-observer>
          </div>
    </b-sidebar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	mounted(){
		this.$store.dispatch('retrieveCategories');
    },
	props: {
		text: {
			type: String,
		},
	},
	data(){
		return{
			isCreating: false,
			question: {
				body: '',
				category_id: '',
				options: [],
			},
			url: "",
		}
	},
	methods: {
		getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
		},
		onFileChange(e) {
			const file = e.target.files[0];
			this.url = URL.createObjectURL(file ? file : "");
		},
		onSubmit(){
			console.log('Submitted');
		}
	},
	computed:{
		...mapState({
			'categories': state => state.categories.categoryList,
		}),
    },
}
</script>