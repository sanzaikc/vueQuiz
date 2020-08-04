<template>
	<div>
    <button id="sidebar" v-b-toggle.sidebar-backdrop hidden> </button>
    <b-sidebar
        id="sidebar-backdrop"
        :title="text + 'e Question'"
        backdrop
        shadow
        :lazy="true"
        width="400px">       
    </b-sidebar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	mounted(){
		this.$store.dispatch('retrieveCategories');
    },
	props: {
		text: {
			type: String,
		},
	},
	data(){
		return{
			isCreating: false,
			question: {
				body: '',
				category_id: '',
				options: [],
			},
			url: "",
		}
	},
	methods: {
		getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
		},
		onFileChange(e) {
			const file = e.target.files[0];
			this.url = URL.createObjectURL(file ? file : "");
		},
		onSubmit(){
			console.log('Submitted');
		}
	},
	computed:{
		...mapState({
			'categories': state => state.categories.categoryList,
		}),
    },
}
</script>