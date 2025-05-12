export const URL_BACKEND = import.meta.env.VITE_BACKEND_URL
// User endpoints
export const API_USERS = '/api/v1/users';
export const API_USER_BY_ID = (id) => `/api/v1/users/${id}`;
export const API_USER_BY_USERNAME = (username) => `/api/v1/users/username/${username}`;
export const API_USER_BY_EMAIL = (email) => `/api/v1/users/email/${email}`;
export const API_USER_UPDATE_BY_ID = (id) => `/api/v1/users/${id}`;
export const API_USER_UPDATE_BY_EMAIL = (email) => `/api/v1/users/email/${email}`;
export const API_USER_AVATAR = '/api/v1/users/avatar';
export const API_USER_STATUS = (id, status) => `/api/v1/users/${id}/status?status=${status}`;
export const API_USER_DELETE = (id) => `/api/v1/users/${id}`;

// Auth endpoints
export const API_LOGIN = '/api/v1/auth/login';
export const API_REGISTER = '/api/v1/auth/register';
export const API_LOGOUT = '/api/v1/auth/logout';
export const API_AUTH_REFRESH = '/api/v1/auth/refresh';
export const API_AUTH_ACCOUNT = '/api/v1/auth/account';

// Blog endpoints
export const API_BLOGS = '/api/v1/blogs';
export const API_BLOG_BY_ID = (id) => `/api/v1/blogs/${id}`;
export const API_BLOGS_ALL = '/api/v1/blogs/all';
export const API_BLOGS_SEARCH = '/api/v1/blogs/search';
export const API_BLOGS_FILTER = '/api/v1/blogs/filter';

// Blog Character endpoints
export const API_BLOG_CHARACTER = '/api/v1/blog-character';
export const API_BLOG_CHARACTER_ALL = '/api/v1/blog-character/all';
export const API_BLOG_CHARACTER_BY_ID = (id) => `/api/v1/blog-character/${id}`;
export const API_BLOG_CHARACTER_UPDATE = (id) => `/api/v1/blog-character/${id}`;
export const API_BLOG_CHARACTER_DELETE = (id) => `/api/v1/blog-character/${id}`;
export const API_BLOG_CHARACTER_RELATED = (comicId) => `/api/v1/blog-character/related-characters/${comicId}`;
export const API_BLOG_CHARACTER_REVIEW = (id) => `/api/v1/blog-character/review/${id}`;

// Blog Comic endpoints
export const API_BLOG_COMIC = '/api/v1/blog-comic';
export const API_BLOG_COMIC_ALL = '/api/v1/blog-comic/all';
export const API_BLOG_COMIC_BY_ID = (id) => `/api/v1/blog-comic/${id}`;
export const API_BLOG_COMIC_UPDATE = (id) => `/api/v1/blog-comic/${id}`;
export const API_BLOG_COMIC_DELETE = (id) => `/api/v1/blog-comic/${id}`;

// Blog Insight endpoints
export const API_BLOG_INSIGHT = '/api/v1/blog-insight';
export const API_BLOG_INSIGHT_BY_ID = (id) => `/api/v1/blog-insight/${id}`;
export const API_BLOG_INSIGHT_UPDATE = (id) => `/api/v1/blog-insight/${id}`;
export const API_BLOG_INSIGHT_DELETE = (id) => `/api/v1/blog-insight/${id}`;
export const API_BLOG_INSIGHT_ALL = '/api/v1/blog-insight';
export const API_BLOG_INSIGHT_CHARACTER = (characterId) => `/api/v1/blog-insight/character/${characterId}`;

// Comment endpoints
export const API_COMMENTS = '/api/v1/comments';
export const API_COMMENT_BY_ID = (id) => `/api/v1/comments/${id}`;
export const API_COMMENTS_IN_BLOG = (blogId) => `/api/v1/comments/comment-in-blog/${blogId}`;
export const API_CHILD_COMMENTS = (commentId) => `/api/v1/comments/child-comment/${commentId}`;
export const API_COMMENT_CREATE = '/api/v1/comments'; 
export const API_COMMENT_UPDATE = (id) => `/api/v1/comments/${id}`; 
export const API_COMMENT_DELETE = (id) => `/api/v1/comments/${id}`; 

