import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import $api from "../../services/axios"

// actions
export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async () => {
    const { data: countryData } = await $api.get(`/directory/country_city/`)

    return countryData
  }
)

const initialState = {
  countries: [],
}

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      state.countries = action.payload
    })
  },
})

export default locationsSlice.reducer
