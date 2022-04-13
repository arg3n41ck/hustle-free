import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import $api from "../../services/axios"

export const fetchEventsByParams = createAsyncThunk(
  "products/fetchGoodsByCategory",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/events/events/`, {
        params,
      })
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  }
)

export const fetchEvents = createAsyncThunk(
  "events/fetchEvent",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/events/events/`, {
        params,
      })
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  }
)

export const handleSearch = createAsyncThunk(
  "events/handleSearch",
  async (value, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/events/?search=${value}`)
      return data
    } catch (e) {
      return {
        error: rejectWithValue(e.response.data),
        value,
      }
    }
  }
)

export const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: {
      error: null,
      count: 0,
      isLoading: false,
      data: [],
    },
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.search.value = action.payload
      state.search.open = action.payload !== ""
    },
    setSearchOpen: (state, action) => {
      state.search.open = action.payload
    },
  },
  extraReducers: (builder) => {
    // FILTERING EVENTS
    builder.addCase(fetchEventsByParams.pending, ({ events }) => {
      events.isLoading = true
    })
    builder.addCase(fetchEventsByParams.fulfilled, ({ events }, action) => {
      events.isLoading = false
      events.data = action.payload
      events.count = action.payload.count ?? action.payload.length
      events.error = null
    })
    builder.addCase(fetchEventsByParams.rejected, ({ events }, action) => {
      events.isLoading = false
      events.error = action.payload
      events.data = []
    })
    // EVENTS
    builder.addCase(fetchEvents.pending, ({ events }) => {
      events.isLoading = true
    })
    builder.addCase(fetchEvents.fulfilled, ({ events }, action) => {
      events.isLoading = false
      events.data = action.payload
      events.count = action.payload.count ?? action.payload.length
      events.error = null
    })
    builder.addCase(fetchEvents.rejected, ({ events }, action) => {
      events.isLoading = false
      events.error = action.payload
      events.data = []
    })
    // EVENTS BY SEARCH VALUE
    builder.addCase(handleSearch.pending, ({ search }) => {
      search.isLoading = false
    })
    builder.addCase(handleSearch.fulfilled, ({ search }, action) => {
      search.data = action.payload
      search.isLoading = false
      search.error = ""
    })
    builder.addCase(handleSearch.rejected, ({ search }, action) => {
      search.isLoading = false
      search.error = action.payload
    })
  },
})

export const { setSearchValue, setSearchOpen, setCartLength } =
  eventsSlice.actions

export const selectEvents = createSelector(
  (state) => state.events.events.isLoading,
  (state) => state.events.events.data,
  (state) => state.events.events.count,
  (loading, events, count) => [loading, events, count]
)

export default eventsSlice.reducer
