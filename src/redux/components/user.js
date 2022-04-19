import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import $api from "../../services/axios"
import { camelizeKeys } from "humps"
import axios from "axios"
import { getCookie } from "../../services/JWTService"
import { toast } from "react-toastify"
import { changeOgTabValue } from "./navigations"

// async actions
export const fetchUser = createAsyncThunk("user/get", async () => {
  let newData = {}
  const { data } = await $api.get(`/accounts/users/me/`)
  newData = { ...newData, ...data }
  if (data.role === "organizer") {
    const { data: organizerData } = await $api.get(`/organizer/profile/`)
    newData = { ...newData, ...organizerData[0].user }
  } else if (data.role === "athlete") {
  } else if (data.role === "team") {
    const { data: teamData } = await $api.get(`/teams/profile/`)
    const { user, ...rst } = teamData[0]
    newData = { ...newData, ...user, ...rst }
  }

  return camelizeKeys(newData)
})


export const changeUserItemThunk = createAsyncThunk(
  "user/details-item",
  async ({ pathItem, values }) => {
    toast.info("Идет обработка данных пользователя...")
    try {
      const array = [...values]
      const newArray = []
      array.forEach((item) => {
        if (item.id) {
          $api.put(`/accounts/${pathItem}/${item.id}/`, item, {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          })
        } else {
          $api.post(`/accounts/${pathItem}/`, item, {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          })
        }
        newArray.push(item)
      })
      toast.success("Изменения в данных пользователя прошли успешно!")
      return newArray
    } catch (e) {
      console.log(e)
    }
  }
)

// const FormatDataPutReq = async (data, id, action) => {
//   try {
//     if (action === "PUT") {
//       return await axios.put(
//         `https://api.dev.main.jva.vc/api/v1/accounts/certificates/${id}/`,
//         data,
//         {
//           headers: {
//             // "Content-type": "application/json",
//             Authorization: `Bearer ${getCookie("token")}`,
//             "Content-type":
//               "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
//           },
//         }
//       )
//     } else if (action === "POST") {
//       return await axios.post(
//         `https://api.dev.main.jva.vc/api/v1/accounts/certificates/`,
//         data,
//         {
//           headers: {
//             // "Content-type": "application/json",
//             Authorization: `Bearer ${getCookie("token")}`,
//             "Content-type":
//               "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
//           },
//         }
//       )
//     }
//   } catch (e) {
//     // console.log(e.response)
//   }
// }

export const changeFormatDataThunk = createAsyncThunk(
  "user/details-certificates",
  async ({ itemData, path, showPopup = true }) => {
    showPopup && toast.info("Идет обработка данных пользователя...")
    const body = new FormData()
    for (const key in itemData) {
      if (Array.isArray(itemData[key])) {
        itemData[key].forEach((itemOfItem) => body.append(key, itemOfItem))
      } else {
        if (key === "image") {
          if (typeof itemData[key] !== "string") body.append(key, itemData[key])
        } else {
          body.append(key, itemData[key])
        }
      }
    }
    let response
    try {
      if (itemData?.id) {
        response = await axios.put(
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
        response = await axios.post(
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
      showPopup &&
        toast.success("Изменения в данных пользователя прошли успешно!")
      return response
    } catch (e) {
      console.log(e)
      toast.success("Что-то пошло не так!")
    }
    // return await FormatDataPutReq(data, id, action)
  }
)

export const saveUserThunk = createAsyncThunk(
  "user/details",
  async ({ user }) => {
    const body = new FormData()
    for (const key in user) {
      if (Array.isArray(user[key])) {
        user[key].forEach((itemOfItem) => body.append(key, itemOfItem))
      } else {
        body.append(key, user[key])
      }
    }
    return await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}accounts/users/me/`,
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
)

// reducer
const initialState = {
  user: {
    id: null,
    email: "",
    firstName: null,
    lastName: null,
    phoneNumber: "",
    gender: null,
    dateBirthday: null,
    age: null,
    role: "",
    country: null,
    city: null,
    avatar: null,
    nameOrganization: null,
    address: null,
  },
}

export const profileMenuSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserItem(state, { payload }) {
      state.user[`${payload.userItem}`] = payload.value
    },
    saveUser(state, { payload }) {
      state.user = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = { ...state.user, ...action.payload }
    })
  },
})

export const { saveUserItem, saveUser, checkProgress } =
  profileMenuSlice.actions

export default profileMenuSlice.reducer
