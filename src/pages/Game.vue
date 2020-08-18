<template>
    <div class="container">
        <div v-if="quizStarted" class="p-4 border rounded">
            <h1 class="text-center">{{ this.currentQuestion.body }}</h1>
            <hr>
            <div class="row">
                <h4 v-for="(option) in currentQuestion.options" 
                    :key="option.id"
                    @click="selectedAns(option.id)"
                    role="button"
                    class="col-6 border border-info p-3 rounded-pill text-center"
                    :class="selected == option.id ? 'selected' : ''"> {{ option.body }}
                </h4>
            </div>
        </div>
        <div v-else>
            <h2>Hi, {{ data.name }} </h2>
            Wait till the host starts the quiz.
            <h5>Other Participants:</h5>
                <h5 v-for="(player, index) in players" 
                    :key="player.id" 
                    class="text-info">  {{ index + 1 + '.'}} {{ player.name }}
                </h5>        
            </div>
    </div>
</template>

<script>
export default {
     mounted(){
        window.Echo.channel('quizy' + this.data.quiz_id)
            .listen('PlayerJoined', (e) => {
                this.players.push(e.player);
                this.$toasted.show(e.player.name+" joined!");
         });
         window.Echo.channel('Quizy' + this.data.quiz_id )
            .listen('QuestionChanged', (e) => {
                this.currentQuestion = e.question;
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
             score: 0,
             players: [],
         }
     },
     methods: {
         selectedAns(id){
             this.selected = id;
             if(this.currentQuestion.answer.option_id == id){
                 this.score++;
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