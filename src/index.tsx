import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppWithContexts } from './App'
import * as serviceWorker from './serviceWorker'

import './index.css'

createRoot(document.getElementById('root')!)
  .render(
    <StrictMode>
      <AppWithContexts />
    </StrictMode>
  )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
