<template>
  <div>
    <div>
      <page-nav class="nav" :page="page" @navigated="load"/>
    </div>
    <md-table v-model="page.entities" md-card @md-selected="onSelect">

      <md-table-toolbar>
        <h1 class="md-title">Songs</h1>
      </md-table-toolbar>
      <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button" @click="del">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }"
                    md-selectable="multiple">
        <md-table-cell md-label="Title" md-sort-by="title">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="Artist" md-sort-by="artist">{{ item.artist }}</md-table-cell>
        <md-table-cell md-label="Genre" md-sort-by="genre">{{ item.genre.toString() }}</md-table-cell>
        <md-table-cell md-label="">
          <md-button class="md-icon-button" :to="{ name: 'editSong', params: {  song: item }}">
            <md-icon>edit</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-speed-dial class="md-bottom-right">
      <md-speed-dial-target :to="{ name: 'editSong' }">
        <md-icon>add</md-icon>
      </md-speed-dial-target>
    </md-speed-dial>
  </div>
</template>

<script>
import Page from '@/models/Page'
import PageNav from '@/components/PageNav'
import Song from '@/components/Song'
import SongEntity from '@/models/Song'
import {deletEntry, loadPage} from '@/services/rest'

export default {
  name: 'SongView',

  components: {
    PageNav,
    Song,
  },
  data() {
    return {
      page: new Page(),
      selected: [],
      entities: {
        mdCount: null,
        mdPage: null,
        mdData: []
      },
      rowsPerPage: 3,
    }
  },

  created() {
    this.load()
  },

  methods: {
    load(pageNum = 0) {
      loadPage(SongEntity, pageNum, {size: 5})
          .then(entities => {
            this.page = entities
          })
    },
    onSelect(items) {
      this.selected = items
    },
    getAlternateLabel(count) {
      let plural = ''

      if (count > 1) {
        plural = 's'
      }

      return `${count} user${plural} selected`
    },
    del() {
      deletEntry(this.selected).then(() => this.load(this.page.number))
    }
  }
}
</script>

<style scoped>
.nav {
  margin-bottom: 15px;
}
</style>