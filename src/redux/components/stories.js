import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import $api from "../../services/axios"

export const fetchAthleteStories = createAsyncThunk(
  "stories/fetchAthleteStories",
  async (period, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/athlete/athlete_history/`, {
        params: {
          period,
        },
      })
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  }
)

export const storiesSlice = createSlice({
  name: "stories",
  initialState: {
    stories: {
      error: null,
      count: 0,
      isLoading: false,
      athleteStories: [],
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAthleteStories.pending, ({ stories }) => {
      stories.isLoading = true
    })
    builder.addCase(fetchAthleteStories.fulfilled, ({ stories }, action) => {
      stories.isLoading = false
      stories.athleteStories = action.payload
      stories.count = action.payload.count ?? action.payload.length
      stories.error = null
    })
    builder.addCase(fetchAthleteStories.rejected, ({ stories }, action) => {
      stories.isLoading = false
      stories.error = action.payload
      stories.athleteStories = []
    })
  },
})

export const storiesSelector = createSelector(
  (state) => state.stories.stories.athleteStories,
  (athleteStories) => [athleteStories]
)

export default storiesSlice.reducer
