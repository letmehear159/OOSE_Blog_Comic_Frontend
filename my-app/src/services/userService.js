// Business Logic Layer: xử lý logic giữa UI và API
import { getUserById, getCurrentUser, getAllUsers, URL_BACKEND } from '../api/userApi'
import axios from '../api/axios.customize.js'

// Lấy tất cả users
export const fetchAllUsers = async () => {
  try {
    const response = await getAllUsers()
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
    const response = await getUserById(id)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response.data
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error)
    throw error
  }
}

// Lấy dữ liệu người dùng khi có token
export const fetchAccount = async () => {
  try {
    const response = await getCurrentUser()
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response.data
  } catch (error) {
    console.error(`Error fetching user with token:`, error)
    throw error
  }
}

export const resetNewPassword = async (email, newPassword) => {

  try {
    const response = await axios.put(URL_BACKEND + `/api/v1/users/email/${email}`, {
      password: newPassword
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}