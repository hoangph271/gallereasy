import { Fragment, useState, useCallback, useEffect, ChangeEventHandler, FormEventHandler } from 'react'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'

import { fetchGifSearch } from '../apis'
import { useModal } from '../contexts/modal'

import { ImagesGrid, Loader } from '../components'
import { GiphyImage, StyledFC } from '../types'

const SearchScreen: StyledFC = (props) => {
  const { className } = props

  const navigate = useNavigate()
  const [isLastPage, setIsLastPage] = useState(true)
  const [images, setImages] = useState<GiphyImage[] | null>(null)
  const [loading, setLoading] = useState(false)
  const { showToast } = useModal()

  const { search } = useLocation()
  const queryParamKeyword = new URLSearchParams(search).get('keyword') || ''
  const [keyword, setKeyword] = useState(queryParamKeyword)

  const handleLoadMore = useCallback(async () => {
    if (loading) return

    setLoading(true)

    await fetchGifSearch(keyword, images?.length ?? 0)
      .then((result) => {
        setImages(prevImages => [...prevImages ?? [], ...result.images])
      })
      .catch((e) => {
        console.error(e)
        showToast('Fetch more GIFs failed')
      })
    setLoading(false)
  }, [loading, images, keyword, showToast])

  useEffect(() => {
    if (!queryParamKeyword) return

    setLoading(true)

    fetchGifSearch(queryParamKeyword)
      .then((result) => {
        const { images, isLastPage } = result

        setImages(images)
        setIsLastPage(isLastPage)
      })
      .catch((e) => {
        console.error(e)
        showToast('Search GIFs failed')
      })
      .then(() => setLoading(false))
  }, [queryParamKeyword, showToast])

  const handleSearch = useCallback<FormEventHandler<HTMLFormElement>>(async (e) => {
    e.preventDefault()

    if (loading) return
    if (!keyword) return

    navigate(`/?keyword=${encodeURIComponent(keyword)}`)
  }, [history, keyword, loading])

  const handleKeywordChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
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
        <Loader className={`search-loader ${loading ? 'loading' : ''}`} />
      </form>
      <div className="images-grid__container">
        {images && (
          <Fragment>
            <ImagesGrid images={images} />
            {isLastPage || (
              <button
                className="fetch-more-btn"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {'Fetch more'}
              </button>
            )}
          </Fragment>
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
    position: relative;
    padding: 0 10%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;

    .keyword-input {
      width: 100%;
      border: none;
      outline: none;
      border-bottom: 1px solid #636e72;
      font-size: x-large;
      padding-bottom: 0.4rem;
      height: 1.9rem;
    }
    .keyword-input:hover {
      border-color: #2d2d2d;
    }
    .keyword-input[disabled] {
      background: none;
      border-color: #636e72;
    }
    & > .search-loader {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 10%;
        border-width: 5px;
        height: 1.9rem;
        width: 1.9rem;
        box-sizing: border-box;
        display: none;
    }
    & > .search-loader.loading {
      display: block;
    }
  }

  .images-grid__container {
    margin: 1.6rem 0;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;

    .fetch-more-btn {
      background-color: #636e72;
      border: none;
      color: white;
      padding: 0.6rem 1.4rem;
      text-decoration: none;
      display: inline-block;
      text-transform: uppercase;
      font-size: large;
      margin-top: 0.8rem;
    }

    .fetch-more-btn:not([disabled]):hover {
      background-color: #2d2d2d;
      cursor: pointer;
    }
  }
`
