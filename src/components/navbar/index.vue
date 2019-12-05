
<template>
  <div class="user_info">
    <div class="user_info_wrap d-flex float-right" @click="isHideMenu = !isHideMenu">
      <div class="name">{{user.username}}</div>

      <div class="btn-group dropleft" >
        <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src="../../../static/img/user_arr.png" alt="">
        </button>
        <div
          class="dropdown-menu menushow"
          :class="{show: !isHideMenu}"
        >
          <a class="dropdown-item" :href="'/profile/' + user.id">Мой профиль</a>
          <a class="dropdown-item" href="/changepassword">Сменить пароль</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="/logout">Выход</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'navbar',
    data () {
      return {
        isHideMenu: true,
      }
    },
    computed: {
      auth () {
        return this.$store.state.auth.isAuthenticated
      },
      user () {
        return this.$store.state.auth.user
      },
    },
  }
</script>

<style>
  .menushow {
    transform: translate3d(-202px, 0px, 0px);
  }
</style>
