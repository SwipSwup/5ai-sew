import axios from 'axios'
import Page from '@/models/Page'
import SongModel from '@/models/Song'

// Basis-URL aller REST-API-Endpunkte
const API_BASE = 'http://localhost:8080/api'

export function loadPage(Entity, pageNum = 0, params = {}) {
    return axios
        .get(
            `${API_BASE}/${Entity.path}`,
            {params: {page: pageNum, ...params}}
        )
        .then(response => {
            const page = new Page(Entity, response)
            // const entities = response.data._embedded[Entity.path].map(obj => new Entity(obj))
            if (page.entities.length || (pageNum === 0)) {
                console.log('rest.load() OK', page)
                return page
            } else {
                return loadPage(Entity, pageNum - 1, params)
            }
        })
        .catch(response => {
            console.error('rest.load() error', response)
        })
}

export function deletEntry(entry) {
    if (Array.isArray(entry)) {
        return axios
            .delete(
                `${entry.pop()._links.self.href}`,
                {}
            )
            .then(() => {
                if (entry.length >= 1) {
                    return deletEntry(entry)
                }
            })
    } else {
        return axios
            .delete(
                entry._links.self.href,
                {}
            ).catch(response => {
                console.error('rest.delete() error', response)
            })
    }
}

export function editEntry(entry, data) {
    return axios
        .patch(
            entry._links.self.href,
            data,
            {}
        )
        .then(() => {

        })
        .catch(response => {
            console.error('rest.patch() error', response)
        })
}
