<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant class="border-bottom">
      <b-navbar-brand href="#">Quizy</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
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
  },
  mounted() {
    console.log(this.$router.currentRoute.path);
  },
};
</script>

<style scoped>
.font-bold {
  font-weight: 500;
}
</style>