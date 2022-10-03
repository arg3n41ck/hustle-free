import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import $api from '../../services/axios'

export const fetchParticipantCategories = createAsyncThunk(
  'pc/fetchParticipantCategories',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/directories/participant_category/`, {
        params,
      })
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const participantCategoriesSlice = createSlice({
  name: 'pc',
  initialState: {
    participantCategories: {
      error: null,
      count: 0,
      isLoading: false,
      data: [],
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchParticipantCategories.pending, ({ participantCategories }) => {
      participantCategories.isLoading = true
    })
    builder.addCase(fetchParticipantCategories.fulfilled, ({ participantCategories }, action) => {
      participantCategories.isLoading = false
      participantCategories.data = action.payload
      participantCategories.count = action.payload.count ?? action.payload.length
      participantCategories.error = null
    })
    builder.addCase(fetchParticipantCategories.rejected, ({ participantCategories }, action) => {
      participantCategories.isLoading = false
      participantCategories.error = action.payload
      participantCategories.data = []
    })
  },
})

export default participantCategoriesSlice.reducer
