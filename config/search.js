import { MeiliSearch } from 'meilisearch'
import movies from './movies.json'
const client = new MeiliSearch({
    host: process.env.MEILISEARCH_HOST ,
    apiKey: process.env.MEILISEARCH_API_KEY
  })

module.exports = client;