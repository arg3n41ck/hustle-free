import axios from "axios"
import { API_URL } from "./constants"
import { camelizeKeys, decamelizeKeys } from "humps"
import { getCookie, setCookie } from "./JWTService"
import { toast } from "react-toastify"
import clearCookies from "../helpers/clearCookies"

const $api = axios.create({
  baseURL: API_URL,
})

// export const refreshTokens = async () => {
//   const [cookies, setCookie] = useCookies(["token"])
//   const { data } = await $api.post(`/accounts/auth/jwt/refresh/`, { refresh })
//   console.log(data.access)
//   setCookie("token", data.access)
// }

$api.interceptors.request.use(
  (config) => {
    let token = getCookie("token")
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }
    config.data = decamelizeKeys(config.data)
    return config
  },
  (error) => Promise.reject(error)
)

$api.interceptors.response.use(
  async (config) => {
    config.data = await camelizeKeys(config.data)
    return config
  },
  async (error) => {
    const refreshToken = await getCookie("refresh")
    if (
      error?.response?.status === 401 &&
      error?.config?.url !== "/accounts/auth/jwt/refresh/"
    ) {
      try {
        const { data } = await axios.post(
          `${API_URL}accounts/auth/jwt/refresh/`,
          {
            refresh: getCookie("refresh"),
          }
        )
        await setCookie("token", data.access, 99999)
        return axios({
          ...error.config,
          headers: {
            Authorization: `Bearer ${data.access}`,
          },
        })
      } catch (e) {
        console.log("clearing token AXIOS")
        clearCookies()
        if (getCookie("token")) {
          location.href = "/login"
        }
        refreshToken &&
          toast.error(
            "Выполните авторизацию для получения полного доступа к сайту"
          )

        return Promise.reject(error)
      }
    }
    error?.response?.status !== 401 && toast.error("Что-то пошло не так!")
    return Promise.reject(error)
  }
)

export default $api
