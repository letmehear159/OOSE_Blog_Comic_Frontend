import { useState } from 'react';
import { Card, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import ProfileForm from '../components/profile/ProfileForm';
import AvatarUpload from '../components/profile/AvatarUpload';
import ProfileDisplay from '../components/profile/ProfileDisplay';
import { updateProfile, uploadAvatar } from '../api/user';

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('view');
  const [userData, setUserData] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'example@email.com',
    phoneNumber: '0123456789',
    username: 'nguyenvana',
    role: 'user',
    level: 1,
    avatar: null
  });

  const handleProfileUpdate = async (data) => {
    try {
      await updateProfile(data);
      setUserData(prev => ({ ...prev, ...data }));
    } catch (error) {
      throw error;
    }
  };

  const handleAvatarUpload = async (file) => {
    try {
      const avatarUrl = await uploadAvatar(file);
      setUserData(prev => ({ ...prev, avatar: avatarUrl }));
    } catch (error) {
      throw error;
    }
  };

  if (activeTab === 'view') {
    return (
      <div className="p-4">
        <div className="max-w-2xl mx-auto">
          <Card
            title={
              <div className="flex justify-between items-center">
                <span>Thông tin cá nhân</span>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => setActiveTab('edit')}
                >
                  Edit Profile
                </Button>
              </div>
            }
            className="shadow-sm rounded-lg"
            bodyStyle={{ padding: '24px' }}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 flex-shrink-0 flex justify-center">
                <AvatarUpload
                  initialAvatar={userData.avatar}
                  onUpload={handleAvatarUpload}
                />
              </div>
              <div className="w-full md:w-2/3">
                <ProfileDisplay userData={userData} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <ProfileForm
            initialData={userData}
            onSubmit={handleProfileUpdate}
          />
          <div className="flex justify-center mt-6">
            <Button onClick={() => setActiveTab('view')} className="px-8 h-10">
              Back
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ProfilePage;