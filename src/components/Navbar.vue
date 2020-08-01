<template>
  <div>    
    <b-navbar toggleable="lg" type="light" class="border-bottom">
      <b-navbar-brand href="#">Quizy</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
         <!-- Right aligned nav items  -->
        <b-navbar-nav v-if="loggedIn && !isAdmin" class="ml-5">
          <router-link :to="{ name: 'home' }" tag="b-nav-item" active-class="active font-bold">Home</router-link>
          <router-link :to="{ name: 'quiz' }" tag="b-nav-item" active-class="active font-bold">Quiz</router-link>

        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <router-link v-if="!loggedIn" :to="{ name: 'login'}"  tag="b-nav-item" active-class="active font-bold">Login</router-link>
          <router-link v-if="!loggedIn" :to="{ name: 'register'}" tag="b-nav-item" active-class="active font-bold">Register</router-link>
         
          <b-nav-item-dropdown right v-if="loggedIn">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <span> {{ user.name }} </span>
            </template>
            <b-dropdown-item> {{ user.email }} </b-dropdown-item>
            <router-link :to="{ name: 'logout' }" tag="b-dropdown-item">Logout</router-link>
          </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'; 
export default {
  computed: {
    ...mapState({
      'user': state => state.auth.currentUser,
    }),
    ...mapGetters([
      'loggedIn',
      'isAdmin'
    ]),
  },
};
</script>

<style scoped>
.font-bold {
  font-weight: 500;
}
</style>