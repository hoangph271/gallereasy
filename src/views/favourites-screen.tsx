import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { fetchGifs } from '../apis'
import { useFavourites } from '../contexts/favourites'
import { useModal } from '../contexts/modal'

import { ImagesGrid, Loader } from '../components'
import { GiphyImage, StyledFC } from '../types'

const useFavoriteImages = () => {
  const { favourites } = useFavourites()
  const [isLoading, setIsLoading] = useState(true)
  const [images, setImages] = useState<GiphyImage[] | null>(null)

  const { showToast } = useModal()

  useEffect(() => {
    const isFavourited = (image: GiphyImage) => {
      return favourites.includes(image.id)
    }

    setImages((prevImages) => {
      return prevImages?.filter(isFavourited) ?? null
    })
  }, [favourites])

  useEffect(() => {
    if (images !== null) return
    if (favourites.length === 0) {
      setIsLoading(false)
      setImages([])
      return
    }

    setIsLoading(true)

    fetchGifs(favourites)
      .then(result => {
        setImages(result.images)
      })
      .catch((e) => {
        console.error(e)
        showToast('Fetch GIFs failed')
        setImages([])
      })
      .finally(() => setIsLoading(false))
  }, [favourites, images, showToast])

  return {
    images,
    isLoading,
    favourites
  }
}

const FavouritesScreen: StyledFC = (props) => {
  const { className } = props
  const { images, isLoading } = useFavoriteImages()

  return (
    <main className={`${className} ${isLoading ? 'loading' : ''}`}>
      {isLoading ? (
        <Loader />
      ) : (
        <ImagesGrid images={images as GiphyImage[]} />
      )}
    </main>
  )
}

export default styled(FavouritesScreen)`
  &.loading {
    justify-content: center;
  }
`
