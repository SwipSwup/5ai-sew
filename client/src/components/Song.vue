<template>
  <div class="md-layout">
    <div class="md-layout-item">{{ song.title }}</div>
    <div class="md-layout-item md-size-20">{{ song.artist }}</div>
    <div class="md-layout-item md-size-20">{{ song.genre }}</div>
    <div class="md-layout-item md-size-5">
      <md-button class="md-icon-button" @click="this.del">
        <md-icon>close</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
import { deletEntry } from '@/services/rest'

export default {
    name: 'Song',
    props: {
        song: Object,
        required: true,
    },
  methods: {
      del() {
        deletEntry(this.song)
            .then(
                () => this.$emit("onDelete")
            )
      }
  }
}
</script>

<style scoped>

</style>