<template>
    <div>
        <b-navbar toggleable="lg" type="light" variant="">
            <b-navbar-brand href="#">Quizy</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <router-link :to="{ name:'login' }" tag="b-nav-item" > Login </router-link>
                    <router-link :to="{ name:'register' }" tag="b-nav-item" > Register </router-link>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    
}
</script>