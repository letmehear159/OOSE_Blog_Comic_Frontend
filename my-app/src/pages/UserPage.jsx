import React, { useState, useEffect } from "react";
import { Tabs, message } from "antd";
import { useParams, useLocation } from "react-router-dom";
import UserDisplay from "../components/User/UserDisplay";
import UserForm from "../components/User/UserForm";
import AvatarUpload from "../components/User/AvatarUpload";
import { jwtDecode } from "jwt-decode"; 

import { 
  fetchUserById, 
  fetchUserByEmail, 
  fetchUserByUsername, 
  updateUser, 
  updateUserAvatarService,
  fetchAccountAPI  
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
  const { id: paramId, username: paramUsername, email: paramEmail } = useParams();
  const location = useLocation();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        let response;

        const accessToken = localStorage.getItem('access_token');
        
        if (paramId) {
          response = await fetchUserById(paramId);
        } else if (paramUsername) {
          response = await fetchUserByUsername(paramUsername);
        } else if (paramEmail) {
          response = await fetchUserByEmail(paramEmail);
        } else if (accessToken) {
          try {
            response = await fetchAccountAPI();
          } catch (e) {
            try {
              const decoded = jwtDecode(accessToken);
              
              const username = decoded?.user?.username || decoded?.sub || decoded?.username || decoded?.preferred_username;
              
              if (!username) {
                throw new Error('Không tìm thấy username trong JWT token');
              }
              
              try {
                response = await fetchUserByUsername(username);
                
                if (!response) {
                  throw new Error("Không nhận được phản hồi từ API");
                }
                
                if (response.status === 404 || 
                    (response.data && 
                     (response.data.status === 'error' || 
                      response.data.message === 'User Not found' || 
                      response.data.data === 'User Not found'))) {
                  message.error(`Không tìm thấy thông tin cho người dùng ${username}`);
                  throw new Error('Người dùng không tồn tại trong hệ thống');
                }
              } catch (usernameError) {
                console.error("Lỗi khi tìm user bằng username:", usernameError);
                message.error("Không thể tìm thấy thông tin tài khoản");
                setLoading(false);
                return;
              }
            } catch (tokenError) {
              console.error('Lỗi khi xử lý token:', tokenError);
              message.error('Không thể xác minh thông tin người dùng từ token');
              setLoading(false);
              return;
            }
          }
        } else {
          message.error('Không tìm thấy thông tin người dùng, vui lòng đăng nhập');
          setLoading(false);
          return;
        }        
        const user = response.data || response;
        setUserData({
          id: user.id,
          fullName: user.fullName|| user.displayName || '',
          email: user.email || '',
          phoneNumber: user.phoneNumber || '',
          username: user.username || '',
          role: user.role || 'user',
          avatar: user.avatar || null
        });
      } catch (error) {
        if (
          error?.response?.data?.message === 'Handle All exception' &&
          (error?.response?.data?.data === 'User Not found' || error?.response?.data?.message === 'User Not found')
        ) {
          message.error('Không tìm thấy người dùng này trong hệ thống!');
        } else {
          message.error('Không thể tải thông tin người dùng');
        }
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [paramId, paramUsername, paramEmail, location.pathname]);
  const handleUserUpdate = async (updatedData) => {
    try {
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
      if (updatedUserData.username && updatedUserData.username !== userData.username) {
        window.history.replaceState(null, '', `/users/${updatedUserData.username}`);
      }
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