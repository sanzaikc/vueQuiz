<template>
    <div>
        <h1>Home</h1>
        <div v-if="disabled"> You are not approved yet!</div>
        <div v-else> Welcome </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    mounted(){
        document.title = "Home";
    },
    computed: {
        ...mapState({
            'disabled': state => state.auth.currentUser.is_disabled,
        })
    }
}
</script>