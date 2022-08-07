import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import $api from '../../services/axios'
import { camelizeKeys } from 'humps'
import { localStorageRemoveItem } from '../../helpers/helpers'

// async actions
export const fetchUser = createAsyncThunk('user/get', async (params, { rejectWithValue }) => {
  try {
    let newData
    const { data } = await $api.get(`/accounts/users/me/`, { params })
    newData = data
    if (data.role === 'organizer') {
      const { data: organizerData } = await $api.get(`/organizers/`)
      newData = { ...data, ...organizerData[0].user, organizerId: organizerData[0].id }
    } else if (data.role === 'athlete') {
      const { data: athlete } = await $api.get(`/athletes/`)
      const {id: athleteId, ...rest} = athlete[0]
      newData = { athleteId, ...data[0], ...rest?.user, ...rest }
    } else if (data.role === 'team') {
      const { data: teamData } = await $api.get(`/teams/teams/?user=${data.id}`)
      const { id: teamId, user, ...rst } = teamData[0]
      newData = { teamId, ...data, ...rst.user, ...rst }
    }

    return camelizeKeys(newData)
  } catch (e) {
    return rejectWithValue(e.response.status)
  }
})

export const fetchOgEvents = createAsyncThunk(
  'user/get-og-events',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/events/events/`, { params })
      return data || []
    } catch (e) {
      return rejectWithValue(e.response.status)
    }
  },
)

// reducer
const initialState = {
  user: null,
  error: null,
  userAuthenticated: false,
}

export const profileMenuSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserItem(state, { payload }) {
      state.user[`${payload.userItem}`] = payload.value
    },
    saveUser(state, { payload }) {
      state.user = payload
    },
    exitUser(state) {
      state.user = initialState
      state.userAuthenticated = false
      localStorageRemoveItem('role')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action?.payload
      state.error = false
      state.userAuthenticated = true
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.error = action.payload
      state.userAuthenticated = false
    })
    builder.addCase(fetchOgEvents.fulfilled, (state, action) => {
      state.myEvents = action.payload
    })
    builder.addCase(fetchOgEvents.rejected, (state, action) => {
      state.errorOgEvents = action.payload
    })
  },
})

export const { saveUserItem, saveUser, exitUser } = profileMenuSlice.actions

export const selectIsUserAuth = createSelector(
  (state) => state.user.userAuthenticated,
  (userAuthenticated) => [userAuthenticated],
)

export const selectOgEvents = createSelector(
  (state) => {
    const ogEvents = state?.user?.myEvents
    return ogEvents?.length ? ogEvents.map(({ id }) => id) : []
  },
  (state) => {
    const ogEvents = state?.user?.myEvents
    return ogEvents?.length ? ogEvents : []
  },
  (ogEventsId, ogEvents) => [ogEventsId, ogEvents],
)

export default profileMenuSlice.reducer
