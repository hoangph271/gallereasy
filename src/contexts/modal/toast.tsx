import styled from 'styled-components'

const Toast: StyledFC = (props) => {
  const { className, children } = props

  return (
    <div className={className}>
      <div className="toast">
        {children}
      </div>
    </div>
  )
}

export default styled(Toast)`
  position: fixed;
  bottom: 2.4rem;
  left: 0;
  right: 0;
  text-align: center;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;

  .toast {
    display: inline-block;
    padding: 0.8rem 2.2rem;
    background-color: rgba(145, 145, 145, 0.4);
    color: #2d2d2d;
    z-index: 1;
  }

  @keyframes fadein {
    from { bottom: 0; opacity: 0; }
    to { bottom: 2.4rem; opacity: 1; }
  }
  @keyframes fadeout {
    from { bottom: 2.4rem; opacity: 1; }
    to { bottom: 0; opacity: 0; }
  }
`
