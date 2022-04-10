import { createRoot } from 'react-dom/client'
import { AppWithContexts } from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const root = createRoot(div)

  root.render(<AppWithContexts />)
  root.unmount()
})
