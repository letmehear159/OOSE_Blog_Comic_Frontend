// Data Access Layer: fetch dữ liệu từ server
import axios from './axios.customize.js'

export const URL_BACKEND = import.meta.env.VITE_BACKEND_URL
export const URL_BACKEND_IMAGES = URL_BACKEND + '/uploads'

export const getAllUsers = () => {
  return axios.get(URL_BACKEND + '/api/v1/users')
}

export const getCurrentUser = () => {
  return axios.get(URL_BACKEND + '/api/v1/auth/account')
}
export const getUserById = (id) => axios.get(`/api/v1/users/${id}`)
