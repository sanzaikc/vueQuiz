<template>
  <div class="col-md-4">
    <b-card
      :title="quiz.name"
      :img-src="quiz.image_url ? quiz.image_url : require('../assets/images/quizDefault.jpg')"
      img-alt="Image"
      img-top
      tag="article"
      class="mb-2 img-fluid"
    >
      <b-card-text v-text="quiz.description" class="line-clamp"></b-card-text>
        
      <router-link 
        :to="{ name: 'quizDetail', params: { id: quiz.id}}" 
        class="col-md-4 btn btn-outline-primary btn-sm"
        :quiz="quiz">View</router-link>

    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    quiz: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>