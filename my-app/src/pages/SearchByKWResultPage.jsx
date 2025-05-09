import { Card, Col, Row, Typography, Avatar, Button } from 'antd'
import { HeartFilled } from '@ant-design/icons'

const { Title, Text } = Typography

const SearchResultPage = () => {

  // -----Hardcode data-----
  const blogResults = [
    {
      id: 1,
      title: 'Top 10 bộ manga hot nhất năm 2025',
      date: '30-04-2025',
      blogger: 'Chuột Lê',
    },
    {
      id: 2,
      title: 'Review bộ truyện “Attack on Titan”',
      date: '01-05-2025',
      blogger: 'Chuột Lê',
    },
    {
      id: 3,
      title: 'Review bộ truyện “Chainsaw Man”',
      date: '01-05-2025',
      blogger: 'Lê Chuột',
    },
    {
      id: 4,
      title: 'Review bộ truyện “Killing Bite”',
      date: '03-05-2025',
      blogger: 'Lê Chuột',
    },
    {
      id: 5,
      title: 'Review bộ truyện “Toradora”',
      date: '05-05-2025',
      blogger: 'Lê Chuột',
    },
    {
      id: 6,
      title: 'Review bộ truyện “One Punch Man”',
      date: '06-05-2025',
      blogger: 'Chuột Lê',
    },
  ]

  const bloggerResults = [
    {
      id: 1,
      name: 'Chuột Lê',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: 2,
      name: 'Lê Chuột',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
  ]
  // -----Hardcode data-----

  return (
    <div className="bg-[#000000] min-h-screen text-white px-4 py-6 sm:ml-32">
      <Title level={3} style={{ color: 'white' }}>Kết quả tìm kiếm</Title>

      <Title level={4} style={{ color: 'white' }} className="mt-6 mb-3">Bài viết liên quan</Title>
      <Row gutter={[16, 16]}>
        {blogResults.map(blog => (
          <Col xs={24} sm={12} md={8} key={blog.id}>
            <Card
              title={
                <Title level={5} style={{ color: 'white', margin: 0 }}>
                  {blog.title}
                </Title>
              }
              hoverable
              onClick={() => {
                // TODO: chuyển hướng đến blog cụ thể
              }}
              extra={
                <Button
                  type="text"
                  icon={<HeartFilled style={{ color: 'red' }} />}
                  onClick={(e) => {
                    e.stopPropagation()
                    // TODO: xử lý favorite nếu người dùng đã đăng nhập
                  }}
                />
              }
              style={{ backgroundColor: '#2a1a2f', border: 'none' }}
              className="cursor-pointer"
            >
              <Text style={{ color: 'white' }}>Ngày đăng: {blog.date}</Text><br />
              <Text style={{ color: 'white' }}>Blogger: {blog.blogger}</Text>
            </Card>
          </Col>
        ))}
      </Row><br/>

      <Title level={4} style={{ color: 'white' }} className="mt-10 mb-3">Blogger liên quan</Title>
      <Row gutter={[16, 16]}>
        {bloggerResults.map(blogger => (
          <Col xs={24} sm={12} md={6} key={blogger.id}>
            <Card
              hoverable
              onClick={() => {
                // TODO: chuyển hướng đến trang cá nhân blogger
              }}
              style={{ backgroundColor: '#2a1a2f', border: 'none' }}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Avatar size={48} src={blogger.avatar} />
                <Text style={{ color: 'white', fontSize: 16 }}>{blogger.name}</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default SearchResultPage
