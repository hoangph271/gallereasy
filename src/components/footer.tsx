import styled from 'styled-components'

import { DeviceQueries } from '../constants'

const Footer: StyledFC = (props) => {
  const { className } = props

  return (
    <footer className={className}>
      <div className="footer-left">
        <span>{'Gallereasy POC'}</span>
        <span className="spacer">&nbsp;</span>
        <span>{'web app'}</span>
      </div>
      <div className="footer-right">
        <span>{'2359'}</span>
        <span className="spacer">&nbsp;</span>
        <span>{'Media'}</span>
      </div>
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

  .footer-left, .footer-right {
    display: flex;
    flex-direction: column;
  }
  .spacer {
    display: none;
  }

  @media ${DeviceQueries.mobile} {
    .footer-left, .footer-right {
      flex-direction: row;
    }
    .spacer {
      display: block;
    }
  }
`
