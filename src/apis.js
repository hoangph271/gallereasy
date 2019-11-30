import { API_ROOT, API_KEY } from './constants'

const searchLimit = 8
const appendApiKey = (url) => `${url}&api_key=${API_KEY}`
const createSearchUrl = (keyword, offset) => appendApiKey(`${API_ROOT}/search?q=${encodeURIComponent(keyword)}&limit=${searchLimit}&offset=${offset}`)
const createGetGifsUrl = (ids) => appendApiKey(`${API_ROOT}?ids=${ids.join(',')}`)

const fetchGifs = async (ids) => {
  const res = await fetch(createGetGifsUrl(ids))

  if (res.status === 200) {
    const { data } = await res.json()

    return data.map(image => ({
      id: image.id,
      url: image.images.original.url
    }))
  }

  console.error(await res.json())
  throw new Error('fetchGifSearch fail')
}
const fetchGifSearch = async (keyword, offset = 0) => {
  const res = await fetch(createSearchUrl(keyword, offset))

  if (res.status === 200) {
    const json = await res.json()
    console.info(json)
    const { data } = json

    return data.map(image => ({
      id: image.id,
      url: image.images.original.url
    }))
  }

  console.error(await res.json())
  throw new Error('fetchGifSearch fail')
}

export {
  fetchGifs,
  fetchGifSearch,
}
