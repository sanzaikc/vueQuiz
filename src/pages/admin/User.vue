<template>
    <div>
        <div v-if="isLoading">Loading</div>

        <table v-else class="table table-hover border-top-0">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Approved</th>
                <th scope="col">Type</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <th scope="row" v-text="index + 1"></th>
                    <td v-text="user.name"></td>
                    <td><b-badge :variant="user.email_verified_at == null ? 'secondary' : 'success'" v-text="user.email_verified_at == null ? 'Pending':'Approved'"></b-badge></td>
                    <td v-text="user.is_admin ? 'Admin' : 'Host'"></td>
                    <td><b-badge :variant="user.is_disabled ? 'danger' : 'success'" v-text="user.is_disabled ? 'Disabled':'Active'"></b-badge></td>
                    <td> <div class="btn btn-outline-primary btn-sm">Edit</div></td>
                </tr>
                
            </tbody>
        </table>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        users: [],
        isLoading: true
      }
    },
    mounted() {
        this.$store.dispatch('retrieveUsers')
            .then(()=>{
                this.isLoading = false
                this.users = this.$store.getters.fetchUsers;
            })
    },
    methods: {

    }

  }
</script>

<style>

</style>