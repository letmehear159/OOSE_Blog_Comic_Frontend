import { useState, useEffect } from 'react';
import { Typography, Card, Divider, Tabs, Empty, Spin } from 'antd';
import { CommentProvider } from '../components/Comment/CommentContext';
import CommentBox from '../components/Comment/CommentBox';
import CommentList from '../components/Comment/CommentList';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

// Mock dữ liệu bài viết
const mockBlogs = [
  {
    id: '1',
    title: 'One Piece - Hành trình đến Laugh Tale',
    content: 'One Piece là một series manga và anime nổi tiếng kể về cuộc phiêu lưu của Monkey D. Luffy và băng hải tặc Mũ Rơm trong hành trình tìm kiếm kho báu vĩ đại One Piece và trở thành Vua Hải Tặc.',
    author: 'Nguyễn Văn A',
    createdAt: '2023-06-15'
  },
  {
    id: '2',
    title: 'Doraemon - Những bảo bối thay đổi cuộc sống',
    content: 'Doraemon là một chú mèo máy đến từ tương lai với nhiều bảo bối thần kỳ, giúp đỡ cậu bé Nobita vượt qua những khó khăn trong cuộc sống hàng ngày.',
    author: 'Trần Thị B',
    createdAt: '2023-07-20'
  }
];

// Mock dữ liệu bình luận
const mockComments = {
  '1': [
    {
      id: '101',
      blogId: '1',
      user: 'Nguyễn Văn X',
      content: 'Đây là một bộ manga rất hay, tôi đã theo dõi từ những chương đầu tiên!',
      createdAt: '2023-06-16T08:30:00Z',
      children: [
        {
          id: '201',
          parentId: '101',
          blogId: '1',
          user: 'Trần Thị Y',
          content: 'Đồng ý! Cách xây dựng thế giới và nhân vật rất tuyệt vời.',
          createdAt: '2023-06-16T09:15:00Z'
        }
      ]
    },
    {
      id: '102',
      blogId: '1',
      user: 'Lê Văn Z',
      content: 'Oda sensei thật sự là một thiên tài! Mỗi chi tiết trong truyện đều có ý nghĩa.',
      createdAt: '2023-06-17T10:20:00Z',
      children: []
    }
  ],
  '2': [
    {
      id: '103',
      blogId: '2',
      user: 'Phạm Thị K',
      content: 'Doraemon là một phần tuổi thơ của tôi, những bảo bối thú vị và ý nghĩa.',
      createdAt: '2023-07-21T14:05:00Z',
      children: []
    }
  ]
};

function CommentPage() {
  const [selectedBlog, setSelectedBlog] = useState(mockBlogs[0]);
  const [loading, setLoading] = useState(false);

  // Hàm xử lý khi thêm bình luận mới
  const handleAddComment = async (commentData) => {
    setLoading(true);
    // Giả lập API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Đã thêm bình luận mới:', commentData);
    setLoading(false);
    // Trong ứng dụng thực tế, bạn sẽ gọi API ở đây
  };

  return (
    <div className="p-4">
      <Title level={2}>Hệ thống Bình luận</Title>
      <Paragraph>
        Trang này hiển thị hệ thống bình luận cho các bài viết trên blog. Người dùng có thể bình luận, trả lời, chỉnh sửa và xóa bình luận của họ.
      </Paragraph>

      <Tabs defaultActiveKey="1" onChange={key => setSelectedBlog(mockBlogs.find(blog => blog.id === key))}>
        {mockBlogs.map(blog => (
          <TabPane tab={blog.title} key={blog.id}>
            <Card className="mb-4">
              <Title level={4}>{blog.title}</Title>
              <p className="text-gray-500">Tác giả: {blog.author} • {new Date(blog.createdAt).toLocaleDateString('vi-VN')}</p>
              <Paragraph>{blog.content}</Paragraph>
            </Card>

            <Divider orientation="left">Bình luận</Divider>
            
            <CommentProvider blogId={blog.id}>
              {loading ? (
                <div className="flex justify-center my-4">
                  <Spin />
                </div>
              ) : (
                <>
                  <Card className="mb-4">
                    <CommentBox 
                      blogId={blog.id} 
                      onSubmit={handleAddComment} 
                    />
                  </Card>
                  
                  {mockComments[blog.id] ? (
                    <CommentList 
                      comments={mockComments[blog.id]} 
                      blogId={blog.id} 
                    />
                  ) : (
                    <Empty description="Chưa có bình luận nào" />
                  )}
                </>
              )}
            </CommentProvider>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default CommentPage; 