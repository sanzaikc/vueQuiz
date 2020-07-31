<template>
    <div>
        <p v-if="isDisabled">You are disabled</p>
        <div v-else>
            You got approved
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'isDisabled'
        ]),     
    }
}
</script>