import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import $api from "../../services/axios"

export const fetchAthletesByParams = createAsyncThunk(
  "athlete/fetchAthletesByParams",
  async (params, { rejectWithValue }) => {
    try {
      
      const {
        data: { results },
      } = await $api.get(`/athlete/athletes_list/`, {
        params,
      })
      return results
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  }
)

export const athletesSlice = createSlice({
  name: "athletes",
  initialState: {
    error: null,
    count: 0,
    isLoading: false,
    data: [],
  },
  extraReducers: (builder) => {
    // FILTERING ATHLETES BY PARAMS
    builder.addCase(fetchAthletesByParams.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAthletesByParams.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
      state.count = action.payload.count ?? action.payload.length
      state.error = null
    })
    builder.addCase(fetchAthletesByParams.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
      state.data = []
    })
  },
})

export const selectAthletes = createSelector(
  (state) => state.athletes.isLoading,
  (state) => state.athletes.data,
  (state) => state.athletes.count,
  (state) => state.athletes.error,
  (loading, athletes, count, error) => [loading, athletes, count, error]
)

export default athletesSlice.reducer
