<template>
    <div>
        <div v-if="isLoading">Loading</div>
        <div v-else>
            <div class="d-flex justify-content-between align-items-center">
                <h2>Categories</h2>
                <div class="ml-auto d-flex justify-content-between align-items-center">
                    <transition name="slide-fade" mode="out-in"> 
                        <div  v-if="show" class="d-flex align-items-center">
                            <input v-model="category" type="text" class="form-control" placeholder="Category Name">
                            <button class="btn btn-outline-primary ml-2" @click="createCategory" :disabled="isBusy">
                                {{ isBusy ? '' : 'Create' }} 
                                <b-spinner v-if="isBusy" small></b-spinner>
                            </button>
                        </div>
                    </transition>
                    <button v-text="show ? 'Cancel' : 'Add new'" class="btn btn-outline-primary ml-3" @click="show=!show" ></button>
                </div>
            </div>
            <hr>
            <div  class="row">
                <div v-for="(category, key) in categories" :key="key" class="m-2">       
                    <category :category="category" @onDelete="deleteCategory" @onUpdate="updateCategory"></category>        
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Category from '../../components/Category.vue' ;
    import {mapState} from 'vuex';

    export default {
        data(){
            return{
                show: false,
                isLoading: true,
                isBusy: false,
                category: ''
            }
        },
        mounted(){
            this.$store.dispatch('retrieveCategories').finally(()=>{
                this.isLoading = false;
            });
        },
        computed: {
            ...mapState({
                'categories': state => state.categories.categoryList
            }),
        },
        methods: {
            createCategory(){
                this.isBusy = true;
                this.$store.dispatch('createCategory', {
                    name: this.category
                })
                .then(()=> {
                    this.category = '';
                    this.show = false;
                    this.isBusy = false;
                })
                .catch(error => {
                    console.log(error);
                    this.isBusy = false;
                });
            },
            deleteCategory(id){  
                this.$store.dispatch('deleteCategory', id);
            },
            updateCategory(id, category){
                this.$store.dispatch('updateCategory', { id, category})
            }
        },
        components: {
            Category,
        }
    }
</script>

<style>

</style>