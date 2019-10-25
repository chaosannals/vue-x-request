<template>
  <div class="about">
    <h1>{{textByGet}}</h1>
    <h1>{{textByPost}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textByGet: "",
      textByPost: ""
    };
  },
  created() {
    this.$ajax.get("/some/get").then(response => {
      this.textByGet = response.data.custom;
    });
    this.$ajax.post("/some/post").then(response => {
      this.textByPost = response.data.custom;
    });
  }
};
</script>