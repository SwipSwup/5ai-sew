<template>
  <div>
    <div>
        <page-nav :page="page"/>
    </div>

    <song
        v-for="s in page.entities"
        :key="s._links.self.href"
        :song="s"
    />
  </div>
</template>

<script>
import PageNav from '@/components/PageNav'
import Song from '@/components/Song'
import SongEntity from '@/models/Song'
import { loadPage } from '@/services/rest'

export default {
    name: 'SongView',

    components: {
        PageNav,
        Song,
    },

    data() {
        return {
            page: {},
        }
    },

    created() {
        this.load()
    },

    methods: {
        load() {
            loadPage(SongEntity)
                .then(page => {
                    this.page = page
                })
        }
    },
}
</script>

<style scoped>

</style>