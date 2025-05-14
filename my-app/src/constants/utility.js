import { URL_BACKEND_IMAGES } from './images.js'

export const getBloggerAvatar = (blog) => {
  if (blog.author.loginType === 'LOCAL') {
    return getLocalAvatar(blog.author.avatar)
  } else {
    return blog.author.avatar
  }
}
export const getLocalAvatar = (avatar) => {
  return `${URL_BACKEND_IMAGES}/${avatar}`
}

export const getUserAvatar = (user) => {
  if (user.loginType === 'LOCAL') {
    return getLocalAvatar(user.avatar)
  } else {
    return user.avatar
  }
}