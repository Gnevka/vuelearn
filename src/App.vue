<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <navigation v-if="isAuthenticated"/>
        <div class="col padding_none" style="padding-left:0;padding-right:0;">
          <navbar v-if="isAuthenticated"/>
          <div class="content_wrap">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/navbar'
import Navigation from './components/navigation'

export default {
  name: 'app',
  data () {
      return {
        name: 'app',
      }
    },
  components: {
    Navbar,
    Navigation
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.auth.isAuthenticated
    }
  },
  methods: {
    check: function () {
      this.$store.dispatch('auth/check')
    }
  },
  created () {
    //this.check()
  }
}
</script>

<style>


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>

