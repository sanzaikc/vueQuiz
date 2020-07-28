<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant class="border-bottom">
      <b-navbar-brand >Quizy</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto d-flex justify-content-between align-items-center">
          <li v-if="!loggedIn">
            <router-link
              :to="{ name:'login' }"
              active-class="active font-bold"
              tag="b-nav-item"
            >Login</router-link>
          </li>
          <li v-if="!loggedIn">
            <router-link
              :to="{ name:'register' }"
              active-class="active font-bold"
              tag="b-nav-item"
            >Register</router-link>
          </li>
          <li v-if="loggedIn" >{{ user.name }}</li>
          <li v-if="loggedIn">
            <router-link :to="{ name:'logout' }" tag="b-nav-item">Logout</router-link>
          </li>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    user(){
      return this.$store.getters.currentUser;
    }
  },
};
</script>

<style scoped>
.font-bold {
  font-weight: 500;
}
</style>