<template>
  <div class="mx-auto col-md-4 p-4 rounded-lg bg-light">
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(onLogin)">
        <div v-if="serverError" class="text-danger mb-3">{{ serverError }}</div>

        <validation-provider
            name="Email"
            :rules="{ required: true, email: true }"
            v-slot="validationContext"
          >
          <b-form-group id="input-group-2" label="Email" label-for="email">
              <b-form-input
                id="email"
                v-model="form.email"
                placeholder="Enter email"
                :state="getValidationState(validationContext)"
                aria-describedby="input-1-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
        </validation-provider>

        <validation-provider
            name="Password"
            :rules="{ required: true, min: 6}"
            v-slot="validationContext"
          >
          <b-form-group id="input-group-3">
          <div class="d-flex justify-content-between align-items-center">
            <label for="password">Password</label>
                <small
                    class="text-primary mb-2"
                    role="button"
                    @click.exact="showPassword = !showPassword"
                    v-text="showPassword ? 'Hide password' : 'Show password'"
                    ></small>
              </div>
              <b-form-input
                id="password"
                v-model="form.password"
                placeholder="Enter Password"
                :type="showPassword ? 'text' : 'password'"
                :state="getValidationState(validationContext)"
                aria-describedby="input-2-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-2-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
        </validation-provider>

        <div class="d-flex flex-column align-items-start">
          <router-link :to="{}" tag="b-link" class="text-center mb-3">Forgot password?</router-link>
          <b-button type="submit" variant="outline-primary w-100">
            {{ isLoading ? 'Loggin in' : 'Login' }} <b-spinner v-if="isLoading" small type="grow" class="ml-3"></b-spinner>
          </b-button>
        </div>
      </b-form>
    </validation-observer>

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
      isLoading: false,
      form: {
        email: "",
        password: "",
      },
      serverError: ''
    };
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    onLogin() {
      this.isLoading = true;
      this.$store.dispatch("login", this.form)
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          this.isLoading = false;
          console.log(error.response.data);
          this.serverError = error.response.data.message;
        });
    },
  },
};
</script>
