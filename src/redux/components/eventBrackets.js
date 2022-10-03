import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import $api from '../../services/axios'

export const fetchBracketsByParams = createAsyncThunk(
  'brackets/fetchBracketsByParams',
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

export const fetchBracketsFightsByParams = createAsyncThunk(
  'brackets/fetchBracketsFightsByParams',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/brackets/brackets_fights/`, {
        params,
      })
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const fetchBracket = createAsyncThunk(
  'brackets/fetchBracket',
  async ({ bracketId }, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/brackets/brackets/${bracketId}/`, {
        params,
      })
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const bracketsSlice = createSlice({
  name: 'brackets',
  initialState: {
    brackets: {
      error: null,
      count: 0,
      isLoading: false,
      data: [],
    },
    bracketsFights: {
      error: null,
      count: 0,
      isLoading: false,
      data: [],
    },
    bracket: {
      error: null,
      isLoading: false,
      data: null,
      id: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // BRACKETS BY PARAMS
    builder.addCase(fetchBracketsByParams.pending, ({ brackets }) => {
      brackets.isLoading = true
    })
    builder.addCase(fetchBracketsByParams.fulfilled, ({ brackets }, action) => {
      brackets.isLoading = false
      brackets.data = action.payload
      brackets.count = action.payload.count ?? action.payload.length
      brackets.error = null
    })
    builder.addCase(fetchBracketsByParams.rejected, ({ brackets }, action) => {
      brackets.isLoading = false
      brackets.error = action.payload
      brackets.data = []
    })
    // BRACKETS FIGHTS BY PARAMS
    builder.addCase(fetchBracketsFightsByParams.pending, ({ bracketsFights }) => {
      bracketsFights.isLoading = true
    })
    builder.addCase(fetchBracketsFightsByParams.fulfilled, ({ bracketsFights }, action) => {
      bracketsFights.isLoading = false
      bracketsFights.data = action.payload
      bracketsFights.count = action.payload.count ?? action.payload.length
      bracketsFights.error = null
    })
    builder.addCase(fetchBracketsFightsByParams.rejected, ({ bracketsFights }, action) => {
      bracketsFights.isLoading = false
      bracketsFights.error = action.payload
      bracketsFights.data = []
    })
    // BRACKET DETAIL
    builder.addCase(fetchBracket.pending, ({ bracket }) => {
      bracket.isLoading = true
    })
    builder.addCase(fetchBracket.fulfilled, ({ bracket }, action) => {
      bracket.isLoading = false
      bracket.data = action.payload
      bracket.id = action.payload?.id
      bracket.error = null
    })
    builder.addCase(fetchBracket.rejected, ({ bracket }, action) => {
      bracket.isLoading = false
      bracket.error = action.payload
      bracket.data = []
    })
  },
})

export const { setSearchValue, setSearchOpen, setCartLength } = bracketsSlice.actions

export const selectBrackets = createSelector(
  (state) => state.brackets.brackets,
  (state) => state.brackets.bracketsFights,
  (brackets, bracketsFights) => [brackets, bracketsFights],
)

export default bracketsSlice.reducer