<template>
    <div>
        <p v-if="isDisabled">You are disabled</p>
        <div v-else>
            Welcome {{ currentUser.name }}
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
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