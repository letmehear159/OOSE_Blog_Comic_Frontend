import { login } from '../api/authApi.js'
import { saveImageCharacterBlogAPI, savePreviewImageCharacterBlogAPI } from '../api/blogApi.js'

export const saveImageCharacterBlogService = async (formData) => {
  try {
    const response = await saveImageCharacterBlogAPI(formData)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const savePreviewImageCharacterBlogService = async (formData) => {
  try {
    const response = await savePreviewImageCharacterBlogAPI(formData)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response.data.data
  } catch (error) {
    throw error
  }
}
