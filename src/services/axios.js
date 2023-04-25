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
    const refreshToken = getCookie('refresh')
    if (error?.response?.status === 401 && error?.config?.url !== '/accounts/auth/jwt/refresh/') {
      try {
        const { data } = await axios.post(`${API_URL}accounts/auth/jwt/refresh/`, {
          refresh: getCookie('refresh'),
        })
        setCookie('token', data.access, 99999)
        return axios({
          ...error.config,
          headers: {
            Authorization: `Bearer ${data.access}`,
          },
        })
      } catch (e) {
        clearCookies()
        if (getCookie('token')) {
          location.href = '/login'
        }
        refreshToken && toast.error('Выполните авторизацию для получения полного доступа к сайту')

        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  },
)

export default $api
