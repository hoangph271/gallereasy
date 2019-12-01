import React, { createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const ModalContext = createContext({})

const useModal = () => useContext(ModalContext)

const ModalProvider = styled((props) => {
  const { className } = props
  const [toastContent, setToastContent] = useState('toastContent')

  return createPortal((
    <ModalContext.Provider value={{ setToastContent }}>
      <div className={className}>
        <div className="toast-container">
          {toastContent && (
            <div className={`toast ${toastContent ? 'show' : ''}`}>
              {toastContent}
            </div>
          )}
        </div>
      </div>
    </ModalContext.Provider>
  ), document.querySelector('#modal-root'))
})`
  .toast-container {
    position: fixed;
    bottom: 2.4rem;
    left: 0;
    right: 0;
    text-align: center;

    .toast {
      display: inline-block;
      padding: 0.8rem 2.2rem;
      background-color: #333;
      color: #fff;
      z-index: 1;
    }
  }
`

export {
  ModalContext,
  ModalProvider,
  useModal,
}
