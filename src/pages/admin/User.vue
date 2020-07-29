<template>
    <div>
        <div v-if="isLoading">Loading</div>

        <table v-else class="table table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, key) in users" :key="key">
                    <th scope="row" v-text="key+1"></th>
                    <td v-text="user.name">
                        <!-- <sub>{{ user.email}}</sub> -->
                    </td>
                    <td>
                        <select class="form-control w-50" v-model="selected" :selected="selected">
                            <option v-for="(type, key) in types" :key="key" value="type.value" v-text="type.type">  </option>
                        </select>
                    </td>
                    <td><b-badge :variant="user.is_disabled ? 'danger' : 'success'" v-text="user.is_disabled ? 'Disabled':'Active'"></b-badge></td>
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
        isLoading: true,
        types: [
            {type: 'Admin', value: '1'},
            {type: 'Host', value: '0'},
        ],
        selected: 'Admin'
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