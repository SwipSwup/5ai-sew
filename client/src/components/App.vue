<template>
  <md-app
    v-cloak
    md-waterfall
    md-mode="fixed"
  >
    <md-app-toolbar class="md-primary md-dense">
      <div class="md-toolbar-section-start">
        <router-link to="/" class="md-title">YouSong</router-link>
      </div>

      <div class="md-subheading md-toolbar-section-end">
        <router-link to="/info" class="md-title">Info</router-link>
      </div>
    </md-app-toolbar>

    <md-app-content>
      <router-view></router-view>
    </md-app-content>
  </md-app>
</template>

<script>
import SongView from '@/components/SongView'

export default {
    name: 'App',

    components: {
        SongView,
    },

    methods: {
    },
}
</script>

<style scoped>
</style>
