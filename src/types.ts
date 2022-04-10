import type { FC, ReactNode } from 'react'

export type StyledFC<T = {}> = FC<{
  className?: string
  children?: ReactNode
} & T>

export type GiphyImage = {
  id: string,
  url: string,
  images: {
    original: {
      url: string
    }
  }
}
