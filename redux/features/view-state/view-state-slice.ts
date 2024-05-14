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
    setIsView: (state, action: PayloadAction<boolean>) => {
      state.view = action.payload
    },
  },
})

export const { isView, setIsView } = viewStateSlice.actions
export default viewStateSlice.reducer
