import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import love from '../../assets/icons/love.png'

import { useIsMounted } from '../../hooks'
import { FavouritesContext } from '../../contexts/favourites'

import { Loader } from '../index'

const ImageCard: StyledFC<{
  image: GiphyImage
}> = (props) => {
  const { favourites, addFavourite, removeFavourite } = useContext(FavouritesContext)
  const { className, image } = props
  const [loaded, setLoaded] = useState(false)
  const isMounted = useIsMounted()

  useEffect(() => {
    const img = new Image()
    img.onload = () => isMounted.current && setLoaded(true)
    img.src = image.url
  }, [image.url, isMounted])

  const isFavourited = favourites.some((favourite: string) => favourite === image.id)
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
}

export default styled(ImageCard)`
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
    display: none;
  }
  &.favorited > .favorite-sticker,
  &:not(.favorited):hover > .favorite-sticker {
    display: block;
  }
  &:not(.favorited):hover > .favorite-sticker {
    filter: opacity(0.2);
  }
`
