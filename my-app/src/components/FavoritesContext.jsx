import { createContext, useState, useContext } from 'react';
import { mockApi } from '../api/mockApi'; // Giả lập API để lấy dữ liệu blog

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(["1", "2", "3"]); // hardcode một số id blog yêu thích để test

  const toggleFavorite = (blogId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(blogId)) {
        return prevFavorites.filter(id => id !== blogId);
      } else {
        return [...prevFavorites, blogId];
      }
    });
  };

  // Lấy chi tiết blog từ mockApi
  const getBlogDetails = async (blogId) => {
    try {
      return await mockApi.getBlogById(blogId);
    } catch (error) {
      console.error('Error fetching blog details:', error);
      return null;
    }
  };

  const value = {
    favorites,
    toggleFavorite,
    getBlogDetails
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}