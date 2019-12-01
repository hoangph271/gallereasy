import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { useFavourites } from '../contexts/favourites'

const Header = (props) => {
  const { className } = props
  const { favourites } = useFavourites()

  return (
    <header className={className}>
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
  )
}

export default styled(Header)`
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
`
