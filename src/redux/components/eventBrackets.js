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
      const { data } = await $api.get(`/brackets/brackets/${bracketId}/`)
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const fetchParticipantAthletes = createAsyncThunk(
  'brackets/fetchParticipantAthletes',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/events/participant_athletes/`, {
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
    bracket: null,
    participantAthletes: {
      error: null,
      isLoading: false,
      data: null,
      id: null,
    },
  },
  reducers: {
    setSelectedBracket: (state, action) => {
      state.bracket = action.payload
    },
  },
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
      bracketsFights.data = null
      bracketsFights.count = 0
      bracketsFights.error = null
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
      bracketsFights.count = 0
      bracketsFights.data = null
    })
    // BRACKET PARTICIPANTS
    builder.addCase(fetchParticipantAthletes.pending, ({ participantAthletes }) => {
      participantAthletes.isLoading = true
    })
    builder.addCase(fetchParticipantAthletes.fulfilled, ({ participantAthletes }, action) => {
      participantAthletes.isLoading = false
      participantAthletes.data = action.payload
      participantAthletes.id = action.payload?.id
      participantAthletes.error = null
    })
    builder.addCase(fetchParticipantAthletes.rejected, ({ participantAthletes }, action) => {
      participantAthletes.isLoading = false
      participantAthletes.error = action.payload
      participantAthletes.data = []
    })
  },
})

export const { setSelectedBracket } = bracketsSlice.actions

export const selectBrackets = createSelector(
  (state) => state.brackets.brackets,
  (state) => state.brackets.bracketsFights,
  (state) => state.brackets.participantAthletes,
  (brackets, bracketsFights, participantAthletes) => [
    brackets,
    bracketsFights,
    participantAthletes,
  ],
)

export default bracketsSlice.reducer
