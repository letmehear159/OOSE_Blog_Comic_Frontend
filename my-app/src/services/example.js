// Business Logic Layer: xử lý logic giữa UI và API
import { getUsers, getUserById } from "../api/userApi";

// Lấy tất cả users
export const fetchAllUsers = async () => {
  try {
    const response = await getUsers();
    // Có thể xử lý format data ở đây nếu muốn
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Lấy thông tin user theo ID
export const fetchUserById = async (id) => {
  try {
    const response = await getUserById(id);
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};
