<template>
    <div>
        <h1><b-badge v-text="category.name" :variant="randColor"></b-badge></h1>
    </div>
</template>

<script>
export default {
    props: {
        category: { type: Object},
    },
    data(){
        return{
            variants: ["success", "info", "danger", "warning", "secondary", "primary" ],
        }
    },
    computed: {
        randColor(){
            return this.variants[Math.floor(Math.random() * this.variants.length)];
        }
    }
}
</script>