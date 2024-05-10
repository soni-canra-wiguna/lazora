import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const viewStateSlice = createSlice({
  name: "viewState",
  initialState: {
    view: false,
  },
  reducers: {
    isView: (state) => {
      state.view = !state.view
    },
  },
})

export const { isView } = viewStateSlice.actions
export default viewStateSlice.reducer
