import axios from "axios"
import { objToFormData } from "./formData"
import { getCookie } from "../services/JWTService"

export function formDataHttp(
  data,
  url,
  method = "put",
  headers = {
    "Content-type":
      "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    Authorization: `Bearer ${getCookie("token")}`,
  }
) {
  return axios({
    method,
    url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    data: objToFormData(data),
    headers,
  })
}
