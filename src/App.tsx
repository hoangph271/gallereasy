import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

import { FavouritesScreen, SearchScreen } from './views'
import { Header, Footer } from './components'
import { StyledFC } from './types'
import { FavouritesProvider } from './contexts/favourites'
import { ModalProvider } from './contexts/modal'

const App: StyledFC = (props) => {
  const { className } = props

  return (
    <div className={`App ${className}`}>
      <Router>
        <Header />
        <Routes>
          <Route path="/favourites" element={<FavouritesScreen />} />
          <Route path="/" element={<SearchScreen />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

const StyledApp = styled(App)`
  text-align: center;
  display: grid;
  min-height: calc(var(--vh, 1vh) * 100);
  grid-template-rows: auto 1fr auto;

  & > main {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: calc(10px + 2vmin);
  }
`

export const AppWithContexts = () => {
  return (
    <FavouritesProvider>
      <ModalProvider>
        <StyledApp />
      </ModalProvider>
    </FavouritesProvider>
  )
}
