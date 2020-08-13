<template>
    <div>
        <div class="d-flex justify-content-between">
            <h3 v-text="quizDetail.name"></h3>
            <h4> Pin: {{ quizDetail.pin ? quizDetail.pin : "1234" }} </h4>
        </div>
        <p>Players: </p>
        <ul>
            <li>Player 1 </li>
            <li>Player 2 </li>
            <li>Player 3 </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
    mounted(){
        this.QUIZ_DETAIL(this.$route.params.id);
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