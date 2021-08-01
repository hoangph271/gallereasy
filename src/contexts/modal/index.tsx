import { createContext, useContext, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import Toast from './toast'

const ModalContext = createContext({})
const useModal = () => useContext<{
  showToast: (children: React.ReactNode) => {}
}>(ModalContext as any)

const TOAST_DURATION_MS = 2.75 * 1000
const ModalProvider = styled((props) => {
  const { className, children } = props
  const [toastContent, setToastContent] = useState(null)

  useEffect(() => {
    const timeout = toastContent
      ? setTimeout(() => setToastContent(null), TOAST_DURATION_MS)
      : null

    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [toastContent])

  return (
    <ModalContext.Provider value={{ showToast: setToastContent }}>
      {children}
      {createPortal((
        <div className={className}>
          {toastContent && <Toast children={toastContent} />}
        </div>
      ), document.querySelector('#modal-root') as Element)}
    </ModalContext.Provider>
  )
})`
`

export {
  ModalContext,
  ModalProvider,
  useModal,
}
