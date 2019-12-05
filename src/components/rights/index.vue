<template>
  <div id="rights">
    <div class="row">
      <div class="col-6">
        <h1 style="text-align:start">Права</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <p style="font-size: 20px;line-height: 26px;font-family: MullerBold;color: #413838;">Роли</p>
        <div class="row">
          <div class="col-6" v-if="can('superadmin')">
            <input class="form-control" v-model="newRole" @keyup.prevent.enter="createRole" placeholder="+Название">
          </div>
        </div>
        <table class="table clients table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Название</th>
              <th scope="col">Описание</th>
              <th scope="col"></th>
            </tr>
          </thead>
            <role v-for="(role, idx) in roles" :key="idx" :role="role"></role>
        </table>
      </div>
      <div class="col-6">
        <p style="font-size: 20px;line-height: 26px;font-family: MullerBold;color: #413838;">Разрешения</p>
        <div class="row">
          <div class="col-6" v-if="can('superadmin')">
            <input class="form-control" v-model="newPermission" @keyup.prevent.enter="createPermission" placeholder="+Название">
          </div>
        </div>
        <table class="table clients table-hover">
          <thead>
            <tr>
              <th scope="col">Название</th>
              <th scope="col">Описание</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
              <right :draggable="(can('superadmin') ? true : false)" v-for="(permission, idx) in permissions" :key="idx" :right="permission"></right>
          </tbody>
        </table>
      </div>
   </div>
  </div>
</template>

<script>
  import Right from './parts/right'
  import Role from './parts/role'
  import Acl from '../../utils/acl'

  export default {
    mixins: [Acl],
    name: 'rights',
    data () {
      return {
        newRole:'',
        newPermission: '',
        chosen: false,
      }
    },
    computed: {
      apiUrl () {
        return this.$store.state.app.apiUrl
      },
      permissions(){
        return this.$store.state.app.permissions
      },
      roles(){
        return this.$store.state.app.roles
      },
    },
    components:{
      Right: Right,
      Role: Role,
    },
    methods: {
      createPermission: function () {
        this.$store.dispatch('app/createPermissions', this.newPermission)
        this.newPermission = null
      },
      createRole: function () {
        this.$store.dispatch('app/createRole', this.newRole)
        this.newRole = null
      },
    },
    created () {
      this.$store.dispatch('app/getRoles')
      this.$store.dispatch('app/getPermissions')
    }
  }
</script>