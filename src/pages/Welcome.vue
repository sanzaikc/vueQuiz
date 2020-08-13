<template>
    <div class="row h-100 d-flex align-items-center">
       <div class="col-md-6 bg-white h-100 d-flex align-items-center">
           <div class="ml-4">
               <p class="display-4">Welcome to Quizy,</p>
               <h3 class="text-secondary">Are you bored sitting in your house thinking about when the pandemic is over?</h3>
               <h3 class="text-secondary"> Well, get ready to play #exciting, #imersive and #fun quiz.</h3>
           </div>
       </div>
       <div class="col-md-6">
           <div class=" col-md-8 mx-auto p-4">
                <h3>Join a Quiz</h3>
                <b-form @submit.prevent="join" class="bg-white p-4 rounded-lg shadow"> 
                    <b-form-group id="input-group-2" label="Name" label-for="name">
                        <b-form-input
                            id="name"
                            type="text"
                            v-model="name"
                            placeholder="Enter name">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-2" label="Pin" label-for="pin">
                        <b-form-input
                            id="pin"
                            type="text"
                            v-model="pin"
                            placeholder="Enter pin">
                        </b-form-input>
                    </b-form-group>
                    <b-button type="submit" variant="outline-primary w-100">
                        {{ isBusy ? 'Joining' : 'Join Quiz' }}
                        <b-spinner v-if="isBusy"
                            small
                            type="grow"
                            class="ml-2">
                        </b-spinner>
                    </b-button>
                    <hr>
                    <router-link :to="{ name: 'login' }" 
                        class="btn btn-outline-info w-100">Host Quiz
                    </router-link>
                </b-form>    
           </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    mounted(){
        document.title = "Welcome to Quizy";
    },
    data(){
        return{
            isBusy: false,
            name: '',
            pin: ''
        }
    },
    methods: {
        join(){
            this.isBusy = true
            axios.post('player', {
                name: this.name,
                pin: this.pin
            })
            .then(res => {
                if(res){
                    console.log(res.data);
                     this.isBusy = false;
                }
            })
            .catch(error => error.response && console.log(error.response.data));
        }
    }
}
</script>