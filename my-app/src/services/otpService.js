import { register } from '../api/authApi.js'
import { resendOTP, sentOTP } from '../api/otpApi.js'

export const sentOTPApi = async (otp, userId) => {
  try {
    const response = await sentOTP(otp, userId)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response.data
  } catch (error) {
    throw error
  }
}

export const resentOTPApi = async (userId) => {
  try {
    const response = await resendOTP( userId)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response.data
  } catch (error) {
    throw error
  }
}