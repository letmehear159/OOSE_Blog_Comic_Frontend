// Data Access Layer: fetch dữ liệu từ server
import axios from './axios.customize.js'
const URL_BACKEND=import.meta.env.VITE_BACKEND_URL

export const getUsers = () => {
  return axios.get(URL_BACKEND+'/api/v1/users')

}
export const getUserById = (id) => axios.get(`/api/users/${id}`)
