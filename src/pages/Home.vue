<template>
    <div>
        <p v-if="isDisabled">You are disabled</p>
        <div v-else>
            <div class="d-flex justify-content-between align-items-center">
                <h2>Welcome, {{ currentUser.name }} </h2> 
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
    mounted(){
        document.title = "Home";
    },
    computed: {
        ...mapGetters([
            'isDisabled'
        ]), 
        ...mapState({
            'currentUser': state => state.auth.currentUser,
        })   
    }
}
</script>