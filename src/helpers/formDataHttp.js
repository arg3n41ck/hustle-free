import axios from "axios"
import { objToFormData } from "./formData"
import { getCookie } from "../services/JWTService"
import { API_URL } from "../services/constants"

export async function formDataHttp(
  data,
  url,
  method = "put",
  headers = {
    "Content-type":
      "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    Authorization: `Bearer ${getCookie("token")}`,
  }
) {
  const formData = await objToFormData(data)
  return axios({
    method,
    url: `${API_URL}${url}`,
    data: formData,
    headers,
  })
}
