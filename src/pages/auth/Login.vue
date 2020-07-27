<template>
  <div class="mx-auto col-md-4 p-4 rounded-lg bg-light">
    <b-form @submit.prevent="onLogin()">
      <b-form-group id="input-group-2" label="Email" label-for="email">
        <b-form-input id="email" v-model="form.email" type="email" placeholder="Enter email"></b-form-input>
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
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>

      <div class="d-flex flex-column align-items-start">
        <router-link :to="{}" tag="b-link" class="text-center mb-3">Forgot password?</router-link>
        <b-button type="submit" variant="outline-primary w-100">Login</b-button>
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
  created() {
    document.title = "Login";
  },
  data() {
    return {
      showPassword: false,
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onLogin() {
      this.$store.dispatch("login", this.form)
        .then(() => {
          this.$router.push({ name: "home" });
        });
    },
  },
};
</script>
