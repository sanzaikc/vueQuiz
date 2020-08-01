<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h2>Quiz</h2>
            <b-button v-b-toggle.sidebar-backdrop>Create</b-button>

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
                                        aria-describedby="input-1-live-feedback"
                                    ></b-form-input>
                                    <b-form-invalid-feedback id="input-1-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                </b-form-group>
                            </validation-provider>

                            <validation-provider
                                name="Description"
                                :rules="{ required: true}"
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
                                    >
                                </b-form-file>
                            </b-form-group>

                            <b-button type="submit" variant="outline-primary" class="w-100" :disabled="isLoading">
                            {{ isLoading ? 'Creating' : 'Create' }} <b-spinner v-if="isLoading" small type="grow" class="ml-2"></b-spinner>
                            </b-button>

                        </b-form>
                    </validation-observer>
                </div>
            </b-sidebar>

        </div>
    </div>
</template>
<script>
export default {
    mounted(){
        document.title = "Quiz"
    },
    data(){
        return{
            isLoading: false,
            name: '',
            description: '',
            image: null
        }
    },
    methods: {
        getValidationState({ dirty, validated, valid = null }) {
        return dirty || validated ? valid : null;
        },
        createQuiz(){

        },
    }
}
</script>