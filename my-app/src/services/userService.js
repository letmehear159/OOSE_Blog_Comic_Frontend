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

// Lấy thông tin user theo email
export const fetchUserByEmail = async (email) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/users/email/${email}`)
    return response
  } catch (error) {
    throw error;
  }
};

// Lấy thông tin user theo username
export const fetchUserByUsername = async (username) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/users/username/${username}`)
    return response
  }
  catch (error) {
    throw error
  }
};

export const updateUser = async (id, userData) => {
  try {
    // Sử dụng endpoint chuẩn để cập nhật thông tin người dùng
    const response = await axios.put(URL_BACKEND + `/api/v1/users/${id}`, userData)
    return response
  } catch (error) {
    throw error
  }
}

export const updateUserAvatarService = async (id, avatar) => {
  try {
    const response = await axios.put(URL_BACKEND + `/api/v1/users/${id}/avatar`, { avatar })
    return response
  } catch (error) { 
    throw error
  }
}

export const updateUserToken = async (id, userData) => {
  try {
    // Gửi dữ liệu cập nhật user lên BE, nhận về access token mới
    const response = await axios.put(URL_BACKEND + `/api/v1/users/token/${id}`, userData);
    
    // Trường hợp 1: Backend trả về string token trực tiếp (không qua axios transformResponse)
    if (typeof response === 'string') {
      return response;
    }
    
    // Trường hợp 2: Response thông thường
    if (response && response.data) {
      // Kiểm tra data là string
      if (typeof response.data === 'string') {
        return response.data;
      } 
      // Kiểm tra data.data tồn tại
      else if (response.data.data) {
        return response.data.data;
      }
    }
    
    // Log thông tin debug nhưng không ảnh hưởng đến người dùng
    console.debug('updateUserToken response format:', response);
    return response; // Trả về bất kỳ thứ gì backend đã gửi
  } catch (error) {
    console.error('updateUserToken: Lỗi khi gọi API', error);
    throw error;
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