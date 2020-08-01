<template>
    <b-card 
        :title="quiz.name"
        :img-src="quiz.image_url ? quiz.image_url : require('../assets/images/quizDefault.jpg')"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem; max-height: 20rem"
        class="mb-2 img-fluid">
            <b-card-text v-text="quiz.description"></b-card-text>

            <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
    </b-card>
</template>

<script>
export default {
    props: {
        quiz: {
            type: Object,
        }
    }
}
</script>