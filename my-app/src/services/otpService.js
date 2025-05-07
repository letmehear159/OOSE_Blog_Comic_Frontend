import { register } from '../api/authApi.js'
import { resendOTPAPI, resendOTPForgotPasswordAPI, sentOTPAPI } from '../api/otpApi.js'

export const sentOTPService = async (otp, userId, email) => {
  try {
    const response = await sentOTPAPI(otp, userId, email)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response.data
  } catch (error) {
    throw error
  }
}

export const resentOTPService = async (userId) => {
  try {
    const response = await resendOTPAPI(userId)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response.data
  } catch (error) {
    throw error
  }
}

export const resentOTPForgotPasswordService = async (email) => {
  try {
    const response = await resendOTPForgotPasswordAPI(email)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response.data.data
  } catch (error) {
    throw error
  }
}