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
  data() {
    return {
      socket: null
    };
  },
  computed: {
    version() {
      return process.env.VERSION;
    }
  },
  created() {
    this.$script.request("/one.js").then(() => {
      this.$script.request("/two.js");
    });
    // this.socket = this.$socket.connect('some/sock');
    // this.$socket.send(this.socket, 'aaaa');
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
