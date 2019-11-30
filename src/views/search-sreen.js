import React, { useState, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom'

import { fetchGifSearch } from '../apis'

import { ImagesGrid } from '../components'

const SearchScreen = (props = {}) => {
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
      .then(() => isMounted && setLoading(false))

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
    <main className={className}>
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
    </main>
  )
}

export default styled(SearchScreen)`
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
