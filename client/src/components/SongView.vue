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
import axios from 'axios'

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
            axios
                .get('http://localhost:8080/api/songs')
                .then(response => {
                    console.log(response)
                    this.songs = response.data._embedded.songs
                })
        }
    },
}
</script>

<style scoped>

</style>