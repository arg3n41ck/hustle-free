import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import $api from "../../services/axios"
import { camelizeKeys } from "humps"
import { clearTokens } from "../../services/JWTService"
import { localStorageRemoveItem } from "../../helpers/helpers"

// async actions
export const fetchUser = createAsyncThunk(
  "user/get",
  async (params, { rejectWithValue }) => {
    try {
      let newData
      const { data } = await $api.get(`/accounts/users/me/`)

      if (data.role === "organizer") {
        const { data: organizerData } = await $api.get(`/organizer/profile/`)
        newData = { ...data, ...organizerData[0].user }
      } else if (data.role === "athlete") {
        const { data: athlete } = await $api.get(`/athlete/profile/`)
        newData = { ...data, ...athlete[0].user }
      } else if (data.role === "team") {
        const { data: teamData } = await $api.get(`/teams/profile/`)
        const { user, ...rst } = teamData[0]
        newData = { ...data, ...user, ...rst }
      }

      return camelizeKeys(newData)
    } catch (e) {
      return rejectWithValue(e.response.status)
    }
  }
)

const initialState = {
  user: null,
  error: null,
  userAuthenticated: false,
}

export const profileMenuSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserItem(state, { payload }) {
      state.user[`${payload.userItem}`] = payload.value
    },
    saveUser(state, { payload }) {
      state.user = payload
    },
    exitUser(state) {
      clearTokens()
      state.user = initialState
      state.userAuthenticated = false
      localStorageRemoveItem("role")
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.userAuthenticated = true
      state.error = false
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.error = action.payload
      state.userAuthenticated = false
    })
  },
})

export const { saveUserItem, saveUser, exitUser } = profileMenuSlice.actions

export const selectIsUserAuth = createSelector(
  (state) => state.user.userAuthenticated,
  (userAuthenticated) => [userAuthenticated]
)

export default profileMenuSlice.reducer
