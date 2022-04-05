import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import $api from "../../services/axios"
import axios from "axios"
import { getCookie } from "../../services/JWTService"

// async actions
export const fetchStartups = createAsyncThunk("startups/get", async () => {
  const { data } = await $api.get(`/startup/startups/`)
  return data
})

export const changeStartupItemThunk = createAsyncThunk(
  "startup/details-item",
  async ({ pathItem, values }) => {
    try {
      const newArray = []
      for (let item of values) {
        let resItem = null
        if (item.id) {
          resItem = await $api.patch(`/startup/${pathItem}/${item.id}/`, item)
        } else {
          resItem = await $api.post(`/startup/${pathItem}/`, item)
        }
        newArray.push(resItem.data)
      }
      return newArray
    } catch (e) {
      console.log(e)
      return []
    }
  }
)

export const changeFormatDataThunk = createAsyncThunk(
  "startups/details-format-data",
  async ({ itemData, path }) => {
    const body = new FormData()
    for (const key in itemData) {
      if (Array.isArray(itemData[key])) {
        itemData[key].forEach((itemOfItem) => body.append(key, itemOfItem))
      } else {
        if (key === "image" || key === "logo") {
          if (typeof itemData[key] !== "string" && !!itemData[key])
            body.append(key, itemData[key])
        } else {
          body.append(key, itemData[key])
        }
      }
    }
    try {
      let data
      if (itemData?.id) {
        data = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}${path}${itemData?.id}/`,
          body,
          {
            headers: {
              // "Content-type": "application/json",
              Authorization: `Bearer ${getCookie("token")}`,
              "Content-type": "multipart/form-data;",
            },
          }
        )
      } else {
        data = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}${path}`,
          body,
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
              "Content-type":
                "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
            },
          }
        )
      }
      return data
    } catch (e) {
      console.log(e)
    }
    // return await FormatDataPutReq(data, id, action)
  }
)

const initialState = {
  startups: [],
  type: "change", // create | details
  changeStartup: {
    title: "",
    shortDescription: "",
    longDescription: "",
    link: "",
    industries: "",
    technologies: "",
    stages: "",
    salesModel: "",
    region: "",
    fundings: "",
    businessModel: "",
    startWork: "",
    presentation: "",
    logo: null,
    numberOfTeam: "",
    teamMembers: [],
    legalEntities: null,
    businessPrograms: [
      { title: "", dataOfStart: null, dataOfEnd: null, link: "" },
    ],
    legalEntitiesChecker: false,
    companyName: "",
    innBin: "",
    media: [{ title: "", link: "" }],
    galleries: [],
  },
  changeService: {
    title: "",
    description: "",
    condition: "",
    priceFrom: "",
    priceTo: "",
  },
  changeServiceId: null,
}

export const startupsSlice = createSlice({
  name: "startups",
  initialState,
  reducers: {
    saveStartupItem(state, { payload }) {
      state.startups[`${payload.startupItem}`] = payload.value
    },
    changeChangeStartupItem(state, { payload }) {
      state.changeStartup[`${payload.startupItem}`] = payload.value
    },
    saveStartups(state, { payload }) {
      state.startups = payload
    },
    saveChangeStartup(state, { payload }) {
      state.changeStartup = payload
    },
    changeChangeService(state, { payload }) {
      state.changeService = payload
    },
    changeChangeServiceId(state, { payload }) {
      state.changeServiceId = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchStartups.fulfilled,
      (state, { payload: { results, ...pagination } }) => {
        state.startups = results
        Object.keys(pagination).forEach((key) => {
          state[key] = pagination[key]
        })
      }
    )
  },
})

export const {
  saveStartupItem,
  saveStartups,
  saveChangeStartup,
  changeChangeStartupItem,
  changeChangeService,
  changeChangeServiceId,
} = startupsSlice.actions

export default startupsSlice.reducer
