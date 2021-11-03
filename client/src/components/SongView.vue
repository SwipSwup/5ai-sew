<template>
  <div>
    <md-table v-model="page.entities" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h1 class="md-title">Songs</h1>
      </md-table-toolbar>

      <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }"
                    md-selectable="multiple" md-auto-select>
        <md-table-cell md-label="Title" md-sort-by="name">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="Artist" md-sort-by="email">{{ item.artist }}</md-table-cell>
        <md-table-cell md-label="Genre" md-sort-by="gender">{{ item.genre }}</md-table-cell>
      </md-table-row>
      <md-table-pagination
          :md-page-size="rowsPerPage"
          :md-page-options="[3, 5, 10, 15]"
          :md-update="updatePagination"
          :md-data.sync="users" />
    </md-table>

    <p>Selected:</p>
    {{ selected }}


    <!--    <div>-->
    <!--        <page-nav :page="page" @navigated="load"/>-->
    <!--    </div>-->

    <!--    <song-->
    <!--        v-for="s in page.entities"-->
    <!--        :key="s._links.self.href"-->
    <!--        :song="s"-->
    <!--        @onDelete="load(page.number)"-->
    <!--    />-->
  </div>
</template>

<script>
import Page from '@/models/Page'
import PageNav from '@/components/PageNav'
import Song from '@/components/Song'
import SongEntity from '@/models/Song'
import {loadPage} from '@/services/rest'

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
    }
  }
}
</script>

<style scoped>

</style>