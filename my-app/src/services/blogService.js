import { login } from '../api/authApi.js'
import {
  getBlogByIdAPI,
  saveBlogCharacterAPI,
  saveImageCharacterBlogAPI,
  savePreviewImageCharacterBlogAPI
} from '../api/blogApi.js'
import axios from '../api/axios.customize.js'
import { URL_BACKEND } from '../api/userApi.js'

export const saveImageCharacterBlogService = async (formData) => {
  try {
    const response = await saveImageCharacterBlogAPI(formData)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const savePreviewImageCharacterBlogService = async (formData) => {
  try {
    const response = await savePreviewImageCharacterBlogAPI(formData)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
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
    return response
  } catch (error) {
    throw error
  }
}

export const getBlogByIdService = async (id) => {
  try {
    const response = await getBlogByIdAPI(id)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getBlogComicById = async (id) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-comic/${id}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getListRelatedCharacter = async (comicId) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-character/related-characters/${comicId}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getBlogInsightsOfThisCharacter = async (blogCharacterId) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-insight/character/${blogCharacterId}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}



