import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface FavouriteProps {
  id?: string
  title?: string
  image?: string
  price?: number
  stock?: number
}

const initialState = {
  favourites: [] as FavouriteProps[],
}

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addToFavourite: (state, action: PayloadAction<FavouriteProps>) => {
      state.favourites.push(action.payload)
    },
    toggleFavourite: (state, action: PayloadAction<FavouriteProps>) => {
      const favIndex = state.favourites.findIndex(
        (fav) => fav.id === action.payload.id
      )
      if (favIndex !== -1) {
        state.favourites.splice(favIndex, 1)
      } else {
        state.favourites.push(action.payload)
      }
    },
    removeFavourite: (state, action: PayloadAction<string | undefined>) => {
      state.favourites = state.favourites.filter((f) => f.id !== action.payload)
    },
  },
})

export const { addToFavourite, removeFavourite, toggleFavourite } =
  favouriteSlice.actions
export default favouriteSlice.reducer
