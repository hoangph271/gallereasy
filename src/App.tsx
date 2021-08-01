import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import { FavouritesScreen, SearchScreen } from './views'
import { Header, Footer } from './components'

const App: StyledFC = (props) => {
  const { className } = props

  return (
    <div className={`App ${className}`}>
      <Router>
        <Header />
        <Switch>
          <Route path="/favourites">
            <FavouritesScreen />
          </Route>
          <Route path="/">
            <SearchScreen />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default styled(App)`
  text-align: center;
  display: grid;
  min-height: calc(var(--vh, 1vh) * 100);
  grid-template-rows: auto 1fr auto;

  & > main {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: calc(10px + 2vmin);
  }
`
