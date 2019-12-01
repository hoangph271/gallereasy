import { API_ROOT, API_KEY } from './constants'

const searchLimit = 8
const appendApiKey = (url) => `${url}&api_key=${API_KEY}`
const createSearchUrl = (keyword, offset) => appendApiKey(`${API_ROOT}/search?q=${encodeURIComponent(keyword)}&limit=${searchLimit}&offset=${offset}`)
const createGetGifsUrl = (ids) => appendApiKey(`${API_ROOT}?ids=${ids.join(',')}`)

const extractAPIResponse = async (response) => {
  const { data, pagination } = await response.json()

  const images = data.map(image => ({
    id: image.id,
    url: image.images.original.url
  }))

  const { count, offset, total_count } = pagination
  const isLastPage = total_count === offset + count

  return { images, isLastPage }
}

const fetchGifs = async (ids) => {
  const res = await fetch(createGetGifsUrl(ids))

  if (res.status === 200) {
    return extractAPIResponse(res)
  }

  console.error(await res.json())
  throw new Error('fetchGifSearch fail')
}
const fetchGifSearch = async (keyword, offset = 0) => {
  const res = await fetch(createSearchUrl(keyword, offset))

  if (res.status === 200) {
    return extractAPIResponse(res)
  }

  console.error(await res.json())
  throw new Error('fetchGifSearch fail')
}

export {
  fetchGifs,
  fetchGifSearch,
}
