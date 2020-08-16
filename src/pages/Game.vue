<template>
    <div class="container">
        <h2>Hi, {{ data.name }} </h2>
        <div v-if="quizStarted" class="p-4 border rounded">
            <h1 class="text-center">{{ this.currentQuestion.body }}</h1>
            <hr>
            <div class="d-flex text-center my-5">
                <h4 v-for="(option) in currentQuestion.options" 
                    :key="option.id"
                    @click="selectedAns(option.id)"
                    role="button"
                    class="w-25 mx-2 border border-info p-3 rounded-pill"
                    :class="selected == option.id ? 'selected' : ''"> {{ option.body }} 
                </h4>
            </div>
        </div>
        <div v-else>
            Wait till the host starts the quiz
        </div>
    </div>
</template>

<script>
export default {
     mounted(){
         window.Echo.channel('quizy' + this.data.quiz_id )
            .listen('QuestionChanged', (e) => {
                this.currentQuestion = e.question;
                console.log(this.currentQuestion.answer.id);
                this.quizStarted = true;
         });
     },
     props:{
         data: {
             type: Object
         }
     },
     data(){
         return{
             quizStarted: false,
             currentQuestion: '',
             selected: '',
         }
     },
     methods: {
         selectedAns(id){
             this.selected = id;
             console.log(this.selected);
             if(this.currentQuestion.answer.id == id){
                alert("correct");
             }
         }
     }
}
</script>

<style scoped>
    .selected{
        color: white;
        background-color: lightsteelblue
    }
</style>