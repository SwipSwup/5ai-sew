export default class Page {

    constructor(response, Entity) {
        this.entities = response.data._embedded[Entity.path].map(obj => new Entity(obj))
        Object.assign(this, response.data.page)
    }

    next() {
        return this.number + 1
    }

    prev() {
        return this.number - 1
    }

    isFirst() {
        return this.number <= 0
    }

    isLast() {
        return this.number >= this.totalPages - 1
    }
}