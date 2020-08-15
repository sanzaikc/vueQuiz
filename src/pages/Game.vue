<template>
    <div>
        <h2>Game here</h2>
        <div v-if="this.currentQuestion">
            {{ this.currentQuestion.body }}
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
                console.log(e);
                this.currentQuestion = e.question
         });
     },
     props:{
         data: {
             type: Object
         }
     },
     data(){
         return{
             currentQuestion: ''
         }
     },
}
</script>