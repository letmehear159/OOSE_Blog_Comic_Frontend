import { useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';

function UserForm({ initialData, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const newErrors = {};
    
    if (!data.fullName) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    }
    
    if (!data.email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!data.username) {
      newErrors.username = 'Vui lòng nhập tên người dùng';
    }
    
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async () => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        
        // Chuẩn bị dữ liệu theo định dạng UserUpdateReq của backend
        const userUpdateReq = {
          fullName: formData.fullName,
          email: formData.email,
          username: formData.username
        };
        
        await onSubmit(userUpdateReq);
        message.success('Cập nhật thông tin thành công');
      } catch (error) {
        // message.error('Có lỗi xảy ra khi cập nhật thông tin');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card 
        title="Cập nhật thông tin" 
        className="shadow-sm rounded-lg"
        bodyStyle={{ padding: '24px' }}
      >
        <Form layout="vertical" onFinish={handleFormSubmit} className="p-2">
          <Form.Item
            label="Tên hiển thị"
            validateStatus={errors.fullName ? 'error' : ''}
            help={errors.fullName}
          >
            <Input 
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="rounded"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email}
          >
            <Input 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="rounded"
            />
          </Form.Item>

          <Form.Item
            label="Tên người dùng"
            validateStatus={errors.username ? 'error' : ''}
            help={errors.username}
          >
            <Input 
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="rounded"
            />
          </Form.Item>

          <Form.Item className="flex justify-center mt-6">
            <Button 
              type="primary" 
              onClick={handleFormSubmit} 
              loading={loading}
              className="px-8 h-10"
            >
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default UserForm;