import axios from 'axios'
import { URL_BACKEND } from './userApi.js'

export const saveImageCharacterBlogAPI = (formData) => {

  return axios.post(URL_BACKEND + '/api/v1/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

}

export const savePreviewImageCharacterBlogAPI = (formData) => {
  return axios.post(URL_BACKEND + '/api/v1/upload/preview', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

}