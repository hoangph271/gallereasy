import { useState, createContext, useEffect, useCallback, useContext } from 'react'
import { StyledFC } from '../types'

const FavouritesContext = createContext(null as unknown as {
  favourites: string[],
  addFavourite(id: string): void,
  removeFavourite(id: string): void
})
const FavouritesConsumer = FavouritesContext.Consumer
const storedFavourites: string[] = []

try {
  storedFavourites.push(...JSON.parse(localStorage.getItem('favourites') ?? '[]'))
} catch (error) {
  console.error(error)
  localStorage.setItem('favourites', '[]')
}

const FavouritesProvider: StyledFC = (props) => {
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
  useFavourites
}
