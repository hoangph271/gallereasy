import React from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { useFavourites } from './contexts/favourites'

import { FavouritesScreen, SearchScreen } from './views'
import { Footer } from './components'

const App = (props = {}) => {
  const { className } = props
  const { favourites } = useFavourites()

  return (
    <div className={`App ${className}`}>
      <Router>
        <header>
          <h3 className="logo">
            <span>{'Galler'}</span>
            <span>{'easy'}</span>
          </h3>
          <div className="divider">{'|'}</div>
          <div className="nav-bar">
            <NavLink to="/" exact>
              {'Search'}
            </NavLink>
            <NavLink to="/favourites">
              {`Favourites${favourites.length ? ` (${favourites.length})`: ''}`}
            </NavLink>
          </div>
        </header>
        <Switch>
          <Route path="/favourites">
            <FavouritesScreen />
          </Route>
          <Route path="/">
            <SearchScreen />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default styled(App)`
  text-align: center;

  header {
    display: flex;
    color: #636e72;
    padding: 2rem 0;
    padding: 0.6rem 0;
    border-bottom: 1px solid #636e72;
    margin-bottom: 1.8rem;

    & > * {
      cursor: default;
      font-size: 1.2rem;
    }

    .divider {
      margin: 0 25px;
    }

    .logo {
      margin: 0;
      margin-left: 2.5rem;

      span:first-child {
        font-weight: normal;
      }
      span:last-child {
        color: #2d2d2d;
      }
    }

    .nav-bar {
      a:first-child {
        display: inline-block;
        margin-right: 1.2rem;
      }
      a {
        text-decoration: none;
        color: #636e72;
      }
      a.active {
        font-weight: bold;
        color: #2d2d2d;
      }
    }
  }

  & > main {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: calc(10px + 2vmin);
  }
`
