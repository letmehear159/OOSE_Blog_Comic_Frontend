import { login } from '../api/authApi.js'
import {
  getBlogByIdAPI,
  saveBlogCharacterAPI,
  saveImageCharacterBlogAPI,
  savePreviewImageCharacterBlogAPI
} from '../api/blogApi.js'

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

export const saveBlogCharacterService = async (blogCharacterRequest, thumbnail) => {
  try {
    const formData = new FormData()
    const jsonBlob = new Blob(
      [JSON.stringify(blogCharacterRequest)],
      { type: 'application/json' }
    )
    formData.append('blogCharacterRequest', jsonBlob)
    formData.append('thumbnail', thumbnail)
    const response = await saveBlogCharacterAPI(formData)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const getBlogByIdService = async (id) => {
  try {
    const response = await getBlogByIdAPI(id)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response.data.data
  } catch (error) {
    throw error
  }
}


