import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  value: "featured",
}

export const sortBySlice = createSlice({
  name: "sortBy",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { setSortBy } = sortBySlice.actions
export default sortBySlice.reducer
