import axios from './axios.customize.js'
import { URL_BACKEND } from './userApi.js'
export const STATIC_IMAGE_URL="./"
export const login = (username, password) => {
  return axios.post(URL_BACKEND + '/api/v1/auth/login', {
    identifier: username,
    password: password
  })
}

export const register = (username, password, email, displayName) => {
  return axios.post(URL_BACKEND + '/api/v1/auth/register', {
    username: username,
    password: password,
    email: email,
    displayName: displayName,
  })
}

