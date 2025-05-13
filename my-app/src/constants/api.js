export const URL_BACKEND = import.meta.env.VITE_BACKEND_URL

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  NEW_CHARACTER: '/new-character',
  EDIT_CHARACTER: '/edit-character/:id',
  VIEW_CHARACTER: '/character/:id',
  VIEW_COMIC: '/comic/:id',
  NEW_COMIC: '/new-comic',
  EDIT_COMIC: '/edit-comic/:id',
  SEARCH: '/search',
  DASHBOARD: '/dashboard',
  FORGOT_PASSWORD: '/forgot-password',
  USERS: '/users',
  USER_BY_USERNAME: '/users/:username', 
  COMMENT: '/comment',
  REPORT: '/report',
  FAVOURITE: '/favourite',
  COMMENT_ADMIN: '/comment-admin',
  REVIEW_COMIC: '/review-comic',
  REVIEW_CHARACTER: '/review-character',
  VIEW_BLOG: '/view-blog',
  CALLBACK: '/callback',


  getEditCharacter: (id) => `/edit-character/${id}`,
  getViewCharacter: (id) => `/character/${id}`,
  getViewComic: (id) => `/comic/${id}`,
  getEditComic: (id) => `/edit-comic/${id}`,
};