import { Card, Descriptions, Tag } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

function ProfileDisplay({ userData }) {
  const { fullName, email, phoneNumber, username, role, level } = userData;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
      <Card 
        title="Thông tin cá nhân" 
        className="shadow-sm rounded-lg"
        bodyStyle={{ padding: '24px' }}
      >
        <Descriptions column={1} className="bg-white p-4 rounded-md">
          <Descriptions.Item label="Họ tên" labelStyle={{ fontWeight: 'bold' }}>
            <div className="flex items-center">
              <UserOutlined className="mr-3 text-blue-500" />
              <span className="text-gray-800">{fullName}</span>
            </div>
          </Descriptions.Item>
          
          <Descriptions.Item label="Email" labelStyle={{ fontWeight: 'bold' }}>
            <div className="flex items-center">
              <MailOutlined className="mr-3 text-blue-500" />
              <span className="text-gray-800">{email}</span>
            </div>
          </Descriptions.Item>
          
          <Descriptions.Item label="Số điện thoại" labelStyle={{ fontWeight: 'bold' }}>
            <div className="flex items-center">
              <PhoneOutlined className="mr-3 text-blue-500" />
              <span className="text-gray-800">{phoneNumber || 'Chưa cập nhật'}</span>
            </div>
          </Descriptions.Item>
          
          <Descriptions.Item label="Tên người dùng" labelStyle={{ fontWeight: 'bold' }}>
            <span className="text-gray-800">{username}</span>
          </Descriptions.Item>
          
          <Descriptions.Item label="Vai trò" labelStyle={{ fontWeight: 'bold' }}>
            <Tag color={role === 'admin' ? 'red' : role === 'blogger' ? 'blue' : 'green'} className="px-3 py-1">
              {role === 'admin' ? 'Quản trị viên' : role === 'blogger' ? 'Blogger' : 'Người dùng'}
            </Tag>
          </Descriptions.Item>
          
          <Descriptions.Item label="Cấp độ" labelStyle={{ fontWeight: 'bold' }}>
            <Tag color="gold" className="px-3 py-1">Cấp {level}</Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}

export default ProfileDisplay;