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
        <div v-if="quizDetail.questions" class="mb-4">
            <h2> {{ quizDetail.questions.length }}  Questions </h2>
            <transition-group name="slide-fade" mode="out-in">
                <question-card 
                    v-for="(question, index) in quizDetail.questions" 
                    :key="question.id" 
                    :question="question" 
                    :index="index"
                    :attach="true"
                    @detach="detach">
                </question-card>
            </transition-group>
        </div>
        <div v-else>
            No Questions attached yet
        </div>
        <b-modal v-model="show" id="modal-scrollable" scrollable centered title="Select Questions to attach to this Quiz." size="lg">
            <div class="row d-flex align-items-center mx-1">
                <span class="border rounded-pill px-2 py-0 mb-2" @click="filter=''" :class="filter == '' ? 'selected': ''"> All </span>
                <div v-for="cat in categories" :key="cat.id" class="mb-2">
                    <span 
                    class="border rounded-pill px-2 mx-1" 
                    role="button" 
                    :class="cat.id == filter ? 'selected' : ''"  
                    @click="filter=cat.id"> {{ cat.name }} </span>
                </div>
            </div>
            <div v-if="filterByCategory.length > 0">
                <transition-group name="fade">
                    <div 
                        v-for="(question, index) in filterByCategory" 
                        :key="question.id" 
                        class="d-flex justify-content-between align-items-center border px-2 py-1 mb-1 rounded ">
                        <h5> {{ index + 1  + "."}} {{ question.body }} </h5>
                        <input 
                            type="checkbox" 
                            v-model="attachment" 
                            :id="question.id" 
                            :value="question.id"
                            >
                    </div>
                </transition-group>
            </div>
            <div v-else>
                No Questions with such category
            </div>
            <template v-slot:modal-footer>
                <div class="w-100">
                    <p class="float-left">Modal Footer Content</p>
                    <b-button
                        variant="outline-primary"
                        size="sm"
                        class="float-right ml-3"
                        :disabled="attachment.length < 1"
                        @click="attach"> Attach
                    </b-button>
                    <b-button
                        variant="outline-primary"
                        size="sm"
                        class="float-right"
                        @click="closeModal">Cancel
                    </b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import fab from 'vue-fab';
import QuizSidebar from '../../../components/quiz/QuizSidebar.vue';
import QuestionCard from '../../../components/question/QuesCard.vue'
export default {
    mounted(){
        if(this.$store.state.quiz.quizList.length > 0){
            this.QUIZ_DETAIL(this.$route.params.id);
            this.$store.dispatch('retriveQuestions')
        }else{
            this.$store.dispatch('retrieveQuiz')
                .then(res=> {
                    if(res) this.QUIZ_DETAIL(this.$route.params.id);
                    this.$store.dispatch('retriveQuestions')
                });
        }    
        this.$store.dispatch('retrieveCategories');
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
            attachment: [],
            show: false,
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
            this.attachment = []
            this.filter= ""
        },
        attach(){
            this.$store.dispatch('attachQuestions', { quizId: this.quizDetail.id, questions: this.attachment})
                .then(res => {
                    if(res){
                        this.closeModal();
                        this.$toasted.show('Questions attached!');
                    }
                })
                .catch(error => {
                    this.$toasted.show(error, {
                        theme: "bubble",
                    })
                })
        },
        detach(id){
            if(confirm("Are you sure you want to deattach this question ?")){
                this.$store.dispatch('detachQuestion', { quizId: this.quizDetail.id, questionId: id})
                .then(res => {
                    if(res){
                        this.$toasted.show('Detached');
                    }
                })
                .catch(error => {
                    this.$toasted.show(error, {
                        theme: "bubble",
                    })
                })
            }
        }
    },
    computed:{
        ...mapState({
            'quizDetail': state => state.quiz.quizDetail,
            'questions': state => state.questions.questionList,
            'categories': state => state.categories.categoryList,
        }),
        filterByCategory(){
            if(this.filter == ''){
                return this.questions
            }else{
                return this.questions.filter(q => q.category_id == this.filter);
            }
        },
    },
    components:{
        fab,
        QuizSidebar,
        QuestionCard,
    }
}
</script>

<style scoped>
    .selected{
        background-color: #dbf3fc ;
        color: steelblue;
        font-weight: bold;
    }
</style>