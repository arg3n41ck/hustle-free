import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import $api from "../../services/axios"

export const fetchTechnologies = createAsyncThunk(
  "technologies/get",
  async () => {
    const { data } = await $api.get(`/startup/technologies/`)
    return data
  }
)

const initialState = {
  technologies: [],
}

export const technologiesSlice = createSlice({
  name: "technologies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTechnologies.fulfilled,
      (state, { payload: { results, ...pagination } }) => {
        state.technologies = results
        Object.keys(pagination).forEach((key) => {
          state[key] = pagination[key]
        })
      }
    )
  },
})

export default technologiesSlice.reducer
