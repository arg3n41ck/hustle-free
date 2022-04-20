import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  authCheck: false,
}

export const navigationsSlice = createSlice({
  name: "navigations",
  initialState,
  reducers: {
    changeAuthCheck: (state, action) => {
      state.authCheck = action.payload
    },
  },
})

export const {
  changeAuthCheck,
} = navigationsSlice.actions

export default navigationsSlice.reducer
