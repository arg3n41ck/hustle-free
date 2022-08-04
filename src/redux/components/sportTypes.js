import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import $api from '../../services/axios'

export const fetchSportTypes = createAsyncThunk(
  'sportTypes/fetchSportTypes',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`directories/type_sport/`)
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const sportTypesSlice = createSlice({
  name: 'sportTypes',
  initialState: {
    sportTypes: {
      error: null,
      count: 0,
      isLoading: false,
      data: [],
    },
  },
  extraReducers: (builder) => {
    // FILTERING COUNTRIES
    builder.addCase(fetchSportTypes.pending, ({ sportTypes }) => {
      sportTypes.isLoading = true
    })
    builder.addCase(fetchSportTypes.fulfilled, ({ sportTypes }, action) => {
      sportTypes.isLoading = false
      sportTypes.data = action.payload
      sportTypes.count = action.payload.count ?? action.payload.length
      sportTypes.error = null
    })
    builder.addCase(fetchSportTypes.rejected, ({ sportTypes }, action) => {
      sportTypes.isLoading = false
      sportTypes.error = action.payload
      sportTypes.data = []
    })
  },
})

export const selectSportTypes = createSelector(
  (state) => state.sportTypes.sportTypes.data,
  (sportTypes) => [sportTypes],
)

export default sportTypesSlice.reducer
