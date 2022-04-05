import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import $api from "../../services/axios"

export const fetchSkills = createAsyncThunk("skills/get", async () => {
  const { data } = await $api.get(`/accounts/skills/`)
  return data
})

const initialState = {
  skills: [],
}

export const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSkills.fulfilled, (state, {payload: {results, ...pagination}}) => {
      state.skills = results;
      Object.keys(pagination).forEach(key => {
        state[key] = pagination[key];
      })
    })
  },
})

export default skillsSlice.reducer
