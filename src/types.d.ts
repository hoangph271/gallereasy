import type { FC } from 'react'

declare global {
  export type StyledFC<T = {}> = FC<{ className?: string } & T>

  export type GiphyImage = {
    id: string,
    url: string,
    images: {
      original: {
        url: string
      }
    }
  }
}
