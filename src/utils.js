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
  DeviceQueries,
}
