<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h3 v-text="quizDetail.name"></h3>
            <div class="d-flex">
                <div class="d-flex align-items-baseline">
                     <h4>Pin: </h4>
                    <h2 class="mx-3" style="color: steelblue" ref="pin"> {{ quizDetail.pin }}</h2>
                </div>
                <div class="px-2 bg-light rounded-lg d-flex align-items-center" role="button" @click="copyPin">
                    <span v-text="copied ? 'Pin Copied' : 'Copy Pin'" :class="copied ? 'text-success' : ''" ></span>
                    <b-icon :icon="copied ? 'clipboard-data' : 'clipboard'" :variant="copied ? 'success' : ''" scale="1.5" class="mx-2"></b-icon>
                </div>
            </div>
        </div>
        <div v-if="players">
            <div class="my-4" v-show="!start">
                <h5> {{ players.length }} Participants:</h5>
                <h5 v-for="player in players" :key="player.id" class="text-info"> {{ player.name }} </h5>
            </div>
            <button v-show="!start"
                class="btn btn-outline-primary btn-block w-25" 
                style="position: fixed; bottom: 5%; left: 45%"
                @click="startGame">Start Quiz
            </button>
        </div>

        <div v-show="start" class="mt-5">
            <transition name="fade" mode="out-in">
                <div class="my-4 p-4 border rounded">
                    <h1> {{ questions[qIndex].body }} </h1>
                    <h3 v-for="(option, index) in questions[qIndex].options" 
                        :key="option.id" 
                        class="text-secondary bg-light rounded-pill px-3 py-2 w-25"> {{ index + 1 + '.'}}  {{ option.body }} 
                    </h3>
                </div>
            </transition>
           <div class="float-right w-25">
                <button v-if="!lastQuestion" @click="next" class="btn btn-outline-primary btn-block" >Next</button>
                <button v-else @click="finish" class="btn btn-outline-info btn-block" >End</button>     
           </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex';
import axios from 'axios';
export default {
    mounted(){
        this.QUIZ_DETAIL(this.$route.params.id);
        window.Echo.channel('quizy' + this.$route.params.id)
            .listen('PlayerJoined', (e) => {
                this.UPDATE_PLAYERS(e.player);
                this.$toasted.show(e.player.name+" joined!");
         });
    },
    data(){
        return{
            copied: false,
            start: false,
            qIndex: 0,
        }
    },
    methods: {
        ...mapMutations([
            'QUIZ_DETAIL',
            'UPDATE_PLAYERS',
        ]),
        selectText(element) {
            var range;
            if (document.selection) {
                range = document.body.createTextRange();
                range.moveToElementText(element);
                range.select();
            } else if (window.getSelection) {
                range = document.createRange();
                range.selectNode(element);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
            }
        },
        copyPin(){
            this.selectText(this.$refs.pin);
            try {
                if(document.execCommand('copy')){
                    this.copied = true;   
                    this.$toasted.show('Pin Copied');
                }
            } catch (err) {
                alert('Oops, unable to copy');
            }
            window.getSelection().removeAllRanges();
        },
        startGame(){
            // if(this.players.length > 1){
                this.start = true;
                this.currentQ(this.questions[0].id);
            // }else{
            //     alert("Not enough participants")
            // }
        },
        currentQ(id){
            axios.post('quizzes/' + this.quizDetail.id, {
                current_question: id
            })
            .then(res => {
                console.log(res);
            })
            .catch(error => console.log(error));
        },
        next(){
            this.qIndex ++;
            this.currentQ(this.questions[this.qIndex].id);
        },
        finish(){
            if(confirm("End this Quiz? ")){
                this.qIndex = 0;
                this.start = false
            }
        }
    },
    computed: {
        ...mapState({
            'quizDetail': state => state.quiz.quizDetail,
        }),
        ...mapGetters([
            'players'
        ]),
        questions(){
            let questions = this.quizDetail.questions;
            return questions;
        },
        lastQuestion(){
            return this.qIndex == this.questions.length - 1;
        }
    }
}
</script>