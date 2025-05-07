import { getCurrentUser } from '../api/userApi.js'
import { login, register } from '../api/authApi.js'

export const loginAPI = async (username, password) => {
  try {
    const response = await login(username, password)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const registerAPI = async (username, password, email, displayName) => {
  try {
    const response = await register(username, password, email, displayName)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}
