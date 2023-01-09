import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import $api from '../../services/axios'

export const fetchAthleteTeams = createAsyncThunk(
  'teams/teams',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/teams/athlete_requests/`, { params })
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const fetchTeams = createAsyncThunk(
  'teams/fetchTeams',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/teams/teams/`, {
        params,
      })
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const fetchTeam = createAsyncThunk(
  'teams/fetchTeam',
  async ({ teamId }, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/teams/teams/${teamId}/`)
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const getIsUserInTeam = createAsyncThunk(
  'teams/getIsUserInTeam',
  async ({ teamId }, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/teams/teams/${teamId}/check_athlete/`)
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const teamsSlice = createSlice({
  name: 'teams',
  initialState: {
    teams: {
      error: null,
      count: 0,
      isLoading: false,
      athleteTeams: [],
      teams: [],
    },
    team: {
      error: null,
      team: null,
      isLoading: false,
      userStatusInTeam: {
        error: null,
        status: null,
        isLoading: false,
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAthleteTeams.pending, ({ teams }) => {
      teams.isLoading = true
    })
    builder.addCase(fetchAthleteTeams.fulfilled, ({ teams }, action) => {
      teams.isLoading = false
      teams.athleteTeams = action.payload
      teams.count = action.payload.count ?? action.payload.length
      teams.error = null
    })
    builder.addCase(fetchAthleteTeams.rejected, ({ teams }, action) => {
      teams.isLoading = false
      teams.error = action.payload
      teams.athleteTeams = []
    })

    builder.addCase(fetchTeams.pending, ({ teams }) => {
      teams.isLoading = true
    })
    builder.addCase(fetchTeams.fulfilled, ({ teams }, action) => {
      teams.isLoading = false
      teams.teams = action.payload
      teams.count = action.payload.count ?? action.payload.length
      teams.error = null
    })
    builder.addCase(fetchTeams.rejected, ({ teams }, action) => {
      teams.isLoading = false
      teams.error = action.payload
      teams.teams = []
    })

    builder.addCase(fetchTeam.pending, ({ team }) => {
      team.isLoading = true
    })
    builder.addCase(fetchTeam.fulfilled, ({ team }, action) => {
      team.isLoading = false
      team.team = action.payload
      team.error = null
    })
    builder.addCase(fetchTeam.rejected, ({ team }, action) => {
      team.isLoading = false
      team.error = action.payload
      team.team = null
    })

    builder.addCase(getIsUserInTeam.pending, ({ team: { userStatusInTeam } }) => {
      userStatusInTeam.isLoading = true
    })
    builder.addCase(getIsUserInTeam.fulfilled, ({ team: { userStatusInTeam } }, action) => {
      userStatusInTeam.isLoading = false
      userStatusInTeam.status = action.payload
      userStatusInTeam.error = null
    })
    builder.addCase(getIsUserInTeam.rejected, ({ team: { userStatusInTeam } }, action) => {
      userStatusInTeam.isLoading = false
      userStatusInTeam.error = action.payload
      userStatusInTeam.status = null
    })
  },
})

export const teamsSelector = createSelector(
  (state) => state.teams.teams.athleteTeams,
  (state) => state.teams.teams.teams,
  (state) => state.teams.teams.count,
  (athleteTeams, teams, count) => [athleteTeams, teams, count],
)

export default teamsSlice.reducer
