import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import $api from "../../services/axios"

export const fetchAthleteTeams = createAsyncThunk(
  "sportTypes/fetchSportTypes",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/athlete/my_teams/`)
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  }
)

export const fetchTeams = createAsyncThunk(
  "teams/fetchTeams",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/teams/teams/`, {
        params,
      })
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  }
)

export const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    teams: {
      error: null,
      count: 0,
      isLoading: false,
      athleteTeams: [],
      teams: [],
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAthleteTeams.pending, ({ teams }) => {
      teams.isLoading = true
    })
    builder.addCase(fetchAthleteTeams.fulfilled, ({ teams }, action) => {
      teams.isLoading = false
      console.log(
        "action.payloadaction.payloadaction.payloadaction.payloadaction.payload",
        action.payload
      )
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
  },
})

export const teamsSelector = createSelector(
  (state) => state.teams.teams.athleteTeams,
  (state) => state.teams.teams.teams,
  (athleteTeams, teams) => [athleteTeams, teams]
)

export default teamsSlice.reducer
