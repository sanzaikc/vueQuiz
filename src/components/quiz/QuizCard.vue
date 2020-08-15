<template>
	<div class="col-md-3">
		<b-card
			:title="quiz.name"
			:img-src="
				quiz.image_url
					? quiz.image_url
					: require('../../assets/images/quizDefault.jpg')"
			img-alt="Image"
			img-height="150"
			img-top
			tag="article"
			class="mb-3 shadow-sm">

			<b-card-text v-text="quiz.description" class="line-clamp"></b-card-text>

			<div class="d-flex justify-content-between">
				<router-link :to="{ name: 'quizDetail', params: { id: quiz.id } }"
					class="col-md-4 btn btn-outline-primary btn-sm">View
				</router-link>
				
				<button v-if="quiz.questions" class="col-md-4 btn btn-outline-info btn-sm" @click="host(quiz)"> 
					<b-spinner v-if="isBusy"
							small
							type="grow">
					</b-spinner>
					<span v-else> Host </span>
				</button>
			</div>
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
	data(){
		return{
			isBusy: false,
		}
	},
	methods: {
		host(quiz){
			let pin = Math.floor(Math.random() * 90000) + 10000;
			if(!quiz.questions.length <= 0){
				this.isBusy = true;
				this.$store.dispatch('updatePin', {id: quiz.id, pin: pin})
					.then(res => {
						if(res) this.$router.push({ name: 'quiz.start', params:{ id: quiz.id } });
						this.isBusy = false;
					})
					.catch(error => {
						this.$toasted.show(error, {
							theme: "bubble",
						})
						this.isBusy = false;
				});
			}else {
				alert('Oops, questions aren\'t sufficeint!');
			}
			
		}
	}
};
</script>

<style scoped>
.line-clamp {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>
