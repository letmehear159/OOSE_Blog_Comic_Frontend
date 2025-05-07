import axios from './axios.customize.js'
import { URL_BACKEND } from './userApi.js'

export const sentOTPAPI = (otp, userId, email) => {
  return axios.post(URL_BACKEND + `/api/v1/otp`, {
    otp: otp,
    userId: userId,
    email: email
  })
}

export const resendOTPAPI = (userId) => {
  return axios.get(URL_BACKEND + `/api/v1/otp?userId=${userId}`)
}

export const resendOTPForgotPasswordAPI = (email) => {
  return axios.get(URL_BACKEND + `/api/v1/otp/forgot-password?email=${email}`)
}
