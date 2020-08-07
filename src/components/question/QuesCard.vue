<template>
    <div  class="px-3 py-2 mb-2 border rounded-lg shadow-sm">
        <div class="d-flex justify-content-between align-items-center w-100">
            <h4  @click="showAns = !showAns" style="cursor: pointer" class="w-100">{{ index + 1  + '.'}} {{ question.body }} </h4>
            <b-dropdown v-if="!attach" size="sm" dropleft  variant="link" toggle-class="text-decoration-none" no-caret>
                <template v-slot:button-content>
                    <b-icon icon="text-right"></b-icon>
                </template>
                <div>
                    <b-dropdown-item @click="showEdit(question)">Edit</b-dropdown-item>
                    <b-dropdown-item @click="del(question.id)">Delete</b-dropdown-item>
                </div>
            </b-dropdown>
            <button v-else class="btn btn-outline-primary btn-sm ml-2" @click="attachQuestion(question)">Attach</button>
        </div>
        <div v-if="!showAns">
           <span class="px-2 border rounded-pill text-secondary" v-text="this.categoryName"> </span>
        </div>
        <transition name="fade">
            <div v-if="showAns" class="d-flex justify-content-between">
                <ul class="list list-unstyled w-75 ml-3">
                    <li 
                        v-for="option in question.options" 
                        :key="option.id" 
                        class="px-2 rounded font-weight-bold mb-2 w-100" 
                        :class="option.id == question.answer.option_id ? 'text-success' : ''" 
                        v-text="option.body">
                    </li>
                </ul>
                <div v-if="question.image_url" class="w-50 text-center">
                    <p>This question contains an image</p>
                    <img :src="question.image_url" class="rounded" height="100px">
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import Sidebar from '../question/QuesSidebar.vue';
export default {
    mounted(){
        this.$store.dispatch('retrieveCategories')
            .then(res=>{
                if(res){
                    if(this.categories){
                        let cat = this.categories.find(q => q.value === this.question.category_id);
                        this.categoryName = cat.text;
                    }
                }
            })
    },
    props: {
        question: {
            type: Object,
        },
        index: {
            type: Number,
        },
        attach :{
            type: Boolean,
        }
    },
    data(){
        return{
            showAns: false,
            categoryName: ''
        }
    },
    methods: {
        showEdit(question){
           this.$emit('edit', question);
        },
        attachQuestion(question){
            alert(question.id);
        },
        del(id){
            if(confirm('Are you sure you want to delete?')){
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
        }
    },
    computed: {
        ...mapGetters([
            'categories'
        ]),
    },
    components: {
        // Sidebar,
    }
}
</script>

<style scoped>
</style>