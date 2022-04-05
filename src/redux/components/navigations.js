import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: "profile",
  changeProfileValue: "general",
  changeStartUpValue: "",
  teamMembersValue: "all",
  authCheck: false,
  createStartupTabsValue: "general",
}

export const navigationsSlice = createSlice({
  name: "navigations",
  initialState,
  reducers: {
    change: (state, action) => {
      state.value = action.payload
    },
    changeProfile: (state, action) => {
      state.changeProfileValue = action.payload
    },
    changeStartUp: (state, action) => {
      state.changeStartUpValue = action.payload
    },
    changeTeamMembers: (state, action) => {
      state.teamMembersValue = action.payload
    },
    changeAuthCheck: (state, action) => {
      state.authCheck = action.payload
    },
    changeCreateStartupTabsValue: (state, action) => {
      state.createStartupTabsValue = action.payload
    },
  },
})

export const {
  change,
  changeProfile,
  changeStartUp,
  changeTeamMembers,
  changeAuthCheck,
  changeCreateStartupTabsValue
} = navigationsSlice.actions

export default navigationsSlice.reducer
