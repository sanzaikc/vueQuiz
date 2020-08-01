<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h2>Quiz</h2>
            <b-button v-b-toggle.sidebar-backdrop id="sidebar">Create</b-button>

            <b-sidebar
                id="sidebar-backdrop"
                title="Create new Quiz"
                backdrop
                shadow
                :lazy='true'
                width="400px"
                >
                <div class="px-3 py-2 border-top">
                    <validation-observer ref="observer" v-slot="{ handleSubmit }">
                        <b-form @submit.prevent="handleSubmit(createQuiz)">   
                            <validation-provider
                                name="Name"
                                :rules="{ required: true, min: 3}"
                                v-slot="validationContext">
                                <b-form-group id="input-group-1" label="Name" label-for="name">
                                    <b-form-input
                                        id="name"
                                        v-model="name"
                                        type="text"
                                        placeholder="Enter name"
                                        :state="getValidationState(validationContext)"
                                        aria-describedby="input-1-live-feedback">
                                    </b-form-input>
                                    <b-form-invalid-feedback id="input-1-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                </b-form-group>
                            </validation-provider>

                            <validation-provider
                                name="Description"
                                :rules="{ required: true, min: 10}"
                                v-slot="validationContext">
                                <b-form-group id="input-group-2" label="Description" label-for="description">
                                    <b-form-textarea
                                        id="description"
                                        v-model="description"
                                        placeholder="Enter description for the quiz"
                                        rows="3"
                                        max-rows="6"
                                        :state="getValidationState(validationContext)"
                                        aria-describedby="input-2-live-feedback">
                                        >
                                    </b-form-textarea>
                                    <b-form-invalid-feedback id="input-2-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                </b-form-group>
                            </validation-provider>                       
                            
                            <b-form-group id="input-group-2" label="Image (optional)" label-for="image">
                                <b-form-file
                                    id="image"
                                    v-model="image"
                                    :state="Boolean(image)"
                                    placeholder="Choose a file or drop it here..."
                                    drop-placeholder="Drop file here..."
                                    accept=".jpg, .png, .gif"
                                    @change="onFileChange"
                                    >
                                </b-form-file>
                            </b-form-group>

                            <img v-if="image" :src="url" alt="" height="100px">

                            <b-button type="submit" variant="outline-primary" class="w-100" :disabled="isLoading">
                            {{ isLoading ? 'Creating' : 'Create' }} <b-spinner v-if="isLoading" small type="grow" class="ml-2"></b-spinner>
                            </b-button>

                        </b-form>
                    </validation-observer>
                </div>
            </b-sidebar>

        </div>
        <hr>

        <div class="row">
            <b-card v-for="quiz in quizzes" :key="quiz.id"
                :title="quiz.name"
                :img-src="quiz.image_url ? quiz.image_url : require('../assets/images/quizDefault.jpg')"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
            >
                <b-card-text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
                </b-card-text>

                <b-button href="#" variant="primary">Go somewhere</b-button>
            </b-card>
        </div>

       <!-- <ul>
           <li v-for="quiz in quizzes" :key="quiz.id" >
               <p v-text="quiz.name"></p>
               <img :src="quiz.image_url" alt="" width="200px">
           </li>
       </ul> -->

    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    mounted(){
        document.title = "Quiz"
    },
    created(){
        this.$store.dispatch('retrieveQuiz');
        console.log('created');
    },
    computed:{
        ...mapState({
            'quizzes': state => state.quiz.quizList,
        }),
    },
    data(){
        return{
            isLoading: false,
            name: '',
            description: '',
            image: null,
            url: ''

        }
    },
    methods: {
        getValidationState({ dirty, validated, valid = null }) {
        return dirty || validated ? valid : null;
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
        },
        createQuiz(){
            this.isLoading = true;
            this.$store.dispatch('createQuiz', {
                name: this.name,
                desc: this.description,
                img: this.image
            })
                .then(() => {
                    // console.log(res);
                    document.getElementById('sidebar').click();
                    this.isLoading = false;
                })
        },
    },
}
</script>