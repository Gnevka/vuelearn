<template>
  <div>
    <app-header />
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './comp/header'

  export default {
    name: 'inc',
    components: {
      AppHeader: Header
    }
  }
</script>

<style>
  body, html {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
</style>