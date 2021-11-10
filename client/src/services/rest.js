import axios from 'axios'
import Page from '@/models/Page'

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
            if (page.entities.length || (pageNum === 0)) {
                return page
            } else {
                return loadPage(Entity, pageNum - 1, params)
            }
        })
        .catch(response => {
            console.error('rest.load() error', response)
        })
}

export function deletEntry(Entity) {
    if (Array.isArray(Entity)) {
        return axios
            .delete(
                `${Entity.pop()._links.self.href}`,
                {}
            )
            .then(() => {
                if (Entity.length >= 1) {
                    return deletEntry(Entity)
                }
            })
    } else {
        return axios
            .delete(
                Entity._links.self.href,
                {}
            ).catch(response => {
                console.error('rest.delete() error', response)
            })
    }
}

export function editEntry(Entity, data) {
    return axios
        .patch(
            Entity._links.self.href,
            data,
            {}
        )
        .catch(response => {
            console.error('rest.patch() error', response)
        })
}

export function addEntry(Entity, data) {
    return axios
        .post(
            `${API_BASE}/${Entity.path}`,
            data,
            {}
        )
        .catch(response => {
            console.error('rest.patch() error', response)
        })
}
