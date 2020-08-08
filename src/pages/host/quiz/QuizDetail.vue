<template>
    <div>
        <fab
            main-icon='menu'
            bg-color="#007bff"
            :actions="fabActions"
            @edit="showSidebar"
            @deleteMe="del"
            @attach="showModal">
        </fab>
        <quiz-sidebar 
            :text="'Updat'" 
            v-model="isBusy" 
            :qData="quizDetail" 
            @onSubmit="updateQuiz">
        </quiz-sidebar>
        <div>
            <h2> {{ quizDetail.name }} </h2>
            <div class="d-flex justify-content-between align-content-center">
                <h4 class="w-75 p-1 text-secondary"> {{ quizDetail.description }} </h4>
                <div class="d-flex align-items-center">
                    <img 
                    v-if="quizDetail.image_url"
                    :src="quizDetail.image_url"
                    alt="" 
                    height="100px"
                    class="border border-success rounded-lg mx-4"> 
                    <p v-else class="mx-4">No cover image</p>
                </div>
            </div>
        </div>
        <hr>
        <div v-if="questions.length > 0" class="mb-4 d-flex justify-content-between align-items-center">
            <h2>Total Questions {{ questions.length }} </h2>

            <b-modal v-model="show" id="modal-scrollable" scrollable centered title="Select Questions to attach to this Quiz." size="lg">
                <!-- <input v-model="filter" type="text" class="form-control mb-2" placeholder="Filter by category"> -->
                <div class="mb-2">
                    <span>Selected id:  {{ attachedQuestions }}  </span>
                </div>
                <div 
                    v-for="(question, index) in filterCategory" 
                    :key="question.id" 
                    class="d-flex justify-content-between align-items-center border px-2 py-1 mb-1 rounded ">
                    <h5> {{ index + 1  + "."}} {{ question.body }} </h5>
                    <input 
                    type="checkbox" 
                    v-model="attachedQuestions" 
                    :id="question.id" 
                    :value="question.id">
                </div>
                <template v-slot:modal-footer>
                    <div class="w-100">
                        <p class="float-left">Modal Footer Content</p>
                        <b-button
                            variant="primary"
                            size="sm"
                            class="float-right"
                            @click="closeModal">Cancel
                        </b-button>
                    </div>
                </template>
            </b-modal>
        </div>
        <div v-else>
            Loading Questions
        </div>
       
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import fab from 'vue-fab';
import QuizSidebar from '../../../components/quiz/QuizSidebar';
export default {
    mounted(){
        if(this.$store.state.quiz.quizList.length > 0){
            this.QUIZ_DETAIL(this.$route.params.id);
        }else{
            this.$store.dispatch('retrieveQuiz')
                .then(res=> {
                    if(res) this.QUIZ_DETAIL(this.$route.params.id);
                    this.$store.dispatch('retriveQuestions')
                });
        }    
    },
    data(){
        return{
            isBusy: false,
            fabActions: [
                {
                    name: 'deleteMe',
                    icon: 'delete',
                    bgColor: 'red'
                },
                {
                    name: 'edit',
                    icon: 'edit'
                },
                {
                    name: 'attach',
                    icon: 'attachment'
                }
            ],
            filter: '',  
            attachedQuestions: [],
            show: false,
            checked: false,  
        }
    },
    methods: {
        ...mapMutations([
            'QUIZ_DETAIL'
        ]),
        showSidebar(){
            document.getElementById('sidebar').click();
        },
        del(){
            if(confirm("Are you sure you want to delete '" + this.quizDetail.name + "' ?")){
                this.$store.dispatch('deleteQuiz', this.quizDetail.id)
                    .then(res=> {
                        if(res) {
                            this.$toasted.show(res, {
                                theme: 'bubble'
                            });
                            this.$router.push({ name: 'quizzes'});
                        }
                    })
            }
        },
        updateQuiz(quiz){
            this.isBusy= true,
            this.$store.dispatch('updateQuiz', {id:this.quizDetail.id ,data: quiz})
                .then(res => {
                    this.isBusy= false,
                    this.$toasted.show("Updated as '"+ res.name + "'");
                    document.getElementById('sidebar').click();
                }).catch(error => {
                    this.isBusy= false,
                    this.$toasted.show(error, {
                        theme: 'bubble',
                    });
                })    
        },
        showModal(){
            this.show = true
        },
        closeModal(){
            this.show = false,
            this.attachedQuestions = []
        }
    },
    computed:{
        ...mapState({
            'quizDetail': state => state.quiz.quizDetail,
            'questions': state => state.questions.questionList,
        }),
        filterCategory(){
            if(this.filter == ''){
                return this.questions
            }else{
                return this.questions.filter(q => q.category_id == this.filter);
            }
        },
        // filterQuestions(){

        // }
    },
    components:{
        fab,
        QuizSidebar,
    }
}
</script>