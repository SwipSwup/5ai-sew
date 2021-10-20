import axios from 'axios'
import Page from '@/models/Page'
import SongModel from '@/models/Song'

// Basis-URL aller REST-API-Endpunkte
const API_BASE = 'http://localhost:8080/api'

export function loadPage(Entity, page = 0) {
    return axios
        .get(
            `${API_BASE}/${Entity.path}`,
            { params: { page } }
        )
        .then(response => {
            const page = new Page(response, Entity)
            console.log('rest.load() OK', page)
            return page
        })
        .catch(response => {
            console.error('rest.load() error', response)
        })
}
