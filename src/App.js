import React, { useCallback, useState, useContext, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import love from './assets/icons/love.png'

import { DeviceQueries } from './utils'
import { FavouritesContext } from './contexts/favourites'

const apiKey = 'ao3o2pNEYof5LZn2xixB7e1pVm7k1Xu4'
const searchLimit = 8

const apiRoot = `https://api.giphy.com/v1/gifs`
const createSearchUrl = (keyword, offset) => `${apiRoot}/search?api_key=${apiKey}&q=${encodeURIComponent(keyword)}&limit=${searchLimit}&offset=${offset}`
const createGetGifsUrl = (ids) => `${apiRoot}?api_key=${apiKey}&ids=${ids.join(',')}`
const fetchGifSearch = async (keyword, offset = 0) => {
  const res = await fetch(createSearchUrl(keyword, offset))

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

const Loader = styled((props = {}) => {
  const { className } = props

  return (
    <div className={className} />
  )
})`
border: 16px solid #f3f3f3;
border-radius: 50%;
border-top: 16px solid #3498db;
width: 40px;
height: 40px;
animation: spin 2s linear infinite;

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`

const ImageCard = styled((props = {}) => {
  const { favourites, addFavourite, removeFavourite } = useContext(FavouritesContext)
  const { className, image } = props
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setLoaded(true)
    img.src = image.url
  }, [image.url])

  const isFavourited = favourites.some(favourite => favourite === image.id)
  const classNames = `${className}${isFavourited ? ' favorited' : ''}${loaded ? ' loaded' : ''}`

  return loaded ? (
    <div
      onClick={() => isFavourited ? removeFavourite(image.id) : addFavourite(image.id)}
      className={classNames}
      style={{ backgroundImage: `url(${image.url})` }}
    >
      {loaded && (
        <img
          onLoad={() => setLoaded(true)}
          alt={isFavourited ? 'Remove from favourites' : 'Add to favourites'}
          className="favorite-sticker"
          src={love}
        />
      )}
    </div>
  ) : (
    <div className={classNames}>
      <Loader />
    </div>
  )
})`
background-repeat: no-repeat;
background-position: center;
background-size: 40px;
position: relative;

&.loaded {
  background-size: cover;
}
&:not(.loaded) {
  display: flex;
  align-items: center;
  justify-content: center;
}

.favorite-sticker {
  position: absolute;
  width: 60px;
  height: 60px;
  bottom: 0;
  right: 0;
  user-select: none;
}
&:not(.favorited) > .favorite-sticker {
  filter: opacity(0.2);
}
`
const ImagesGrid = styled((props = {}) => {
  const { className, images } = props

  return images.length === 0 ? (
    <div className={`${className} no-image`}>
      {'No images...! 💔'}
    </div>
  ) : (
    <div className={className}>
      {images.map(image => (
        <ImageCard
          className="images-grid__item"
          key={image.id}
          image={image}
        />
      ))}
    </div>
  )
})`
width: 100%;
display: grid;
grid-gap: 20px;
grid-template-columns: repeat(1, 1fr);

.images-grid__item {
  height: 200px;
  cursor: pointer;
  box-shadow: 0 0 11px rgba(33,33,33,0.2);
}
.images-grid__item:hover {
  transform: scale(1.05);
}
&.no-image {
  text-align: center;
  display: block;
}
@media ${DeviceQueries.mobile} {
  grid-template-columns: repeat(2, 1fr);
}
@media ${DeviceQueries.tablet} {
  grid-template-columns: repeat(3, 1fr);
}
@media ${DeviceQueries.desktop} {
  grid-template-columns: repeat(4, 1fr);
}
`

// eslint-disable-next-line no-unused-vars
const SearchScreen = styled((props = {}) => {
  const { className } = props

  const history = useHistory()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const { search } = useLocation()
  const queryParamKeyword = new URLSearchParams(search).get('keyword') || ''
  const [keyword, setKeyword] = useState(queryParamKeyword)
  const loadMoreBtn = useRef(null)

  const handleLoadMore = useCallback(async () => {
    if (loading) return

    setLoading(true)

    // TODO: Handle errors in some better way...! :")
    await fetchGifSearch(keyword, images.length)
      .then((images) => setImages(prevImages => [...prevImages, ...images]))
      .catch(() => {})

    loadMoreBtn.current.scrollIntoView({ behavior: 'smooth' })
    setLoading(false)
  }, [loading, images, keyword])

  useEffect(() => {
    if (!Boolean(queryParamKeyword)) return

    let isMounted = true
    setLoading(true)

    // TODO: Handle errors in some better way...! :")
    fetchGifSearch(queryParamKeyword)
      .then((images) => isMounted && setImages(images))
      .catch(() => {})
      .then(() => setLoading(false))

    return () => isMounted = false
  }, [queryParamKeyword])

  const handleSearch = useCallback(async (e) => {
    e.preventDefault()

    if (loading) return
    if (!Boolean(keyword)) return

    history.push(`/?keyword=${encodeURIComponent(keyword)}`)
  }, [history, keyword, loading])

  const handleKeywordChange = useCallback((e) => {
    setKeyword(e.target.value)
  }, [])

  return (
    <header className={className}>
      <form onSubmit={handleSearch}>
        <input
          value={keyword}
          onChange={handleKeywordChange}
          disabled={loading}
          type="text"
          placeholder="Start searching for images!"
        />
      </form>
      <div className="images-grid__container">
        {images.length === 0 ? (
          <div className="images-not-found">
            {'There is no image, type on the search box for something...! :")'}
          </div>
        ) : (
          <React.Fragment>
            <ImagesGrid images={images} />
            <button ref={loadMoreBtn} onClick={handleLoadMore} disabled={loading}>
              {'Load more...!'}
            </button>
          </React.Fragment>
        )}
      </div>
    </header>
  )
})`
display: flex;
flex-direction: column;
align-items: center;

.images-grid__container {
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
}
`

// eslint-disable-next-line no-unused-vars
const FavouritesScreen = styled((props = {}) => {
  const { className } = props
  const [loading, setLoading] = useState(true)
  const { favourites } = useContext(FavouritesContext)
  const [images, setImages] = useState(null)

  useEffect(() => {
    if (images !== null) return
    if (favourites.length === 0) {
      setLoading(false)
      setImages([])
      return
    }

    setLoading(true)

    // TODO: Handle errors in some better way...! :")
    fetchGifs(favourites)
      .then(setImages)
      .catch(() => {})
      .then(() => setLoading(false))
  }, [favourites, images])

  const isFavourited = useCallback((image) => favourites.includes(image.id), [favourites])
  useEffect(() => {
    setImages(prevImages => prevImages && prevImages.filter(isFavourited))
  }, [isFavourited])

  return (
    <header className={`${className} ${loading ? 'loading' : ''}`}>
      {loading ? (
        <Loader />
      ) : (
        <ImagesGrid images={images} />
      )}
    </header>
  )
})`
&.loading {
  justify-content: center;
}
`

const App = (props = {}) => {
  const { className } = props

  return (
    <div className={`App ${className}`}>
      <Router>
        <Switch>
          <Route path="/favourites">
            <FavouritesScreen />
          </Route>
          <Route path="/">
            <SearchScreen />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default styled(App)`
text-align: center;

& > header {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
}
`
