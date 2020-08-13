<template>
    <div>
        <div class="d-flex justify-content-between">
            <h3 v-text="quizDetail.name"></h3>
            <h4> Pin: {{ quizDetail.pin ? quizDetail.pin : "1234" }} </h4>
        </div>
        {{ quizDetail }}
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