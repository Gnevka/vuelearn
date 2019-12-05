<template>
  <div id="users">
    <div class="row">
      <div class="col-6">
        <h1 style="text-align:start">Список пользователей</h1>
      </div>
      <div class="col-6">
        <a v-if="can('rbacManage')" id="add" style="float:right" @click.prevent="addModalShow = true">Добавить</a>
      </div>
    </div>
    <table class="table clients table-hover">
        <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">Id</th>
          <th scope="col">Аватар</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Имя</th>
          <th scope="col">Электронный адрес</th>
          <th scope="col">Статус</th>
          <th scope="col">Создан</th>
          <th scope="col">Права / Роль</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(user, idx) in users" v-bind:key="idx">
            <td>{{ idx + 1 }}</td>
            <td><a :href="'/profile/' + user.id">{{ user.id }}</a></td>
            <td><img src="../../../static/img/avatar.png" style="max-width:30px" ></td>
            <td></td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ userStatuses[user.status] }}</td>
            <td>{{ user.created_at }}</td>
            <td><a v-if="can('rbacManage')" :href="'/rightsUser/' + user.id"><i class="fas fa-tools"></i></a></td>
            <td>
              <i v-if="can('rbacManage')" class="fas fa-trash" @click="deleteUser(user.id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
       <add-form
        @closeAddForm="closeAddForm"
        @addUser="addUser"
        :isVisible="addModalShow"
        :newUser="newUser"/>
  </div>
</template>

<script>
  import Http from '../../utils/http'
  import AddForm from './addForm'
  import Acl from '../../utils/acl'
  export default {
    mixins: [Acl],
    name: 'users',
    data () {
      return {
        users: {},
        addModalShow: false,
        newUser: {
          email: null,
        }, 
      }
    },
    components: {
      AddForm,
    },
    computed: {
      apiUrl () {
        return this.$store.state.app.apiUrl
      },
      userStatuses () {
        return this.$store.state.app.userStatuses
      }
    },
    methods: {
      getUsers: function () {
        var that = this
        this.$store.dispatch('app/getUsers').then((resp) => {
          that.users = resp.data
        })
      },
      deleteUser: function (user_id) {
        var that = this
        if (confirm('Вы действительно хотите удалить пользователя с id ' + user_id + '?')) {
          Http.get(that.apiUrl + 'user/delete?id=' + user_id)
            .then(function (response) {
              that.users = that.getUsers()
              console.log(response)
            })
        }
      },
      addUser: function () {
        var that = this
        Http.post(that.apiUrl + 'user/create', {"User": {"email": that.newUser.email}})
          .then(function (response) {
            that.users = that.getUsers()
            that.newUser.email = null
            that.closeAddForm ()
            console.log(response)
          })
        
      },
      closeAddForm () {
        this.addModalShow = false
      },
    },
    created () {
      this.getUsers()
      this.$store.dispatch('app/getUserStatuses')
    }
  }
</script>
