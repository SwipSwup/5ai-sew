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
            if(page.entities.length || (pageNum === 0)) {
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

export function deletEntry(Song) {
    return axios
        .delete(
            `${Song._links.self.href}`,
            {}
        )
        .then(response => {
            console.log(response);
        })
}
