export const API_ROOT = 'https://api.giphy.com/v1/gifs'
export const API_KEY = process.env.REACT_APP_API_KEY || 'ao3o2pNEYof5LZn2xixB7e1pVm7k1Xu4'
export const SEARCH_LIMIT = 8

const Sizes = {
  mobile: '425px',
  tablet: '768px',
  desktop: '1024px',
}
export const DeviceQueries = {
  mobile: `(min-width: ${Sizes.mobile})`,
  tablet: `(min-width: ${Sizes.tablet})`,
  desktop: `(min-width: ${Sizes.desktop})`,
}
