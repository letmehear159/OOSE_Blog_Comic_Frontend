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

export const saveBlogCharacterServiceAPI = async (blogCharacterRequest, thumbnail) => {
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

export const getBlogCharacterByIdServiceAPI = async (id) => {
  try {
    const response = await getBlogByIdAPI(id)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getBlogComicByIdAPI = async (id) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-comic/${id}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getListRelatedCharacterAPI = async (comicId) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-character/related-characters/${comicId}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getBlogInsightsOfThisCharacterAPI = async (blogCharacterId) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-insight/character/${blogCharacterId}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getAllBlogComicsAPI = async () => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-comic`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const updateBlogCharacterAPI = async (blogCharacterRequest, thumbnail, id) => {
  try {
    const formData = new FormData()
    const jsonBlob = new Blob(
      [JSON.stringify(blogCharacterRequest)],
      { type: 'application/json' }
    )
    formData.append('blogCharacterRequest', jsonBlob)
    if (thumbnail !== null) {
      formData.append('thumbnail', thumbnail)
    }
    const response = await axios.put(URL_BACKEND + `/api/v1/blog-character/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}





