import axios from '../api/axios.customize.js'
import { URL_BACKEND } from '../constants/api.js'

export const getNotificationByUserIdAPI = async ({ userId }) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/notifications/user/${userId}`)
    return response
  } catch (error) {
    throw error
  }
}