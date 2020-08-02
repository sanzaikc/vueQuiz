<template>
    <div>
        <b-icon icon="arrow-left" font-scale="3" @click="goBack()"></b-icon>
        <h3>QuizId : {{$route.params.id}}</h3>
        {{ quiz }}
    </div>
</template>

<script>
export default {
   props:{
       quiz: {
           type: Object
       }
   },
    methods: {
        goBack(){
            this.$router.push({ name: 'host.quiz' });
        }
    }
}
</script>