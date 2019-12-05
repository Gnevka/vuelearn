
<template>
  
  <div
    class="col white"
    :class="{'mobile': isHideMenu == 'true'}"
    v-if="isAuthenticated === true"
  >
    <div class="menu_wrap">
      <div class="menu">
        <ul id="main_memu">
          <li v-if="can('rbacManage')"><a href="/users">Пользователи</a></li>
          <li v-if="can('superadmin')"><a href="/rights">Права</a></li> 
        </ul>
      </div>
      <hr>
      <a id="hide_menu" @click="changeMenuState()">Скрыть меню</a>
    </div>
  </div>
</template>


<script>
  import Vuex from 'vuex'
  import Acl from '../../utils/acl'
  export default {
    mixins: [Acl],
    name: 'navigation',
    computed: {
      isHideMenu () {
        return this.$store.getters['navigation/isHideMenu']
      },
      isAuthenticated () {
        return this.$store.state.auth.isAuthenticated
      }
    },
    methods: {
      ...Vuex.mapMutations({changeMenuState: 'navigation/changeMenuState'})
    }
  }
</script>
