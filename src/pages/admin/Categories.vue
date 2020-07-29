<template>
    <div class="">
        <h2>Category Component</h2>
        <div v-for="(category, key) in categoryList" :key="key" class="row">
            <category :category="category"></category>
        </div>
    </div>
</template>

<script>
    import Category from '../../components/Category.vue' ;
    export default {
        data(){
            return{
                categoryList: [],
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