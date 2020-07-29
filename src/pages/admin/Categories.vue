<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h2>Create new category</h2>
            <button class="btn btn-outline-primary btn-sm">Add new</button>
        </div>

        <hr>
        <transition-group name="slide-fade" class="row">
            <div v-for="(category, key) in categoryList" :key="key" class="mx-3">       
                <category :category="category"></category>
            </div>
        </transition-group>
    </div>
</template>

<script>
    import Category from '../../components/Category.vue' ;
    export default {
        data(){
            return{
                categoryList: [],
                name: ''
            }
        },
        created(){
            this.$store.dispatch('retrieveCategories')
                .then(()=>{
                    this.categoryList = this.$store.getters.fetchCategories
                });
        },
        components: {
            Category,
        }
    }
</script>

<style>

</style>