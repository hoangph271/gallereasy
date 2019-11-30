import React, { useState, createContext, useEffect, useCallback, useContext } from 'react'

const FavouritesContext = createContext()
const FavouritesConsumer = FavouritesContext.Consumer
const storedFavourites = []

try {
  storedFavourites.push(...JSON.parse(localStorage.getItem('favourites')))
} catch (error) {
  localStorage.setItem('favourites', '[]')
}

const FavouritesProvider = (props) => {
  const [favourites, setFavourites] = useState(storedFavourites)
  useEffect(() => {
  }, [])
  const addFavourite = useCallback((imageId) => {
    const nextFavourites = [...new Set([...favourites, imageId])]

    setFavourites(nextFavourites)
    localStorage.setItem('favourites', JSON.stringify(nextFavourites))
  }, [favourites])
  const removeFavourite = useCallback((imageId) => {
    const nextFavourites = favourites.filter(favourite => favourite !== imageId)

    setFavourites(nextFavourites)
    localStorage.setItem('favourites', JSON.stringify(nextFavourites))
  }, [favourites])

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
      {props.children}
    </FavouritesContext.Provider>
  )
}

const useFavourites = () => {
  return useContext(FavouritesContext)
}

export default FavouritesContext

export {
  FavouritesContext,
  FavouritesProvider,
  FavouritesConsumer,
  useFavourites,
}
