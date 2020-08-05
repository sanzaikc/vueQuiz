<template>
    <div>
        <div v-if="disabled"> You are not approved yet!</div>
        <div v-else class="d-flex justify-content-around">
            <div class="col-md-4 border-right">
                <div class="d-flex justify-content-center align-items-center border border-info rounded-pill">
                    <h1 class="display-1 text-info">16</h1>
                    <h5 class="ml-3">Quizes</h5>
                </div>
            </div>
            <div class="col-md-2 d-flex align-items-center">
                <h3 class="text-center">You have created</h3>
            </div>
            <div class="col-md-4 border-left">
                <div class="d-flex justify-content-center align-items-center border border-info rounded-pill">
                    <h1 class="display-1 text-info">101</h1>
                    <h5 class="ml-3">Questions</h5>
                </div>
            </div>
        </div>
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