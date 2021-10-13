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
import axios from 'axios'

// Basis-URL aller REST-API-Endpunkte
const API_BASE = 'http://localhost:8080/api'

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
                .get(`${API_BASE}/${SongEntity.path}`)
                .then(response => {
                    this.songs = response.data._embedded[SongEntity.path].map(obj => new SongEntity(obj))
                    console.log('SongView.load() OK', this.songs)
                })
                .catch(response => {
                    console.error('SongView.load() error', response)
                })
        }
    },
}
</script>

<style scoped>

</style>