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
        <div class="my-4" v-if="quizDetail.players">
            <h5> {{ quizDetail.players.length }} Participants:</h5>
            <div class="px-4 rounded-lg">
                <ul class="list-unstyled">
                    <li v-for="player in quizDetail.players" :key="player.id"> {{ player.name }} </li>
                </ul>
            </div>
        </div>
        <button 
            class="btn btn-outline-primary btn-block w-25" 
            style="position: fixed; bottom: 5%; left: 45%">Start Quiz
        </button>

    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    mounted(){
        this.QUIZ_DETAIL(this.$route.params.id);
        window.Echo.channel('quizy' + this.$route.params.id)
            .listen('PlayerJoined', (e) => {
                this.UPDATE_PLAYERS(e.player)
                this.$toasted.show(e.player.name+" joined!");
         });
    },
    data(){
        return{
            copied: false,
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
        }
    },
    computed: {
        ...mapState({
            'quizDetail': state => state.quiz.quizDetail,
        }),
    }
}
</script>