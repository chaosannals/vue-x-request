<template>
  <div id="app">
    <h5>{{version}}</h5>
    <div id="nav">
      <router-link to="/">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    version() {
      return process.env.VERSION;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
