<template>
  <div class="mx-auto col-md-4 p-4 rounded bg-light">
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="input-group-1" label="Name" label-for="name">
        <b-form-input id="name" v-model="form.name" type="text" required placeholder="Enter Name "></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Email" label-for="email">
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3">
        <div class="d-flex justify-content-between align-items-center">
          <label for="password">Password</label>
          <small
            class="text-primary mb-2"
            role="button"
            @click="showPassword = !showPassword"
            v-text="showPassword ? 'Hide password' : 'Show password'"
          ></small>
        </div>
        <b-form-input
          id="password"
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="outline-primary" class="w-100">Register</b-button>
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
  created() {
    document.title = "Register Account";
  },
  data() {
    return {
      showPassword: false,
      form: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      // axios.post('/register',  this.form )
      // .then(res =>{
      //     localStorage.setItem('token', JSON.stringify(res.data.token));
      //     this.$route.push({name:'login'});
      // })
      // .catch(error => {
      //     console.log(error.response.data);
      // })
    },
  },
};
</script>
