export default class Song {

    constructor(obj) {
        Object.assign(this, obj)
    }

}

// Pfad dieser Entities im REST-API des Servers
Song.path = 'songs'