import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CartProps {
  id?: string
  title?: string
  image?: string
  price?: number
  stock?: number
  qty?: number
}

const cartItems =
  typeof window !== "undefined" ? localStorage.getItem("carts") : "[]"

const initialState = {
  // @ts-ignore
  cart: (JSON.parse(cartItems) as CartProps[]) || ([] as CartProps[]),
}

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProps>) => {
      state.cart.push(action.payload)
    },
    removeCartItem: (state, action: PayloadAction<string | undefined>) => {
      state.cart = state.cart.filter((c) => c.id !== action.payload)
      localStorage.setItem("carts", JSON.stringify(state.cart))
    },
    resetCart: (state) => {
      state.cart = []
      localStorage.setItem("carts", JSON.stringify(state.cart))
    },
  },
})

export const { addToCart, removeCartItem, resetCart } = cartSlice.actions
export default cartSlice.reducer
