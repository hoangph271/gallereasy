import React from 'react'
import styled from 'styled-components'

import { DeviceQueries } from '../../constants'

import ImageCard from './image-card'

const ImagesGrid = (props = {}) => {
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
}

export default styled(ImagesGrid)`
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
