import { API_ROOT, API_KEY, SEARCH_LIMIT } from './constants'

const appendApiKey = (url: string) => `${url}&api_key=${API_KEY}`
const createSearchUrl = (keyword: string, offset: number) => appendApiKey(`${API_ROOT}/search?q=${encodeURIComponent(keyword)}&limit=${SEARCH_LIMIT}&offset=${offset}`)
const createGetGifsUrl = (ids: string[]) => appendApiKey(`${API_ROOT}?ids=${ids.join(',')}`)

const extractAPIResponse = async (response: Response) => {
  const { data, pagination } = await response.json()

  const images = data.map((image: GiphyImage)  => ({
    id: image.id,
    url: image.images.original.url
  }))

  const { count, offset, total_count } = pagination
  const isLastPage = total_count === offset + count

  return { images, isLastPage }
}

const fetchGifs = async (ids: string[]) => {
  const res = await fetch(createGetGifsUrl(ids))

  if (res.status === 200) {
    return extractAPIResponse(res)
  }

  console.error(await res.json())
  throw new Error('fetchGifSearch fail')
}
const fetchGifSearch = async (keyword: string, offset = 0) => {
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
