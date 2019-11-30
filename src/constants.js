const API_ROOT = `https://api.giphy.com/v1/gifs`
const API_KEY = 'ao3o2pNEYof5LZn2xixB7e1pVm7k1Xu4'

const Sizes = {
  mobile: '425px',
  tablet: '768px',
  desktop: '1024px',
}
const DeviceQueries = {
  mobile: `(min-width: ${Sizes.mobile})`,
  tablet: `(min-width: ${Sizes.tablet})`,
  desktop: `(min-width: ${Sizes.desktop})`,
}

export {
  API_ROOT,
  API_KEY,
  DeviceQueries,
}
