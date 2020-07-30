<template>
    <div>
        <div :class="'border-'+ randColor" class="border rounded px-3 py-1 d-flex justify-content-between align-items-center">
            <h4> {{ category.name }} </h4>
            <div class="ml-4">
                <button class="btn btn-sm"><b-icon icon="pencil" variant="info"></b-icon></button> |
                <button class="btn btn-sm"><b-icon icon="trash" variant="danger"></b-icon></button>
            </div>
        </div>
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
    methods: {
        
    },
    computed: {
        randColor(){
            return this.variants[Math.floor(Math.random() * this.variants.length)];
        }
    }
}
</script>