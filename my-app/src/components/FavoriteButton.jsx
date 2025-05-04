import { BookOutlined, BookFilled } from '@ant-design/icons';
import { useFavorites } from './FavoritesContext';

function FavoriteButton({ blogId }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorited = favorites.includes(blogId);

  return (
    <button
      onClick={() => toggleFavorite(blogId)}
      className={`
        w-12 h-12 rounded-full flex items-center justify-center
        border transition-all duration-200 ease-in-out
        ${isFavorited
          ? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700'
          : 'bg-white border-gray-300 text-gray-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white'
        }
        hover:scale-105 hover:shadow-sm
        focus:outline-none
      `}
      aria-label={isFavorited ? "Bỏ yêu thích" : "Yêu thích"}
    >
      {isFavorited ? (
        <BookFilled style={{ fontSize: 28 }} />
      ) : (
        <BookOutlined style={{ fontSize: 28 }} />
      )}
    </button>
  );
}

export default FavoriteButton;