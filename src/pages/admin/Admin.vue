<template>
    <div>
        <div>
            <b-card title="Card Title" no-body>
                <b-card-header header-tag="nav">
                    <b-nav card-header tabs>
                        <router-link :to="{ name: 'admin.users' }" tag="b-nav-item" active="window.location.pathname === '/admin'">Users</router-link>
                        <router-link :to="{ name: 'admin.categories' }" tag="b-nav-item" active-class="active">Categories</router-link>
                    </b-nav>
                </b-card-header>
                <b-card-body>
                    <router-view></router-view>
                </b-card-body>
            </b-card>
        </div>
        <hr>
    </div>
</template>

<script>
export default {
    
}
</script>