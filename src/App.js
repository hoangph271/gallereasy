import React from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { FavouritesScreen, SearchScreen } from './views'

const App = (props = {}) => {
  const { className } = props

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
            <NavLink to="/" exact>Search</NavLink>
            <NavLink to="/favourites">Favourites</NavLink>
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
    </div>
  )
}

export default styled(App)`
  text-align: center;

  header {
    display: flex;

    & > * {
      font-size: 1.2rem;
    }

    .divider {
      margin: 0 25px;
    }

    .logo {
      margin: 0;
      margin-left: 40px;

      span:first-child {
        font-weight: normal;
      }
    }

    .nav-bar {
      a:first-child {
        width: 80px;
        display: inline-block;
      }
      a {
        text-decoration: none;
        color: black;
      }
      a.active {
        font-weight: bold;
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
