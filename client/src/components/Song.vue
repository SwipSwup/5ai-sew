<template>
  <div class="md-layout">
    <div class="md-layout-item">{{ song.title }}</div>
    <div class="md-layout-item md-size-20">{{ song.artist }}</div>
    <div class="md-layout-item md-size-20">{{ song.genre }}</div>
  </div>
</template>

<script>
export default {
    name: 'Song',
    props: {
        song: Object,
        required: true,
    },
}
</script>

<style scoped>

</style>