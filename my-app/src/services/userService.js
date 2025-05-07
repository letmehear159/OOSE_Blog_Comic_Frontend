import { 
  getUsers, 
  getUserById, 
  getUserByUsername, 
  getUserByEmail,
  updateUserById,
  updateUserByEmail,
  updateUserAvatar,
  updateUserStatus,
  deleteUser
} from "../api/userApi";

// Lấy tất cả users
export const fetchAllUsers = async () => {
  try {
    const response = await getUsers();
    console.log("fetchAllUsers response:", response);
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
    console.log(`fetchUserById(${id}) response:`, response);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

// Lấy thông tin user theo username
export const fetchUserByUsername = async (username) => {
  try {
    const response = await getUserByUsername(username);
    console.log(`fetchUserByUsername(${username}) response:`, response);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with username ${username}:`, error);
    throw error;
  }
};

// Lấy thông tin user theo email
export const fetchUserByEmail = async (email) => {
  try {
    const response = await getUserByEmail(email);
    console.log(`fetchUserByEmail(${email}) response:`, response);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error);
    throw error;
  }
};

// Cập nhật thông tin user theo ID
export const updateUser = async (id, userData) => {
  try {
    const response = await updateUserById(id, userData);
    console.log(`updateUser(${id}) response:`, response);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

// Cập nhật thông tin user theo email
export const updateUserByEmailService = async (email, userData) => {
  try {
    const response = await updateUserByEmail(email, userData);
    console.log(`updateUserByEmailService(${email}) response:`, response);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with email ${email}:`, error);
    throw error;
  }
};

// Cập nhật avatar của user
export const updateUserAvatarService = async (userId, avatarFile) => {
  try {
    const response = await updateUserAvatar(userId, avatarFile);
    console.log(`updateUserAvatarService(${userId}) response:`, response);
    return response.data;
  } catch (error) {
    console.error(`Error updating avatar for user with ID ${userId}:`, error);
    throw error;
  }
};

// Cập nhật trạng thái của user
export const updateUserStatusService = async (id, status) => {
  try {
    const response = await updateUserStatus(id, status);
    console.log(`updateUserStatusService(${id}, ${status}) response:`, response);
    return response.data;
  } catch (error) {
    console.error(`Error updating status for user with ID ${id}:`, error);
    throw error;
  }
};

// Xóa user
export const deleteUserService = async (id) => {
  try {
    const response = await deleteUser(id);
    console.log(`deleteUserService(${id}) response:`, response);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};
