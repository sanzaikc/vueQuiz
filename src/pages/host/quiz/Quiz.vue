<template>
  <div>
    <transition name="slide-fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  data(){
    return{
        id: this.$route.params.id,
    }
  },
  watch: {
      '$route'(to){
          this.id = to.params.id;
      }
  },
  methods: {
  },   
}
</script>