// Category endpoints
export const API_CATEGORIES = '/api/v1/categories';

// Tag endpoints
export const API_TAGS = '/api/v1/tags';
export const API_TAG_CREATE = '/api/v1/tags';
export const API_TAG_UPDATE = (tagId) => `/api/v1/tags/${tagId}`;
export const API_TAG_DELETE = (tagId) => `/api/v1/tags/${tagId}`;

// Favourite endpoints
export const API_FAVOURITES = '/api/v1/favourites';
export const API_FAVOURITE_BY_ID = (id) => `/api/v1/favourites/${id}`;
export const API_FAVOURITES_BY_USER = (userId) => `/api/v1/favourites/user/${userId}`;
export const API_FAVOURITES_BY_BLOG = (blogId) => `/api/v1/favourites/blog/${blogId}`;
export const API_FAVOURITE_BY_USER_AND_BLOG = (userId, blogId) => `/api/v1/favourites/user/${userId}/blog/${blogId}`;
export const API_FAVOURITE_CREATE = '/api/v1/favourites';
export const API_FAVOURITE_DELETE = (id) => `/api/v1/favourites/${id}`;

// Follow endpoints
export const API_FOLLOWS = '/api/v1/follows';
export const API_FOLLOW_CREATE = '/api/v1/follows';
export const API_FOLLOW_GET_ALL = '/api/v1/follows';
export const API_FOLLOW_DELETE = '/api/v1/follows';

// Notification endpoints
export const API_NOTIFICATIONS = '/api/v1/notifications';
export const API_NOTIFICATION_BY_ID = (id) => `/api/v1/notifications/${id}`;
export const API_NOTIFICATIONS_BY_USER = (userId) => `/api/v1/notifications/user/${userId}`;
export const API_NOTIFICATIONS_UNREAD_BY_USER = (userId) => `/api/v1/notifications/user/${userId}/unread`;
export const API_NOTIFICATION_MARK_READ = (id) => `/api/v1/notifications/${id}/read`;
export const API_NOTIFICATION_DELETE = (id) => `/api/v1/notifications/${id}`;

// Upload endpoints
export const API_UPLOAD_IMAGE = '/api/v1/upload/image';
export const API_UPLOAD_FILE = '/api/v1/upload/file';
export const API_UPLOAD = '/api/v1/upload';
export const API_UPLOAD_PREVIEW = '/api/v1/upload/preview';

// OTP endpoints
export const API_OTP_SEND = '/api/v1/otp/send';
export const API_OTP_VERIFY = '/api/v1/otp/verify';
export const API_OTP_GENERATE = (userId) => `/api/v1/otp?userId=${userId}`;
export const API_OTP_VERIFY_POST = '/api/v1/otp';
export const API_OTP_FORGOT_PASSWORD = (email) => `/api/v1/otp/forgot-password?email=${email}`;

// Reaction endpoints
export const API_REACTIONS = '/api/v1/reactions';
export const API_REACTION_CREATE = '/api/v1/reactions';
export const API_REACTION_GET_ALL = (type) => `/api/v1/reactions?type=${type}`;
export const API_REACTION_UPDATE = (type, id, reaction) => `/api/v1/reactions?type=${type}&id=${id}&reaction=${reaction}`;
export const API_REACTION_DELETE = (type, id) => `/api/v1/reactions?type=${type}&id=${id}`;

// Report endpoints
export const API_REPORTS = '/api/v1/reports';
export const API_REPORT_BY_ID = (id) => `/api/v1/reports/${id}`;
export const API_REPORT_CREATE = '/api/v1/reports';
export const API_REPORT_GET_ALL = (type) => `/api/v1/reports?type=${type}`;
export const API_REPORT_GET_UNHANDLED = (type) => `/api/v1/reports/unhandled?type=${type}`;
export const API_REPORT_DELETE = (type, id) => `/api/v1/reports?type=${type}&id=${id}`;

// Dashboard endpoints
export const API_DASHBOARD = '/api/v1/dashboard';

// Review endpoints
export const API_REVIEWS = '/api/v1/reviews';
export const API_REVIEW_BY_ID = (id) => `/api/v1/reviews/${id}`;

// Search endpoints
export const API_SEARCH = '/api/v1/search';
