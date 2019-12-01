import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom'

import { fetchGifSearch } from '../apis'
import { useIsMounted } from '../hooks'

import { ImagesGrid } from '../components'

const SearchScreen = (props = {}) => {
  const { className } = props

  const history = useHistory()
  const [isLastPage, setIsLastPage] = useState(true)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const isMounted = useIsMounted()

  const { search } = useLocation()
  const queryParamKeyword = new URLSearchParams(search).get('keyword') || ''
  const [keyword, setKeyword] = useState(queryParamKeyword)

  const handleLoadMore = useCallback(async () => {
    if (loading) return

    setLoading(true)

    // TODO: Handle errors in some better way...! :")
    await fetchGifSearch(keyword, images.length)
      .then((result) => {
        if (isMounted.current) {
          setImages(prevImages => [...prevImages, ...result.images])
        }
      })
      .catch(() => {})
    setLoading(false)
  }, [loading, images, keyword, isMounted])

  useEffect(() => {
    if (!Boolean(queryParamKeyword)) return

    setLoading(true)

    // TODO: Handle errors in some better way...! :")
    fetchGifSearch(queryParamKeyword)
      .then((result) => {
        const { images, isLastPage } = result

        if (isMounted.current) {
          setImages(images)
          setIsLastPage(isLastPage)
        }
      })
      .catch(() => {})
      .then(() => isMounted && setLoading(false))

  }, [queryParamKeyword, isMounted])

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
      <form onSubmit={handleSearch} className="search-form">
        <input
          className="keyword-input"
          value={keyword}
          onChange={handleKeywordChange}
          disabled={loading}
          type="text"
          placeholder="Start searching for images!"
        />
      </form>
      <div className="images-grid__container">
        {images.length !== 0 && (
          <React.Fragment>
            <ImagesGrid images={images} />
            {isLastPage || (
              <button onClick={handleLoadMore} disabled={loading}>
                {'Fetch more'}
              </button>
            )}
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

.search-form {
  width: 100%;
  display: flex;
  justify-content: center;

  .keyword-input {
    width: 80%;
    border: none;
    outline: none;
    border-bottom: 1px solid #636e72;
    font-size: x-large;
    padding-bottom: 0.4rem;
  },
  .keyword-input:hover {
    border-color: #2d2d2d;
  }
  .keyword-input[disabled] {
    background: none;
    border-color: #636e72;
  }
}

.images-grid__container {
  margin: 1.6rem 0;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
}
`
