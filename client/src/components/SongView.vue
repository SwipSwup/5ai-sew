<template>
  <div>
    <div>
      <page-nav :page="page" @navigated="load"/>
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
                    md-selectable="multiple" md-auto-select>
        <md-table-cell md-label="Title" md-sort-by="name">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="Artist" md-sort-by="email">{{ item.artist }}</md-table-cell>
        <md-table-cell md-label="Genre" md-sort-by="gender">{{ item.genre }}</md-table-cell>
        <md-table-cell md-label="" md-sort-by="">
          <router-link :to="{ name: 'SongEditor', data: item }">
            <md-button>
              <md-icon>edit</md-icon>
            </md-button>
          </router-link>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import Page from '@/models/Page'
import PageNav from '@/components/PageNav'
import Song from '@/components/Song'
import SongEntity from '@/models/Song'
import {deleteSong, loadPage} from '@/services/rest'

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
      songs: {
        mdCount: null,
        mdPage: null,
        mdData: []
      },
    }
  },

  created() {
    this.load()
  },

  methods: {
    load(pageNum = 0, pageSize) {
      loadPage(SongEntity, pageNum, {pageSize})
          .then(page => {
            this.page = page
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
      deleteSong(this.selected[0])
          .then(() => {
            this.load(0, 100)
          });
    }
  }
}
</script>

<style scoped>

</style>