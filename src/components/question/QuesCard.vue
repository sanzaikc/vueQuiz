<template>
    <div  class="px-3 py-2 mb-2 border rounded-lg shadow-sm">
        <div class="d-flex justify-content-between">
            <h4 @click="showAns = !showAns" style="cursor: pointer">{{ index + 1  + '.'}} {{ question.body }} </h4>
            <b-dropdown size="sm" dropleft  variant="link" toggle-class="text-decoration-none" no-caret>
                <template v-slot:button-content>
                    <b-icon icon="text-right"></b-icon>
                </template>
                <b-dropdown-item>Edit</b-dropdown-item>
                <b-dropdown-item @click="del(question.id)">Delete</b-dropdown-item>
            </b-dropdown>
        </div>
        <div v-if="showAns" class="d-flex justify-content-between">
            <ul class="list list-unstyled w-50">
                <li 
                    v-for="option in question.options" 
                    :key="option.id" 
                    class="px-2 rounded font-weight-bold mb-2 w-50" 
                    :class="option.id == question.answer.option_id ? 'answer' : ''" 
                    v-text="option.body">
                </li>
            </ul>
            <div v-if="question.image_url" class="w-50 text-center">
                <p>This question contains an image</p>
                <img :src="question.image_url" height="100px">
            </div>
        </div>
    </div>
</template>

<script>
// import Sidebar from '../question/QuesSidebar.vue';
export default {
    mounted(){
    },
    props: {
        question: {
            type: Object,
        },
        index: {
            type: Number,
        }
    },
    data(){
        return{
            showAns: false,
        }
    },
    methods: {
        del(id){
            this.$store.dispatch('deleteQuestion', id)
                .then(res => {
                    if(res){
                        this.$toasted.show("Question deleted", {
                            theme: 'bubble'
                        })
                    } 
                })
                .catch(error => {
                    this.$toasted.show(error, {
                        theme: 'bubble'
                    })
                });
        }
    },
    components: {
        // Sidebar,
    }
}
</script>

<style scoped>
    .answer{
        /* background-color: #85db8a; */
        color: green;
    }
    /* .answer:hover{
        background-color: #a1eda5;
    } */
</style>