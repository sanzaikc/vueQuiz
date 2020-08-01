<template>
  <div>
    <div class="row vh-100">
      <div class="col-md-2 border-right">
        <b-nav vertical class="w-100 text py-3">
          <router-link :to="{ name: 'host.home' }" tag="b-nav-item" active-class="activeTab">
            <b-icon icon="house" variant="dark" @click="edit=false" class="mr-2"></b-icon>Home
          </router-link>
          <router-link :to="{ name: 'host.quiz' }" tag="b-nav-item" active-class="activeTab">
            <b-icon icon="book" variant="dark" @click="edit=false" class="mr-2"></b-icon>Quiz
          </router-link>
          <router-link :to="{ name: 'host' }" tag="b-nav-item">
            <b-icon icon="question" variant="dark" @click="edit=false" class="mr-2"></b-icon>Questions
          </router-link>
        </b-nav>
      </div>
      <div class="col-md-10 pl-4 py-3">
        <transition name="slide-fade" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.title = "Host";
  },
};
</script>

<style scoped>
.activeTab,
a {
  background-color: #dbf3fc;
  border-radius: 2rem;
  font-size: 1rem;
  font-weight: bold;
}
</style>