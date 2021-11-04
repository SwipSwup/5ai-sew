<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent>
      <md-card class="md-layout-item ">
        <md-card-header>
          <div class="md-title">{{ song.title }}</div>
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('title')">
            <label for="title">Title</label>
            <md-input name="title" id="title" autocomplete="song-title" v-model="song.title" :disabled="sending"/>
            <span class="md-error" v-if="!$v.song.title.required">The title is required</span>
          </md-field>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('artist')">
                <label for="artist">Artist</label>
                <md-input name="artist" id="artist" autocomplete="song-artist" v-model="song.artist"
                          :disabled="sending"/>
                <span class="md-error" v-if="!$v.song.artist.required">The artist name is required</span>
                <span class="md-error" v-else-if="!$v.song.artist.minlength">Invalid first artist name</span>
              </md-field>
            </div>

            <!-- TODO implement -->
            <div class="md-layout-item md-small-size-100">
              <md-chips class="md-primary" v-model="song.genre" md-placeholder="Add genre..." md-check-duplicated>
                <label>Genre</label>
              </md-chips>
            </div>
          </div>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending"/>

        <md-card-actions>
          <md-button class="md-primary" :disabled="sending" @click="validateUser">Save</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="songSaved">The song has been updated</md-snackbar>
    </form>
  </div>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {
  required,
  minLength,
} from 'vuelidate/lib/validators'
import {editEntry} from "@/services/rest";

export default {
  name: 'EditSong',
  mixins: [validationMixin],
  data: () => ({
    song: null,
    songSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    song: {
      title: {
        required,
      },
      artist: {
        required,
        minLength: minLength(3)
      }
    }
  },
  created() {
    this.song = this.$route.params.song
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.song[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm() {
      this.$v.$reset()
    },
    saveSong() {
      this.sending = true

      editEntry(this.song, {
        title: this.song.title,
        artist: this.song.artist,
        genre: this.song.genre.join('|')
      }).then(() => {
        this.songSaved = true
        this.sending = false
        this.clearForm()
      })
    },
    validateUser() {
      this.$v.$touch()

      if (!this.$v.$invalid)
        this.saveSong()
    }
  }
}
</script>

<style scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>