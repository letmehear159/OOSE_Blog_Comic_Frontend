// Business Logic Layer: xử lý logic giữa UI và API
import axios from '../api/axios.customize.js'
import { URL_BACKEND } from '../constants/api.js'

// Lấy tất cả users
export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(URL_BACKEND + '/api/v1/users')
    // Có thể xử lý format data ở đây nếu muốn
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

// Lấy thông tin user theo ID
export const fetchUserById = async (id) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/users/${id}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error)
    throw error
  }
}

// Lấy dữ liệu người dùng khi có token
export const fetchAccountAPI = async () => {
  try {
    const response = await axios.get(URL_BACKEND + '/api/v1/auth/account')
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    console.error(`Error fetching user with token:`, error)
    throw error
  }
}

export const resetNewPasswordAPI = async (email, newPassword) => {

  try {
    const response = await axios.put(URL_BACKEND + `/api/v1/users/email/${email}`, {
      password: newPassword
    })
    return response
  } catch (error) {
    throw error
  }
}

export const getUsersByIdsAPI = async (ids) => {
  const queryString = ids.map(id => `authorIds=${id}`).join('&')
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/users/listId?${queryString}`)
    return response
  } catch (error) {
    throw error
  }
}