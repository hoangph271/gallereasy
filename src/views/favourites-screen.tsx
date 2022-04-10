import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

import { fetchGifs } from '../apis'
import { useIsMounted } from '../hooks'
import { useFavourites } from '../contexts/favourites'
import { useModal } from '../contexts/modal'

import { ImagesGrid, Loader } from '../components'
import { GiphyImage, StyledFC } from '../types'

const FavouritesScreen: StyledFC = (props) => {
  const { className } = props
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState<GiphyImage[] | null>(null)
  const { favourites } = useFavourites()
  const { showToast } = useModal()
  const isMounted = useIsMounted()

  useEffect(() => {
    if (images !== null) return
    if (favourites.length === 0) {
      setLoading(false)
      setImages([])
      return
    }

    setLoading(true)

    fetchGifs(favourites)
      .then(result => {
        if (isMounted.current) {
          setImages(result.images)
        }
      })
      .catch((e) => {
        console.error(e)
        showToast('Fetch GIFs failed')
        setImages([])
      })
      .then(() => isMounted.current && setLoading(false))
  }, [favourites, images, isMounted, showToast])

  const isFavourited = useCallback((image: GiphyImage) => favourites.includes(image.id), [favourites])
  useEffect(() => {
    setImages((prevImages) => {
      return prevImages?.filter(isFavourited) ?? null
    })
  }, [isFavourited])

  return (
    <main className={`${className} ${loading ? 'loading' : ''}`}>
      {loading ? (
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
