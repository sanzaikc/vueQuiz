<template>
    <div class="border my-2 px-2 py-3 rounded-lg" style="cursor: pointer">
        <div @click="show = !show" class="d-flex justify-content-between">
            <h4 >1. What is the question here?</h4>
            <b-icon icon="arrow-right"></b-icon>
        </div>
        <transition name="fade">
            <ul  class="list list-unstyled">
                <li class="px-3 py-2 mx-2 my-2 border rounded-pill ">Lorem, ipsum.</li>
                <li class="px-3 py-2 mx-2 my-2 border rounded-pill ">Lorem.</li>
                <li class="px-3 py-2 mx-2 my-2 border rounded-pill  answer">Lorem ipsum dolor sit.</li>
                <li class="px-3 py-2 mx-2 my-2 border rounded-pill ">Lorem, ipsum dolor.</li>
            </ul> 
        </transition>
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