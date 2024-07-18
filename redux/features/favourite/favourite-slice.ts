"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface FavouriteProps {
  id?: string
  title?: string
  image?: string
  price?: number
  stock?: number
}

const favouriteItems =
  typeof window !== "undefined" ? localStorage.getItem("favourites") : "[]"

const initialState = {
  favourites:
    // @ts-ignore
    (JSON.parse(favouriteItems) as FavouriteProps[]) ||
    ([] as FavouriteProps[]),
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
        (fav) => fav.id === action.payload.id,
      )
      if (favIndex !== -1) {
        state.favourites.splice(favIndex, 1)
        localStorage.setItem("favourites", JSON.stringify(state.favourites))
      } else {
        state.favourites.push(action.payload)
        localStorage.setItem("favourites", JSON.stringify(state.favourites))
      }
    },
    removeFavourite: (state, action: PayloadAction<string | undefined>) => {
      state.favourites = state.favourites.filter((f) => f.id !== action.payload)
      localStorage.setItem("favourites", JSON.stringify(state.favourites))
    },
    resetFavourite: (state) => {
      state.favourites = []
      localStorage.setItem("favourites", JSON.stringify(state.favourites))
    },
  },
})

export const {
  addToFavourite,
  removeFavourite,
  toggleFavourite,
  resetFavourite,
} = favouriteSlice.actions
export default favouriteSlice.reducer
