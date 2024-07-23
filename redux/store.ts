import { configureStore } from "@reduxjs/toolkit"
import stateViewReducer from "./features/view-state/view-state-slice"
import favouriteReducer from "./features/favourite/favourite-slice"
import cartReducer from "./features/cart/cart-slice"

export const store = configureStore({
  reducer: {
    stateView: stateViewReducer,
    favourites: favouriteReducer,
    carts: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
