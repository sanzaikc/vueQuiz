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

      <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
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