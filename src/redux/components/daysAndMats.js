import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import $api from '../../services/axios'
import { EventMatsClient } from '../../services/apiClients/eventMatsClient'

const eventMatsClient = new EventMatsClient()

export const fetchDaysByParams = createAsyncThunk(
  'daysAndMats/fetchDaysByParams',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await eventMatsClient.getEventDays(params)
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const fetchMatsByParams = createAsyncThunk(
  'daysAndMats/fetchMatsByParams',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/brackets/brackets/`, {
        params,
      })
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const fetchMatsWithBrackets = createAsyncThunk(
  'daysAndMats/fetchMatsWithBrackets',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/mats/event_mats_brackets/`, {
        params,
      })
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const daysAndMats = createSlice({
  name: 'daysAndMats',
  initialState: {
    days: {
      error: null,
      count: 0,
      isLoading: false,
      data: [],
    },
    mats: {
      error: null,
      count: 0,
      isLoading: false,
      data: [],
    },
    matsWithBrackets: {
      error: null,
      count: 0,
      isLoading: false,
      data: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // DAYS BY PARAMS
    builder.addCase(fetchDaysByParams.pending, ({ days }) => {
      days.isLoading = true
    })
    builder.addCase(fetchDaysByParams.fulfilled, ({ days }, action) => {
      days.isLoading = false
      days.data = action.payload
      days.count = action.payload.data?.length
      days.error = null
    })
    builder.addCase(fetchDaysByParams.rejected, ({ days }, action) => {
      days.isLoading = false
      days.error = action.payload
      days.data = []
    })

    // DAYS BY PARAMS
    builder.addCase(fetchMatsByParams.pending, ({ mats }) => {
      mats.isLoading = true
    })
    builder.addCase(fetchMatsByParams.fulfilled, ({ mats }, action) => {
      mats.isLoading = false
      mats.data = action.payload
      mats.count = action.payload.count ?? action.payload.length
      mats.error = null
    })
    builder.addCase(fetchMatsByParams.rejected, ({ mats }, action) => {
      mats.isLoading = false
      mats.error = action.payload
      mats.data = []
    })

    // MATS WITH BRACKETS BY PARAMS
    builder.addCase(fetchMatsWithBrackets.pending, ({ matsWithBrackets }) => {
      matsWithBrackets.isLoading = true
    })
    builder.addCase(fetchMatsWithBrackets.fulfilled, ({ matsWithBrackets }, action) => {
      matsWithBrackets.isLoading = false
      matsWithBrackets.data = action.payload
      matsWithBrackets.count = action.payload.count ?? action.payload.length
      matsWithBrackets.error = null
    })
    builder.addCase(fetchMatsWithBrackets.rejected, ({ matsWithBrackets }, action) => {
      matsWithBrackets.isLoading = false
      matsWithBrackets.error = action.payload
      matsWithBrackets.data = []
    })
  },
})

export default daysAndMats.reducer
