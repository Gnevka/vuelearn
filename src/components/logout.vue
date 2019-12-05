<template>
    <div id="logout">
    </div>
</template>

<script>
  export default {
    name: 'logout',
    created: function () {
      this.$store.dispatch('auth/logout').then(() => {
          this.$router.push('/login')
        })
    },
  }
</script>
