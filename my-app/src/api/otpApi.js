import axios from './axios.customize.js'
import { URL_BACKEND } from './userApi.js'

export const sentOTP = (otp, userId) => {
  return axios.post(URL_BACKEND + `/api/v1/otp`, {
    otp: otp,
    userId: userId
  })
}

export const resendOTP = (userId) => {
  return axios.get(URL_BACKEND + `/api/v1/otp?userId=${userId}`)
}
