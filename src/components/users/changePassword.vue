<template>
  <div class="profile">
    <div class="row">
      <div class="col-3" style="text-align:start">
        <h1>Мой профиль</h1>
      </div>
      <div class="col-9">
        <p style="font-size:22px;text-align:start;line-height: 26px;font-family: MullerBold;color: #797373;">Настройки</p>
      </div>
    </div>
    <hr>
    <div v-if="message" :class="'alert alert-' + messageclass">
        {{ message }}
    </div>
    <div class="input-group col-6 mt-4">
        <div class="input-group-prepend">
        <span class="input-group-text" id="" style="min-width:160px">Новый пароль:</span>
        </div>
        <input type="password" class="form-control" v-model="password" autocomplete="off">
    </div>
    <div class="input-group col-6 mt-4">
        <div class="input-group-prepend">
        <span class="input-group-text" id="" style="min-width:160px">Подтверждение:</span>
        </div>
        <input type="password" class="form-control" v-model="confirm" autocomplete="off">
    </div>
    <div class="col-3 mt-4">
        <button class="btn btn-success" style="float:left" @click="changePassword">Сменить</button>
    </div>
  </div>
</template>

<script>
  import Http from '../../utils/http'

  export default {
    name: 'profile',
    data () {
      return {
        password: null,
        confirm: null,
        messageclass: null,
        message: null,
      }
    },
    computed: {
      apiUrl () {
        return this.$store.state.app.apiUrl
      },
    },
    methods: {
      changePassword: function () {
        var that = this
        Http.post(that.apiUrl + 'auth/changepassword', {"password": that.password, "confirm": that.confirm})
          .then(function (response) {
            that.password = null,
            that.confirm = null,
            that.message = 'Пароль успешно сменён',
            that.messageclass = 'success',
            console.log(response)
          })
      },
    },
  }
</script>
