<template>
    <div>
        <h2>Admin</h2>
        <router-link :to="{ name:'users' }" tag="b-nav-item">Users</router-link>
        <router-link :to="{ name:'categories' }" tag="b-nav-item">Categories</router-link>
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    
}
</script>