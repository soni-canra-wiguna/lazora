import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cart: [],
}

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
})

export const {} = cartSlice.actions
export default cartSlice.reducer
