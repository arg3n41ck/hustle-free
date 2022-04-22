import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import $api from "../../services/axios"

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/directory/country_city/`)
      return data
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  }
)

export const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: {
      error: null,
      count: 0,
      isLoading: false,
      data: [],
    },
  },
  extraReducers: (builder) => {
    // FILTERING COUNTRIES
    builder.addCase(fetchCountries.pending, ({ countries }) => {
      countries.isLoading = true
    })
    builder.addCase(fetchCountries.fulfilled, ({ countries }, action) => {
      countries.isLoading = false
      countries.data = action.payload
      countries.count = action.payload.count ?? action.payload.length
      countries.error = null
    })
    builder.addCase(fetchCountries.rejected, ({ countries }, action) => {
      countries.isLoading = false
      countries.error = action.payload
      countries.data = []
    })
  },
})

export const selectCountriesAndCities = createSelector(
  (state) => state.countries.countries.data,
  (state) =>
    state.countries.countries.data.reduce(
      (arr, { cityCountry }) =>
        !!cityCountry.length ? [...arr, ...cityCountry] : arr,
      []
    ),
  (countries, cities) => [countries, cities]
)

export default countriesSlice.reducer
