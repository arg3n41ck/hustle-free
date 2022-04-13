import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  cities: [],
  countries: [],
}

export const fetchCities = createAsyncThunk("cities/get", async () => {
  const { data } = await axios.get(
    `http://api.dev.hustlefree.pro/en/api/v1/directory/city/`
  )
  return data
})

export const fetchCountries = createAsyncThunk("countries/get", async () => {
  const { data } = await axios.get(
    `http://api.dev.hustlefree.pro/en/api/v1/directory/country/`
  )
  return data
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCities.fulfilled, (state, { payload }) => {
      state.cities = payload
    })
    builder.addCase(fetchCountries.fulfilled, (state, { payload }) => {
      state.countries = payload
    })
  },
})

export const {} = authSlice.actions

export default authSlice.reducer
