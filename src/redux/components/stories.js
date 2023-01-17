import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import $api from '../../services/axios'

export const fetchAthleteStories = createAsyncThunk(
  'stories/fetchAthleteStories',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/events/participants/`, { params })
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)
export const fetchAthleteStatistics = createAsyncThunk(
  'stories/fetchAthleteStatistics',
  async ({ athleteId }, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/athletes/history/${athleteId}/stats/`)
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const storiesSlice = createSlice({
  name: 'stories',
  initialState: {
    stories: {
      error: null,
      count: 0,
      isLoading: false,
      athleteStories: [],
    },
    statistics: {
      error: null,
      isLoading: false,
      statistics: null,
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAthleteStories.pending, ({ stories }) => {
      stories.isLoading = true
    })
    builder.addCase(fetchAthleteStories.fulfilled, ({ stories }, action) => {
      const { count, results } = action.payload
      stories.isLoading = false
      stories.athleteStories = results
      stories.count = count ?? results.length
      stories.error = null
    })
    builder.addCase(fetchAthleteStories.rejected, ({ stories }, action) => {
      stories.isLoading = false
      stories.error = action.payload
      stories.athleteStories = []
    })

    builder.addCase(fetchAthleteStatistics.pending, ({ statistics }) => {
      statistics.isLoading = true
    })
    builder.addCase(fetchAthleteStatistics.fulfilled, ({ statistics }, action) => {
      statistics.isLoading = false
      statistics.statistics = action.payload
      statistics.error = null
    })
    builder.addCase(fetchAthleteStatistics.rejected, ({ statistics }, action) => {
      statistics.isLoading = false
      statistics.error = action.payload
      statistics.statistics = null
    })
  },
})

export const storiesSelector = createSelector(
  (state) => state.stories.stories.athleteStories,
  (state) => state.stories.stories.count,
  (athleteStories, count) => [athleteStories, count],
)

export default storiesSlice.reducer
