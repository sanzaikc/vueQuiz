<template>
    <div>
        <div v-if="disabled"> You are not approved yet!</div>
        <div v-else class="d-flex justify-content-around">
            <div class="col-md-6">
                <div class="d-flex justify-content-center align-items-center">
                    <animated-counter :num="10"></animated-counter>
                    <h3 class="ml-3 text-secondary">Quizes</h3>
                </div>
            </div>
            <div class="col-md-6">
                <div class="d-flex justify-content-center align-items-center">
                    <animated-counter :num="20"></animated-counter>
                    <h3 class="ml-3 text-secondary">Questions</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import AnimatedCounter from '../../components/AnimatedCounter.vue'
export default {
    mounted(){
        document.title = "Home";
    },
    computed: {
        ...mapState({
            'disabled': state => state.auth.currentUser.is_disabled,
        })
    },
    components: {
        AnimatedCounter,
    }
}
</script>