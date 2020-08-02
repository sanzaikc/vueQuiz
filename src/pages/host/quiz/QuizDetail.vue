<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h2> {{ quiz.name }} </h2>
            <b-icon icon="text-right" font-scale="2"></b-icon>
        </div>
        <hr>
        <div class="d-flex justify-content-between">
            <p class="w-75 border-right"> {{ quiz.description }}   </p>
            <div class="d-flex align-items-center">
                <img 
                v-if="quiz.image_url"
                :src="quiz.image_url"
                alt="" height="100px"
                class="border border-success rounded-lg mx-4"> 
                <p v-else class="">No Image</p>
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
import { mapState } from 'vuex';
import QuestionCard from '../../../components/QuestionCard.vue';
export default {
    created(){
        let id = this.$route.params.id;
        console.log('Id: ' + id);
        if(id) this.$store.dispatch('retreiveDetail', id);       
    },
    methods: {
    },
    computed:{
        ...mapState({
            'quiz': state => state.quiz.quizDetail,
        }),
    },
    components:{
        QuestionCard
    }

}
</script>