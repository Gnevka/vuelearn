<template>
  <div class="profile">
    <div class="row">
      <div class="col-3" style="text-align:start">
        <h1>Мой профиль</h1>
      </div>
      <div class="col-2">
        <p style="font-size:22px;text-align:start;line-height: 26px;font-family: MullerBold;color: #797373;">Настройки</p>
      </div>
      <div class="col-2">
        <a :href="'/rightsUser/' + this.$route.params.id"><p style="font-size:22px;text-align:start;line-height: 26px;font-family: MullerBold;color: #797373;">Права</p></a>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-3">
        <img src="../../../static/img/avatar.png" style="max-width:300px">
      </div>
      <div class="col-8" v-if="user">
        <div class="input-group col-6 mt-4">
          <div class="input-group-prepend">
            <span class="input-group-text" id="" style="min-width:99px">Логин:</span>
          </div>
          <input type="text" class="form-control" v-model="user.username" @change.prevent="updateUser">
        </div>
        <div class="input-group col-6 mt-4">
          <div class="input-group-prepend">
            <span class="input-group-text" id="" style="min-width:99px">Почта:</span>
          </div>
          <input type="text" class="form-control" disabled v-model="user.email" @change.prevent="updateUser">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Http from '../../utils/http'

  export default {
    name: 'profile',
    data () {
      return {
        user: {},
      }
    },
    computed: {
      apiUrl () {
        return this.$store.state.app.apiUrl
      },
    },
    methods: {
      getUser: function () {
        var that = this
        Http.get(that.apiUrl + '/user?id=' + this.$route.params.id)
          .then(function (response) {
            that.user = response.data[0]
          })
      },
      updateUser: function () {
        var that = this
        Http.post(that.apiUrl + '/user/update', that.user)
          .then(function (response) {
            that.user = response.data
          })
      },
    },
    created () {
      this.getUser()
    }
  }
</script>
