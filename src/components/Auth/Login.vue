<template>
  <div class="mx-auto col-md-4 p-4 rounded-lg bg-light" >
    <h3>Login</h3>
    <hr>
    <b-form @submit.prevent="onLogin()">
      <b-form-group
        id="input-group-2"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Password:" label-for="password">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>

      <div class="d-flex justify-content-between align-items-center ">
          <b-button type="submit" variant="outline-primary">Login</b-button>
          <router-link :to={} tag="b-link" class="text-center" >Forgot password?</router-link>
      </div>
    </b-form>
  </div>
</template>

<script>
  export default {
    // created(){
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
            email: '',
            password: '',
        },
      }
    },
    methods: {
      onLogin(){
        this.$store.dispatch('login', this.form)
          .then(()=> {
            this.$router.push({ name: 'home'});
          })
      },
    }
  }
</script>
