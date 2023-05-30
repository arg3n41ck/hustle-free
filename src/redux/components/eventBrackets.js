import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import $api from '../../services/axios'
// import { camelizeKeys } from 'humps'
// import axios from 'axios'

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
  async ({ bracket, type }, { rejectWithValue }) => {
    try {
      if (type == 7) {
        const { data } = await $api.get(`/brackets/brackets_fights/?bracket=${bracket}`)
        return data
      }
      const { data } = await $api.get(`/brackets/test_brackets/${bracket}/`)
      return data
      // const {
      //   data: { fights },
      // } = await axios.get(`http://192.168.0.114:8000/api/brackets/33/`)
      // return camelizeKeys(fights)
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

export const fetchBracketResults = createAsyncThunk(
  'brackets/fetchBracketsResults',
  async ({ bracketId }, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/brackets/brackets/${bracketId}/bracket_results/`)
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
    participantAthletes: {
      error: null,
      isLoading: false,
      data: null,
      id: null,
    },
    bracketsResults: {
      error: null,
      isLoading: false,
      results: null,
      id: null,
    },
  },
  reducers: {
    setSelectedBracket: (state, action) => {
      state.bracket = action.payload
    },
    clearBF: (state) => {
      state.bracketsFights = {
        error: null,
        count: 0,
        isLoading: false,
        data: [],
      }
    },
    setBFOnWin: (state, { payload }) => {
      const { currentBFID, winner, winnerBFIDs, loser, loserBFIDs } = payload
      const newBFs = state.bracketsFights.data.map((bf) => {
        if (bf?.id == currentBFID && winner?.id) {
          return { ...bf, winner: winner?.id }
        }

        if (!!winnerBFIDs?.includes(bf?.id) && winner?.id) {
          return {
            ...bf,
            fighters: [...bf?.fighters, winner],
          }
        }

        if (loserBFIDs?.includes(bf?.id) && loser?.id) {
          return {
            ...bf,
            fighters: [...bf?.fighters, loser],
          }
        }

        return bf
      })
      state.bracketsFights.data = newBFs
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
    // BRACKET RESULTS
    builder.addCase(fetchBracketResults.pending, ({ bracketsResults }) => {
      bracketsResults.isLoading = true
    })
    builder.addCase(fetchBracketResults.fulfilled, ({ bracketsResults }, action) => {
      bracketsResults.isLoading = false
      bracketsResults.data = action.payload
      bracketsResults.error = null
    })
    builder.addCase(fetchBracketResults.rejected, ({ bracketsResults }, action) => {
      bracketsResults.isLoading = false
      bracketsResults.error = action.payload
      bracketsResults.data = null
    })
    // BRACKET
    builder.addCase(fetchBracket.pending, ({ bracket }) => {
      bracket.isLoading = true
    })
    builder.addCase(fetchBracket.fulfilled, ({ bracket }, action) => {
      bracket.isLoading = false
      bracket.data = action.payload
      bracket.error = null
    })
    builder.addCase(fetchBracket.rejected, ({ bracket }, action) => {
      bracket.isLoading = false
      bracket.error = action.payload
      bracket.data = null
    })
  },
})

export const { setSelectedBracket, setBFOnWin, clearBF } = bracketsSlice.actions

export const selectBrackets = createSelector(
  (state) => state.brackets.brackets,
  (state) => state.brackets.bracketsFights,
  (state) => state.brackets.participantAthletes,
  (state) => state.brackets.bracketsResults,
  (state) => state.brackets.bracket,
  (brackets, bracketsFights, participantAthletes, bracketsResults, bracket) => [
    brackets,
    bracketsFights,
    participantAthletes,
    bracketsResults,
    bracket.data,
  ],
)

export default bracketsSlice.reducer
