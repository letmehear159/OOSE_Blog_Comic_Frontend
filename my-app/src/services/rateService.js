import axios from '../api/axios.customize.js'
import { URL_BACKEND } from '../constants/api.js'

export const getAllRateCountAPI = async () => {
  try {
    // Sử dụng endpoint chuẩn để cập nhật thông tin người dùng
    const response = await axios.get(URL_BACKEND + `/api/v1/rates/count-all`)
    return response
  } catch (error) {
    throw error
  }
}