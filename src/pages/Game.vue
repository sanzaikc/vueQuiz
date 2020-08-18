<template>
    <div class="container h-75 d-flex align-items-center">
        <div v-if="quizStarted" class="p-4 rounded w-100">
            <h1 class="text-center"> Q: {{ this.currentQuestion.body }}</h1>
            <hr>
            <div class="row d-flex justify-content-around">
                <h3 v-for="(option) in currentQuestion.options" 
                    :key="option.id"
                    @click="selectedAns(option.id)"
                    role="button"
                    class="col-5 my-3 py-3 border rounded-pill shadow-sm text-center"
                    :class="selected == option.id ? 'selected' : ''"> {{ option.body }}
                </h3>
            </div>
        </div>
        <div v-else>
            <h2>Hi, {{ data.name }} </h2>
            Wait till the host starts the quiz.
            <h5 v-show="players">Other Participants:</h5>
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
                // this.$toasted.show(e.player.name+" joined!");
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
        color: steelblue;
        background-color: #DBF3FC;
    }
</style>