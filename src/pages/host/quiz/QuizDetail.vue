<template>
    <div>
        <fab
            main-icon='menu'
            bg-color="#007bff"
            :actions="fabActions"
            @editMe="showSidebar"
            @deleteMe="del">
        </fab>

        <quiz-sidebar :text="'Updat'" :quizData="quizDetail" @onSubmit="updateQuiz"></quiz-sidebar>

        <div>
            <h2> {{ quizDetail.name }} </h2>
            <hr>
            <div class="d-flex justify-content-between">
                <p class="w-75 border-right"> {{ quizDetail.description }} </p>
                <div class="d-flex align-items-center">
                    <img 
                    v-if="quizDetail.image_url"
                    :src="quizDetail.image_url"
                    alt="" height="100px"
                    class="border border-success rounded-lg mx-4"> 
                    <p v-else class="">No Image</p>
                </div>
            </div>
        </div>

        <hr>

        <div class="mb-4 d-flex justify-content-between align-items-center">
            <h2>Questions</h2>
            <button class="btn btn-outline-primary btn-sm">Attach</button>
        </div>

        <question-card></question-card>
        <question-card></question-card>
        <question-card></question-card>
        <question-card></question-card> 
        
    </div>
</template>

<script>
import fab from 'vue-fab';
import { mapState } from 'vuex';
import QuizSidebar from '../../../components/QuizSidebar';
import QuestionCard from '../../../components/QuestionCard.vue';
export default {
    mounted(){
        let id = this.$route.params.id;
        this.$store.dispatch('retreiveDetail', id);       
    },
    data(){
        return{
            fabActions: [
              {
                  name: 'deleteMe',
                  icon: 'delete',
                  bgColor: 'red'
              },
              {
                  name: 'editMe',
                  icon: 'edit'
              }
          ],
        }
    },
    methods: {
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
            this.$store.dispatch('updateQuiz', {id:this.quizDetail.id ,data: quiz})
                .then(res => {
                    this.$toasted.show("Updated as "+ res.name);
                    document.getElementById('sidebar').click();
                    this.form
                })    
        }
    },
    computed:{
        ...mapState({
            'quizDetail': state => state.quiz.quizDetail,
        }),
    },
    components:{
        fab,
        QuizSidebar,
        QuestionCard
    }

}
</script>