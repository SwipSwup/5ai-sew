<template>
  <div>{{ this.name }}</div>
</template>

<script>
export default {
  name: "SongEditor",
  data() {
    return {
      name: String
    }
  },
  mounted() {
    console.log(this.$route.params);
    this.name = this.$route.params.data.title;
  }
}
</script>

<style scoped>

</style>