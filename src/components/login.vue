<template>
  <div class="login_form">
    <div class="container h100">
      <div class="row justify-content-md-center">
        <div class="col-md-auto">

          <section id="s1" class="login_page">
            <div class="inner">
              <div class="wrap" style="text-align:center">
                <h1 style="text-align:center">Авторизация</h1>
                <div v-if="message" class="alert alert-danger">
                    {{ message }}
                </div>
                <form action="" class="login" @submit.prevent="auth">
                  <h4>Ваш логин</h4>
                  <input required v-model="login" id="login" type="text" placeholder="Введите логин" >
                  <h4>Ваш пароль</h4>
                  <input required v-model="password" id = "password"  type="password" placeholder="Введите пароль">
                  <br>
                  <label>
                    <input class="checkbox" type="checkbox" name="checkbox-test">
                    <span class="checkbox-custom"></span>
                    <span class="label">Запомнить пароль</span>
                  </label><br>
                  <a id="recovery" style="float:none" href="/restore">Забыли пароль?</a><br>
                  <a id="recovery" style="float:none" href="/registration">Регистрация</a><br>
                  <input type="submit" style="margin-top:30px" id="submit" value="Войти в систему">
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        login: '',
        password: '',
      }
    },
    computed: {
      message () {
        return this.$store.state.auth.message
      }
    },
    methods: {
      auth: function () {
        const { login, password } = this
        this.$store.dispatch('auth/auth', {login, password}).then(() => {
          this.$router.push('/')
        })
      }
    }
  }
</script>
