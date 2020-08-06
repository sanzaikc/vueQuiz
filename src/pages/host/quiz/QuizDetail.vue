<template>
    <div>
        <fab
            main-icon='menu'
            bg-color="#007bff"
            :actions="fabActions"
            @edit="showSidebar"
            @deleteMe="del"
            @attach="attachQuestions">
        </fab>
        <quiz-sidebar :text="'Updat'" v-model="isBusy" @onSubmit="updateQuiz"></quiz-sidebar>
        <div>
            <h2> {{ quizDetail.name }} </h2>
            <hr>
            <div class="d-flex justify-content-between">
                <p class="w-75 border-right"> {{ quizDetail.description }} </p>
                <div class="d-flex align-items-center">
                    <img 
                    v-if="quizDetail.image_url"
                    :src="quizDetail.image_url"
                    alt="" 
                    height="100px"
                    class="border border-success rounded-lg mx-4"> 
                    <p v-else class="">No Image</p>
                </div>
            </div>
        </div>
        <hr>
        <div v-if="questions.length > 0" class="mb-4 d-flex justify-content-between align-items-center">
            <h2>Total Questions {{ questions.length }} </h2>
            <b-button v-b-modal.modal-scrollable hidden ref="modal"></b-button>

            <b-modal id="modal-scrollable" scrollable title="Attach Questions to this quiz" size="lg" ok-only>
                <!-- <input v-model="filter" type="text" class="form-control mb-2" placeholder="Filter by category"> -->
                <question-card 
                    v-for="(question, index) in filterCategory" 
                    :key="question.id" 
                    :question="question" 
                    :index="index"
                    :attach="true"></question-card>
            </b-modal>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import fab from 'vue-fab';
import QuizSidebar from '../../../components/quiz/QuizSidebar';
import QuestionCard from '../../../components/question/QuesCard';
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
        attachQuestions(){
            this.$refs.modal.click();
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
        }
    },
    components:{
        fab,
        QuizSidebar,
        QuestionCard
    }
}
</script>