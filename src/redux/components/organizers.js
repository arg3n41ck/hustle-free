import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import $api from '../../services/axios'

export const fetchOrganizers = createAsyncThunk(
  'organizers/organizers',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/organizers/`, { params })
      return data.results
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const organizersSlice = createSlice({
  name: 'organizers',
  initialState: {
    organizers: {
      error: null,
      count: 0,
      isLoading: false,
      organizers: [],
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrganizers.pending, ({ organizers }) => {
      organizers.isLoading = true
    })
    builder.addCase(fetchOrganizers.fulfilled, ({ organizers }, action) => {
      organizers.isLoading = false
      organizers.organizers = action.payload
      organizers.count = action.payload.count ?? action.payload.length
      organizers.error = null
    })
    builder.addCase(fetchOrganizers.rejected, ({ organizers }, action) => {
      organizers.isLoading = false
      organizers.error = action.payload
      organizers.organizers = []
    })
  },
})

export const organizersSelector = createSelector(
  (state) => state.organizers.organizers.organizers,
  (state) => state.organizers.organizers.count,
  (organizers, count) => [organizers, count],
)

export default organizersSlice.reducer
