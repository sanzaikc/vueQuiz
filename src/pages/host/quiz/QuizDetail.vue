<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h2>Random Quiz Name {{$route.params.id}}</h2>
            <b-icon icon="text-right" font-scale="2"></b-icon>
        </div>
        <hr>
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab sint incidunt accusantium qui in necessitatibus id velit tenetur magni. Qui!
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
import QuestionCard from '../../../components/QuestionCard.vue';
export default {
    created(){
        let id = this.$route.params.id;
        this.$store.quiz.dispatch('retrieveDetail', id);
    },
    methods: {
    },
    components:{
        QuestionCard
    }

}
</script>