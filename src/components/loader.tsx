import styled from 'styled-components'
import { StyledFC } from '../types'

const Loader: StyledFC = (props) => {
  const { className } = props

  return (
    <div className={className} />
  )
}

export default styled(Loader)`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;

  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
