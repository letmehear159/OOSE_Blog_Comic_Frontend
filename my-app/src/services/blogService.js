import axios from '../api/axios.customize.js'
import { URL_BACKEND } from '../constants/api.js'

export const saveCharacterThumbnailAPI = async (formData) => {
  try {
    const response = await axios.post(URL_BACKEND + '/api/v1/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const savePreviewThumbnailCharacterAPI = async (formData) => {
  try {
    const response = await axios.post(URL_BACKEND + '/api/v1/upload/preview', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const saveBlogCharacterAPI = async (blogCharacterRequest, thumbnail) => {
  try {
    const formData = new FormData()
    const jsonBlob = new Blob(
      [JSON.stringify(blogCharacterRequest)],
      { type: 'application/json' }
    )
    formData.append('blogCharacterRequest', jsonBlob)
    formData.append('thumbnail', thumbnail)
    const response = await axios.post(URL_BACKEND + '/api/v1/blog-character', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getBlogCharacterAPI = async (id) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-character/${id}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getBlogComicAPI = async (id) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-comic/${id}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getRelatedCharactersAPI = async (comicId) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-character/related-characters/${comicId}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getInsightsCharacterAPI = async (blogCharacterId) => {
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





