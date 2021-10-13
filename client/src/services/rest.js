import axios from 'axios'
import SongModel from "@/models/Song";

// Basis-URL aller REST-API-Endpunkte
const API_BASE = 'http://localhost:8080/api'

export function loadPage(Entity) {
    return axios
        .get(`${API_BASE}/${Entity.path}`)
        .then(response => {
            const entities = response.data._embedded[Entity.path].map(obj => new Entity(obj))
            console.log('rest.load() OK', entities)
            return entities
        })
        .catch(response => {
            console.error('rest.load() error', response)
        })
}
