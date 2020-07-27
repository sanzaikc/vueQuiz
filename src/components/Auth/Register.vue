<template>
  <div class="mx-auto col-md-4 p-4 rounded bg-light" >
    <h3>Register</h3>
    <hr>
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Name:"
        label-for="name"
      >
        <b-form-input
          id="name"
          v-model="form.name"
          type="text"
          required
          placeholder="Enter Name "
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Password:" label-for="password">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Confirm Password:" label-for="cpassword">
        <b-form-input
          id="cpassword"
          v-model="form.password_confirmation"
          type="password"
          required
          placeholder="Enter password again"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="outline-primary" class="ml-auto">Register</b-button>
    </b-form>
  </div>
</template>

<script>
// import axios from 'axios';
  export default {
    //   created(){
    //   let token = JSON.parse(localStorage.getItem('token'));
    //   if(token) axios.get('/users/me', { headers: {
    //       'Authorization': 'Bearer '+ token,
    //   }})
    //   .then(this.$router.push({name:'home'})
    //   )
    // },
    data() {
      return {
        form: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
      }
    },
    methods: {
      onSubmit() {
        this.$store.dispatch('register')
        // axios.post('/register',  this.form )
        // .then(res =>{
        //     localStorage.setItem('token', JSON.stringify(res.data.token));
        //     this.$route.push({name:'login'});
        // })
        // .catch(error => {
        //     console.log(error.response.data);
        // })
      },
    }
  }
</script>
