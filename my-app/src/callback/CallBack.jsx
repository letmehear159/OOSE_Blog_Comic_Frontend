import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { message } from 'antd'

const Callback = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Lấy query parameters từ URL
    const query = new URLSearchParams(location.search)
    const token = query.get('token') // JWT từ BackEnd
    const error = query.get('error') // Thông tin lỗi (nếu có)

    if (token) {
      // Lưu JWT vào localStorage (hoặc sessionStorage)
      localStorage.setItem('access_token', token)
      // Chuyển hướng tới trang dashboard
      navigate('/')
    } else if (error) {
      // Xử lý lỗi (ví dụ: redirect về trang login với thông báo lỗi)
      message.error('Đăng nhập thất bại')
      navigate('/login', { state: { error: 'Google login failed' } })
    } else {
      // Trường hợp không có token hoặc lỗi
      navigate('/login', { state: { error: 'Invalid callback' } })
    }
  }, [location, navigate])

  return <div>Loading...</div>
}

export default Callback