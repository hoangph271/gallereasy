import React, { useContext, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

import { fetchGifs } from '../apis'
import { useFavourites } from '../contexts/favourites'

import { ImagesGrid, Loader } from '../components'

const FavouritesScreen = (props = {}) => {
  const { className } = props
  const [loading, setLoading] = useState(true)
  const { favourites } = useFavourites()
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
    <main className={`${className} ${loading ? 'loading' : ''}`}>
      {loading ? (
        <Loader />
      ) : (
        <ImagesGrid images={images} />
      )}
    </main>
  )
}

export default styled(FavouritesScreen)`
&.loading {
  justify-content: center;
}
`
