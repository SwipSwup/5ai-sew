<template>
  <div>
    <song
        v-for="s in songs"
        :key="s._links.self.href"
        :song="s"
    />
  </div>
</template>

<script>
import Song from '@/components/Song'
import SongEntity from '@/models/Song'
import { loadPage } from '@/services/rest'

export default {
    name: 'SongView',

    components: {
        Song,
    },

    data() {
        return {
            songs: [],
        }
    },

    created() {
        this.load()
    },

    methods: {
        load() {
            loadPage(SongEntity)
                .then(entities => {
                    this.songs = entities
                })
        }
    },
}
</script>

<style scoped>

</style>