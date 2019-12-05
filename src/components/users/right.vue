<template>
    <div id="rights">
    <div class="row">
      <div class="col-12" v-if="user">
        <h1 style="text-align:start">{{ user.username }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <p style="font-size: 20px;line-height: 26px;font-family: MullerBold;color: #413838;">Привязанные</p>
        <table class="table clients table-hover" @dragover.prevent @drop.prevent="drop($event)">
          <thead>
            <tr>
              <th scope="col">Название</th>
              <th scope="col">Описание</th>
              <th scope="col" v-if="can('rbacManage')"></th>
            </tr>
          </thead>
            <tbody v-for="(urole, idx) in rolesByUser" :key="idx">
                <tr :id="urole.name">
                    <td>{{ urole.name }}</td>
                    <td>{{ urole.description }}</td>
                    <td v-if="can('rbacManage')" @click="revoke(urole.name)"><i class="fas fa-trash"></i></td>
                </tr>
            </tbody>
        </table>
      </div>
      <div class="col-6">
        <p style="font-size: 20px;line-height: 26px;font-family: MullerBold;color: #413838;">Оставшиеся</p>
        <table class="table clients table-hover">
          <thead>
            <tr>
              <th scope="col">Название</th>
              <th scope="col">Описание</th>
            </tr>
          </thead>
           <tbody v-for="(role, idx) in roles" :key="idx" :draggable="(can('rbacManage') ? true : false)" @dragstart="dragStart($event)" :id="role.name">
               <tr>
                <td>{{ role.name }}</td>
                <td>{{ role.description }}</td>
              </tr>
            </tbody>
        </table>
      </div>
      <div class="col-6 offset-3" style="margin-top:50px">
        <p style="font-size: 20px;line-height: 26px;font-family: MullerBold;color: #413838;">Разрешения</p>
        <table class="table clients table-hover">
          <thead>
            <tr>
              <th scope="col">Название</th>
              <th scope="col">Описание</th>
            </tr>
          </thead>
           <tbody v-for="(perm, idx) in permissions" :key="idx">
               <tr>
                <td>{{ perm.name }}</td>
                <td>{{ perm.description }}</td>
              </tr>
            </tbody>
        </table>
      </div>
   </div>
  </div>
</template>
<script>
    import Http from '../../utils/http'
    import Acl from '../../utils/acl'
    export default {
        mixins: [Acl],
        data () {
            return {
                rolesByUser: {},
                user: {},
                permissions: {},
            }
        },
        computed: {
            apiUrl () {
                return this.$store.state.app.apiUrl
            },
            roles(){
                return this.$store.state.app.roles
            },
        },
        methods: {
            assign(role) {
                var that = this
                var user_id = this.$route.params.id
                Http.post(that.apiUrl + 'role/assign', {"name": role, "userId": user_id})
                    .then(function () {
                        that.getRolesByUser()
                        that.getPermissions()
                    })
            },
            revoke(role) {
                var that = this
                var user_id = this.$route.params.id
                if (!confirm('Вы действительно хотите снять роль ' + role + ' с этого пользователя?')) {
                    return
                }
                Http.post(that.apiUrl + 'role/revoke', {"name": role, "userId": user_id})
                    .then(function () {
                        that.getRolesByUser()
                        that.getPermissions()
                    })
            },
            getUser() {
                var that = this
                var user_id = this.$route.params.id
                Http.get(that.apiUrl + 'user?id=' + user_id)
                 .then(function (response) {
                     that.user = response.data[0]
                 })
            },
            getRolesByUser() {
                var that = this
                var user_id = this.$route.params.id
                Http.get(that.apiUrl + 'role?user_id=' + user_id)
                .then(function (response) {
                    that.rolesByUser = response.data
                })
            },
            getPermissions() {
                var that = this
                var user_id = this.$route.params.id
                Http.get(that.apiUrl + 'role/permissions?user_id=' + user_id)
                    .then(function(response) {
                        that.permissions = response.data
                    })
            },
            dragStart(e) {
                var assignRole = e.target.id
                e.dataTransfer.setData('assign_role', assignRole)           },
            drop (e) {
                var assignRole = e.dataTransfer.getData('assign_role')
                this.assign(assignRole)
            },
        },
        created () {
            this.$store.dispatch('app/getRoles')
            this.getRolesByUser()
            this.getUser()
            this.getPermissions()
        }
    }
</script>