import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import $api from '../../services/axios'

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/directories/event_part_categories/`, {
        params,
      })
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const fetchLevel = createAsyncThunk(
  'categories/fetchLevel',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/directories/discipline_level/`, { params })
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: {
      error: null,
      count: 0,
      isLoading: false,
      categories: [],
    },
    levels: {
      error: null,
      count: 0,
      isLoading: false,
      levels: [],
    },
  },
  reducers: {
    setCatData: (state, action) => {
      state.categories.categories = action.payload
      state.categories.count = action.payload.count ?? action.payload.length
    },
    setLevelData: (state, action) => {
      state.levels.levels = action.payload
      state.levels.count = action.payload.count ?? action.payload.length
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, ({ categories }) => {
      categories.isLoading = true
    })
    builder.addCase(fetchCategories.fulfilled, ({ categories }, action) => {
      categories.isLoading = false
      categories.categories = action.payload
      categories.count = action.payload.count ?? action.payload.length
      categories.error = null
    })
    builder.addCase(fetchCategories.rejected, ({ categories }, action) => {
      categories.isLoading = false
      categories.error = action.payload
      categories.categories = []
    })

    builder.addCase(fetchLevel.pending, ({ levels }) => {
      levels.isLoading = true
    })
    builder.addCase(fetchLevel.fulfilled, ({ levels }, action) => {
      levels.isLoading = false
      levels.levels = action.payload
      levels.count = action.payload.count ?? action.payload.length
      levels.error = null
    })
    builder.addCase(fetchLevel.rejected, ({ levels }, action) => {
      levels.isLoading = false
      levels.error = action.payload
      levels.categories = []
    })
  },
})

export const { getCatFromSSR } = categoriesSlice.actions

export const categoriesSelector = createSelector(
  (state) => state.categories.categories.categories,
  (state) => state.categories.levels.levels,
  (categories, levels) => [categories, levels],
)

export default categoriesSlice.reducer
