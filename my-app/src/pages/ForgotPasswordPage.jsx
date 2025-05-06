import { useState } from 'react'
import { Button, Card, Form, Input, Typography, message } from 'antd'
import { LockOutlined, MailOutlined, NumberOutlined } from '@ant-design/icons'

// Mới code UI, chưa có logic kiểm tra email, OTP, và update mật khẩu trong database

const { Title, Text } = Typography

const ForgotPasswordPage = () => {
  const [form] = Form.useForm()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')

  // -----Chưa có logic kiểm tra email-----
  const handleEmailSubmit = (values) => {
    console.log('Gửi mã OTP tới email:', values.email)
    // TODO: gọi API gửi OTP
    setStep(2)
    message.success('Đã gửi mã OTP tới email của bạn!')
  }
  // -----Chưa có logic kiểm tra email-----

  // -----Chưa có logic kiểm tra OTP-----
  const handleOTPSubmit = (values) => {
    console.log('Xác minh OTP:', values.otp)
    // TODO: xác minh OTP
    setStep(3)
    message.success('Mã OTP chính xác!')
  }
  // -----Chưa có logic kiểm tra OTP-----

  // -----Chưa có logic kiểm tra đặt lại mật khẩu-----
  const handleResetPassword = (values) => {
    console.log('Đặt lại mật khẩu:', values)
    // TODO: gọi API lưu mật khẩu mới
    message.success('Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.')
    setStep(1)
    form.resetFields()
  }
  // -----Chưa có logic kiểm tra đặt lại mật khẩu-----

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      form.resetFields()
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Title level={3} className="text-center mb-4">Quên mật khẩu</Title>
            <Text type="secondary" className="block text-center mb-6">
              Nhập email của bạn để nhận mã OTP
            </Text>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Nhập email" size="large" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full" size="large">
                Gửi mã OTP
              </Button>
            </Form.Item>
          </>
        )

      case 2:
        return (
          <>
            <Title level={3} className="text-center mb-4">Xác minh OTP</Title>
            <Text type="secondary" className="block text-center mb-6">
              Nhập mã OTP đã được gửi đến email của bạn
            </Text>
            <Form.Item
              name="otp"
              label="Mã OTP"
              rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}
            >
              <Input prefix={<NumberOutlined />} placeholder="Nhập mã OTP" size="large" />
            </Form.Item>
            <Form.Item className="flex justify-between">
              <Button onClick={handleBack}>Quay lại</Button>
              <Button type="primary" htmlType="submit">
                Xác minh
              </Button>
            </Form.Item>
          </>
        )

      case 3:
        return (
          <>
            <Title level={3} className="text-center mb-4">Đặt lại mật khẩu</Title>
            <Text type="secondary" className="block text-center mb-6">
              Nhập mật khẩu mới cho tài khoản của bạn
            </Text>
            <Form.Item
              name="newPassword"
              label="Mật khẩu mới"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mật khẩu mới"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Nhập lại mật khẩu"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp!'))
                  }
                })
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập lại mật khẩu"
                size="large"
              />
            </Form.Item>
            <Form.Item className="flex justify-between">
              <Button onClick={handleBack}>Quay lại</Button>
              <Button type="primary" htmlType="submit">
                Đặt lại mật khẩu
              </Button>
            </Form.Item>
          </>
        )

      default:
        return null
    }
  }

  const handleSubmit = (values) => {
    if (step === 1) return handleEmailSubmit(values)
    if (step === 2) return handleOTPSubmit(values)
    if (step === 3) return handleResetPassword(values)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-md">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {renderStep()}
        </Form>
      </Card>
    </div>
  )
}

export default ForgotPasswordPage
