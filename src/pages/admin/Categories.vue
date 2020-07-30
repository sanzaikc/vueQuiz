<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h2>Create category</h2>
            <div class="ml-auto d-flex justify-content-between align-items-center">
                <div  v-if="show" class="d-flex align-items-center">
                    <input v-model="category" type="text" class="form-control" placeholder="Category Name">
                    <button class="btn btn-outline-primary ml-2" @click="createCategory">
                        {{ isLoading ? '' : 'Create' }} 
                        <b-spinner v-if="isLoading" small></b-spinner>
                    </button>
                </div>
                <button v-text="show ? 'Cancel' : 'Add new'" class="btn btn-outline-primary ml-3" @click="show=!show" :disabled="isLoading"></button>
            </div>
        </div>
        <hr>
        <div name="slide-fade" class="row">
            <div v-for="(category, key) in categories" :key="key" class="m-2">       
                <category :category="category"></category>        
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
                name: '',
                show: false,
                isLoading: false,
                category: '',
            }
        },
        created(){
            this.$store.dispatch('retrieveCategories');
        },
        computed: {
            ...mapState({
                'categories': state => state.categories.categoryList
            }),
        },
        methods: {
            createCategory(){
                this.show = false;
            }
        },
        components: {
            Category,
        }
    }
</script>

<style>

</style>