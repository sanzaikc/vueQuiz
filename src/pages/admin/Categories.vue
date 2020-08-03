<template>
	<div>
		<div v-if="isLoading">Loading</div>
		<div v-else>
			<div class="d-flex justify-content-between align-items-center">
				<b-button
					id="popover-button-variant"
					@click="showPopover = !showPopover"
					variant="primary"
					style="position: fixed; bottom: 4rem; right: 15rem; height: 4rem; width: 4rem; border-radius: 50%"
				>
					<b-icon
						icon="plus"
						v-if="!showPopover"
						style="height: 2rem; width: 2rem"
					></b-icon>
					<b-icon
						icon="x"
						v-if="showPopover"
						style="height: 2rem; width: 2rem"
					></b-icon>
				</b-button>
				<b-popover
					target="popover-button-variant"
					triggers="click"
					placement="topleft"
				>
					<template v-slot:title>Create new category</template>
					<input
						v-model="category"
						type="text"
						class="form-control mb-2"
						placeholder="Category Name"
					/>
					<button
						class="btn btn-primary w-100"
						@click="createCategory"
						:disabled="isBusy"
					>
						{{ isBusy ? "" : "Create" }}
						<b-spinner v-if="isBusy" small></b-spinner>
					</button>
				</b-popover>
			</div>
			<transition-group name="slide-fade" class="row" mode="out-in">
				<div
					v-for="category in categories"
					:key="category.id"
					class="col-4 mb-3"
				>
					<category
						:category="category"
						@onDelete="deleteCategory"
						@onUpdate="updateCategory"
					></category>
				</div>
			</transition-group>
		</div>
	</div>
</template>

<script>
import Category from "../../components/Category.vue";
import { mapState } from "vuex";

export default {
	data() {
		return {
			showPopover: false,
			isLoading: true,
			isBusy: false,
			category: "",
		};
	},
	mounted() {
		this.$store.dispatch("retrieveCategories").finally(() => {
			this.isLoading = false;
		});
	},
	computed: {
		...mapState({
			categories: (state) => state.categories.categoryList,
		}),
	},
	methods: {
		createCategory() {
			this.isBusy = true;
			this.$store
				.dispatch("createCategory", {
					name: this.category,
				})
				.then((res) => {
					this.category = "";
					this.isBusy = false;
					this.$toasted.show("Category '" + res.name + "' added!");
				})
				.catch((error) => {
					this.isBusy = false;
					this.$toasted.show(error, {
						theme: "bubble",
					});
				});
		},
		deleteCategory(id) {
			this.$store
				.dispatch("deleteCategory", id)
				.then((res) => {
					this.$toasted.show("Category '" + res.name + "' was deleted!", {
						theme: "bubble",
					});
				})
				.catch((error) => {
					this.$toasted.show(error, {
						theme: "bubble",
					});
				});
		},
		updateCategory(id, category) {
			this.$store
				.dispatch("updateCategory", { id, category })
				.then((res) => {
					this.$toasted.show("Category renamed as '" + res.name + "'");
				})
				.catch((error) => {
					this.$toasted.show(error);
				});
		},
	},
	components: {
		Category,
	},
};
</script>

<style></style>
