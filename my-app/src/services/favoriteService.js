import axios from '../api/axios.customize.js'
import { URL_BACKEND } from '../constants/api.js'

export const getFavouriteCountBlogAPI = async (blogId) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/favorites/blog-count/${blogId}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}