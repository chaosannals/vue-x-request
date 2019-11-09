<template>
  <div class="about">
    <h1>{{textByGet}}</h1>
    <h1>{{textByPost}}</h1>
    <h1>{{textByJsonp}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textByGet: "",
      textByPost: "",
      textByJsonp: ""
    };
  },
  created() {
    // Get 请求。
    this.$ajax
      .get("/some/get?a=1", {
        b: 2,
        c: 3
      })
      .then(response => {
        this.textByGet = response.data.custom;
      });

    // Post 请求。
    this.$ajax
      .post("/some/post?a=2", {
        b: 2,
        c: 3
      })
      .then(response => {
        this.textByPost = response.data.custom;
      });

    // JsonP 请求。
    this.$jsonp
      .request("/some/jsonp?a=3", {
        b: 2,
        c: 3
      })
      .then(data => {
        this.textByJsonp = data.custom;
      });
  }
};
</script>