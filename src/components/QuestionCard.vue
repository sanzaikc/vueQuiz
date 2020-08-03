<template>
    <div style="cursor: pointer">
        <div @click="show = !show" class="d-flex justify-content-between">
            <h4 >1. What is the question here?</h4>
            <b-icon :icon="show ? 'chevron-up' : 'chevron-down'"></b-icon>
        </div>
        <transition name="fade">
            <ul v-if="show" class="list list-unstyled d-flex">
                <li class="px-3 py-2 mx-2 border rounded-pill text-center">Lorem, ipsum.</li>
                <li class="px-3 py-2 mx-2 border rounded-pill text-center">Lorem.</li>
                <li class="px-3 py-2 mx-2 border rounded-pill text-center answer">Lorem ipsum dolor sit.</li>
                <li class="px-3 py-2 mx-2 border rounded-pill text-center">Lorem, ipsum dolor.</li>
            </ul> 
        </transition>
        <hr>
    </div>
</template>

<script>
export default {
    data(){
        return{
            show: false
        }
    },
}
</script>

<style scoped>
    .answer{
        background-color: #85db8a;
        color: white;
    }
    .answer:hover{
        background-color: #a1eda5;
    }
</style>