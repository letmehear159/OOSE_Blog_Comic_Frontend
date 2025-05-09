import { useState, useEffect } from 'react';
import { useFavorites } from './FavoritesContext';
import FavouredBlogPost from './FavoredBlogPost';

function FavoritePage() {
  const { favorites, getBlogDetails } = useFavorites();
  const [favoriteBlogs, setFavoriteBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteBlogs = async () => {
      try {
        setLoading(true);
        const blogs = await Promise.all(
          favorites.map(blogId => getBlogDetails(blogId))
        );
        setFavoriteBlogs(blogs.filter(blog => blog !== null));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteBlogs();
  }, [favorites, getBlogDetails]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Có lỗi xảy ra: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="
          text-2xl font-bold text-gray-800
          pb-4 mb-6 border-b border-gray-200
        ">
          Danh sách Blog Yêu thích
        </h1>

        <div className="bg-white rounded-lg shadow-sm">
          {favoriteBlogs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Bạn chưa có blog yêu thích nào
            </div>
          ) : (
            favoriteBlogs.map((blog, index) => (
              <FavouredBlogPost
                key={blog.id}
                title={blog.title}
                excerpt={blog.excerpt}
                isLast={index === favoriteBlogs.length - 1}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoritePage; 