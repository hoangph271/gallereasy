import React from 'react'
import styled from 'styled-components'

const Footer = (props = {}) => {
  const { className } = props

  return (
    <footer className={className}>
      <div>{'Gallereasy POC web app'}</div>
      <div>{'2359 Media'}</div>
    </footer>
  )
}

export default styled(Footer)`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 1.8rem;
  box-sizing: border-box;
  color: #2d2d2d;
  background-color: #dfe6e9;
`
