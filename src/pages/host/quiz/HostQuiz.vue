<template>
    <div>
        <div class="d-flex justify-content-between">
            <h3 v-text="quizDetail.name"></h3>
            <h4> Pin: {{ quizDetail.pin ? quizDetail.pin : "1234" }} </h4>
        </div>
        <p>Players: </p>
        <ul>
            <li v-for="player in players" :key="player.id"> {{ player.name }} </li>
        </ul>

        <p v-for="player in quizDetail.players" :key="player.id" v-text="player.name"></p>

    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    mounted(){
        this.QUIZ_DETAIL(this.$route.params.id);
        window.Echo.channel('quizy' + this.$route.params.id)
            .listen('PlayerJoined', (e) => {
                this.players.push(e.player)
            });
    },
    data(){
        return{
            players: [],
        }
    },
    methods: {
        ...mapMutations([
            'QUIZ_DETAIL',
        ]),
    },
    computed: {
        ...mapState({
            'quizDetail': state => state.quiz.quizDetail,
        })
    }
}
</script>