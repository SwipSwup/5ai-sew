export default class Song {

    constructor(obj) {
        Object.assign(this, obj)
        this.genre = this.genre.split('|')
    }

}

// Pfad dieser Entities im REST-API des Servers
Song.path = 'songs'