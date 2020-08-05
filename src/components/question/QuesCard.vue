<template>
    <div style="cursor: pointer">
        <div @click="show = !show" class="d-flex justify-content-between">
            <h4> {{ question.body }} </h4>
            <b-icon :icon="show ? 'chevron-up' : 'chevron-down'"></b-icon>
        </div>
        <transition name="fade">
            <ul v-if="show" class="list list-unstyled d-flex">
                <li 
                    v-for="option in question.options" 
                    :key="option.id" 
                    class="px-3 py-2 mx-2 border rounded-pill text-center" 
                    :class="option.id == question.answer.option_id ? 'answer' : ''" 
                    v-text="option.body">
                </li>
            </ul> 
        </transition>
        <hr>
    </div>
</template>

<script>
export default {
    mounted(){
        console.log(this.question);
    },
    props: {
        question: {
            type: Object
        }
    },
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