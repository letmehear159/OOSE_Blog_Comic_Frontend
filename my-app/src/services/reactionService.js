import axios from '../api/axios.customize.js'
import { URL_BACKEND } from '../constants/api.js'

export const saveReactionToABlogAPI = async ({ userId, blogId, reaction, type }) => {
  try {
    const response = await axios.post(URL_BACKEND + '/api/v1/reactions', {
      authorId: userId,
      reaction: reaction,
      blogId: blogId,
      type: type
    })
    return response
  } catch (error) {
    throw error
  }
}
