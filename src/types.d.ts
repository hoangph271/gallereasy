import type { FC } from 'react'

declare global {
  export type StyledFC<T> = FC<{ className?: string } & T>
}
