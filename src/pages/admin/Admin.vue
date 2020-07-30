<template>
    <div>
        <div class="row vh-100">
            <div class="col-md-2 border-right">
                <b-nav vertical class="w-100 text py-3">
                    <router-link :to="{ name: 'admin.users' }" tag="b-nav-item"  active-class="activeTab">Users</router-link>
                    <router-link :to="{ name: 'admin.categories' }" tag="b-nav-item" active-class="activeTab">Categories</router-link>
                    <router-link :to="{ name: 'admin.users' }" tag="b-nav-item">Quiz</router-link>
                </b-nav>
            </div>
            <div class="col-md-10 pl-4 py-3">
                <transition name="slide-fade" mode="out-in">
                    <router-view ></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted(){
        document.title ="Admin";
    }
    
}
</script>

<style scoped>
    .activeTab, a{
        background-color: #dbf3fc;
        /* border: 1px solid grey; */
        border-radius: 2rem ;
        color: black;
        font-size: 1rem;
        font-weight: bold;
    }
</style>