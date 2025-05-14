import axios from '../api/axios.customize.js'
import { URL_BACKEND } from '../constants/api.js'

export const followBloggerAPI = async ({ userId, bloggerId }) => {
  try {
    const response = await axios.post(URL_BACKEND + '/api/v1/follows', {
      userId: userId,
      bloggerId: bloggerId,

    })
    return response
  } catch (error) {
    throw error
  }
}

export const findFollowAPI = async ({ userId, bloggerId }) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/follows/find?userId=${userId}&bloggerId=${bloggerId}`)
    return response
  } catch (error) {
    throw error
  }
}

export const unfollowBloggerAPI = async ({ userId, bloggerId }) => {
  try {
    const response = await axios.delete(URL_BACKEND + `/api/v1/follows?userId=${userId}&bloggerId=${bloggerId}`)
    return response
  } catch (error) {
    throw error
  }
}
