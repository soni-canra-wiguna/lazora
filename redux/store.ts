import { configureStore } from "@reduxjs/toolkit"
import stateViewReducer from "./features/view-state/view-state-slice"
import favouriteReducer from "./features/favourite/favourite-slice"

export const store = configureStore({
  reducer: {
    stateView: stateViewReducer,
    favourites: favouriteReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
