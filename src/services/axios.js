import axios from 'axios'
import { API_URL } from './constants'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { getCookie, setCookie } from './JWTService'
import { toast } from 'react-toastify'
import clearCookies from '../utils/clearCookies'

const $api = axios.create({
  baseURL: API_URL,
})

$api.interceptors.request.use(
  (config) => {
    let token = getCookie('token')
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }
    config.data = decamelizeKeys(config.data)
    return config
  },
  (error) => Promise.reject(error),
)

$api.interceptors.response.use(
  (config) => {
    config.data = camelizeKeys(config.data)
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refresh = getCookie('refresh')
        if (refresh) {
          const { status, data } = await axios.post(`${API_URL}accounts/auth/jwt/refresh/`, {
            refresh: refresh,
          })
          if (status === 200) {
            setCookie('token', data.access, 99999)
            return axios({
              ...error.config,
              headers: {
                Authorization: `Bearer ${data.access}`,
              },
            })
          } else {
            return Promise.reject(error)
          }
        }
      } catch (e) {
        if (getCookie('token')) {
          location.href = '/login'
          toast.error('Выполните авторизацию для получения полного доступа к сайту')
        }
        clearCookies()
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  },
)

export default $api
