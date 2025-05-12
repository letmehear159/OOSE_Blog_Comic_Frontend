import React, { useState, useEffect } from "react";
import { Tabs, message } from "antd";
import { useParams, useLocation } from "react-router-dom";
import UserDisplay from "../components/User/UserDisplay";
import UserForm from "../components/User/UserForm";
import AvatarUpload from "../components/User/AvatarUpload";

import { 
  fetchUserById, 
  fetchUserByEmail, 
  fetchUserByUsername, 
  updateUser, 
  updateUserAvatarService 
} from "../services/userService";

const { TabPane } = Tabs;

const UserPage = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    username: '',
    role: '',
    avatar: null
  });
  const [loading, setLoading] = useState(true);
  
  // Get URL parameters
  const { id, username, email } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        let response;

        console.log("Fetching user data with params:", { id, username, email });

        // Determine which API to call based on URL parameters
        if (id) {
          // If ID is provided in URL, fetch by ID
          console.log("Fetching user by ID:", id);
          response = await fetchUserById(id);
        } else if (username) {
          // If username is provided in URL, fetch by username
          console.log("Fetching user by username:", username);
          response = await fetchUserByUsername(username);
        } else if (email) {
          // If email is provided in URL, fetch by email
          console.log("Fetching user by email:", email);
          response = await fetchUserByEmail(email);
        } else {
          // Default: use logged-in user's email from localStorage
          const userEmail = localStorage.getItem('user_email') || 'example@email.com';
          console.log("Fetching user by email from localStorage:", userEmail);
          response = await fetchUserByEmail(userEmail);
        }

        console.log("API Response:", response);

        // Handle different API response structures
        const userData = response.data || response;

        // Update state with fetched data
        setUserData({
          id: userData.id, // Make sure to store the ID for updates
          fullName: userData.fullName || '',
          email: userData.email || '',
          phoneNumber: userData.phoneNumber || '',
          username: userData.username || '',
          role: userData.role || 'user',
          avatar: userData.avatar || null
        });

        console.log("User data set:", userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        message.error("Không thể tải thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, username, email, location.pathname]);

  const handleUserUpdate = async (updatedData) => {
    try {
      // Chuyển đổi dữ liệu sang định dạng UserUpdateReq của backend
      const userUpdateReq = {
        fullName: updatedData.fullName,
        email: updatedData.email,
        phoneNumber: updatedData.phoneNumber,
        username: updatedData.username
      };
      
      console.log("Updating user with data:", userUpdateReq);
      const response = await updateUser(userData.id, userUpdateReq);
      
      // Handle different API response structures
      const updatedUserData = response.data || response;
      
      setUserData(prev => ({ ...prev, ...updatedUserData }));
      message.success("Cập nhật thông tin thành công");
      return Promise.resolve();
    } catch (error) {
      console.error("Error updating user:", error);
      message.error("Cập nhật thông tin thất bại");
      return Promise.reject(error);
    }
  };

  const handleAvatarUpload = async (file) => {
    try {
      console.log("Uploading avatar for user ID:", userData.id);
      const response = await updateUserAvatarService(userData.id, file);
      
      // Handle different API response structures
      const avatarUrl = response.data?.avatar || response.avatar;
      
      setUserData(prev => ({ ...prev, avatar: avatarUrl }));
      message.success("Cập nhật ảnh đại diện thành công");
      return Promise.resolve(avatarUrl);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      message.error("Cập nhật ảnh đại diện thất bại");
      return Promise.reject(error);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Đang tải thông tin...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Thông tin người dùng</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Thông tin tài khoản" key="1">
          <div className="bg-white rounded-lg shadow p-6 mb-6 flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3 flex justify-center">
              <AvatarUpload initialAvatar={userData.avatar} onUpload={handleAvatarUpload} />
            </div>
            <div className="md:w-2/3">
              <UserDisplay userData={userData} />
            </div>
          </div>
        </TabPane>
        <TabPane tab="Chỉnh sửa tài khoản" key="2">
          <div className="bg-white rounded-lg shadow p-6 mb-6 flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3 flex justify-center">
              <AvatarUpload initialAvatar={userData.avatar} onUpload={handleAvatarUpload} />
            </div>
            <div className="md:w-2/3">
              <UserForm initialData={userData} onSubmit={handleUserUpdate} />
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserPage;
