import { useState, useEffect } from 'react';
import { Typography, Card, Divider, Tabs, Empty, Spin } from 'antd';
import { CommentProvider } from '../context/CommentContext';
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
      role: 'user',
      content: 'Đây là một bộ manga rất hay, tôi đã theo dõi từ những chương đầu tiên!',
      createdAt: '2023-06-16T08:30:00Z',
      children: [
        {
          id: '201',
          parentId: '101',
          blogId: '1',
          user: 'Trần Thị Y',
          role: 'blogger',
          content: 'Đồng ý! Cách xây dựng thế giới và nhân vật rất tuyệt vời.',
          createdAt: '2023-06-16T09:15:00Z',
          children: [
            {
              id: '301',
              parentId: '201',
              blogId: '1',
              user: 'Admin',
              role: 'admin',
              content: 'Cảm ơn các bạn đã chia sẻ ý kiến! Hãy giữ bình luận văn minh nhé.',
              createdAt: '2023-06-16T09:30:00Z',
              children: []
            },
            {
              id: '302',
              parentId: '201',
              blogId: '1',
              user: 'Mai Lan',
              role: 'user',
              content: 'Mình cũng rất thích arc Wano, cực kỳ hấp dẫn!',
              createdAt: '2023-06-16T09:35:00Z',
              children: []
            },
            {
              id: '303',
              parentId: '201',
              blogId: '1',
              user: 'Blogger A',
              role: 'blogger',
              content: 'Theo mình, arc Marineford cũng rất đỉnh!',
              createdAt: '2023-06-16T09:40:00Z',
              children: []
            },
            {
              id: '304',
              parentId: '201',
              blogId: '1',
              user: 'Admin',
              role: 'admin',
              content: 'Nhắc nhở: Không spoil nội dung truyện quá nhiều nhé các bạn!',
              createdAt: '2023-06-16T09:45:00Z',
              children: []
            }
          ]
        },
        {
          id: '202',
          parentId: '101',
          blogId: '1',
          user: 'Blogger A',
          role: 'blogger',
          content: 'Mình nghĩ arc Dressrosa cũng rất đáng nhớ.',
          createdAt: '2023-06-16T09:20:00Z',
          children: []
        },
        {
          id: '203',
          parentId: '101',
          blogId: '1',
          user: 'Admin',
          role: 'admin',
          content: 'Các bạn hãy bình luận văn minh, tôn trọng ý kiến của nhau nhé!',
          createdAt: '2023-06-16T09:25:00Z',
          children: []
        }
      ]
    },
    {
      id: '102',
      blogId: '1',
      user: 'Lê Văn Z',
      role: 'user',
      content: 'Oda sensei thật sự là một thiên tài! Mỗi chi tiết trong truyện đều có ý nghĩa.',
      createdAt: '2023-06-17T10:20:00Z',
      children: []
    },
    {
      id: '104',
      blogId: '1',
      user: 'Mai Lan',
      role: 'user',
      content: 'Tôi thích cách tác giả xây dựng các arc rất logic.',
      createdAt: '2023-06-18T12:00:00Z',
      children: []
    },
    {
      id: '105',
      blogId: '1',
      user: 'Blogger A',
      role: 'blogger',
      content: 'Cảm ơn mọi người đã ủng hộ bài viết!',
      createdAt: '2023-06-18T13:00:00Z',
      children: []
    },
    {
      id: '106',
      blogId: '1',
      user: 'Admin',
      role: 'admin',
      content: 'Mọi người hãy bình luận lịch sự nhé!',
      createdAt: '2023-06-18T14:00:00Z',
      children: []
    }
  ],
  '2': [
    {
      id: '103',
      blogId: '2',
      user: 'Phạm Thị K',
      role: 'user',
      content: 'Doraemon là một phần tuổi thơ của tôi, những bảo bối thú vị và ý nghĩa.',
      createdAt: '2023-07-21T14:05:00Z',
      children: []
    }
  ]
};

function CommentPage() {
  const [selectedBlog, setSelectedBlog] = useState(mockBlogs[0]);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState('user'); // Thêm state chọn vai trò

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

      {/* Chọn vai trò người dùng để test */}
      <div className="mb-4">
        <span className="mr-2 font-medium">Chọn vai trò:</span>
        <select
          value={userRole}
          onChange={e => setUserRole(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="user">Người dùng</option>
          <option value="blogger">Blogger</option>
          <option value="admin">Admin</option>
        </select>
        <span className="ml-4 text-gray-500">(Bình luận sẽ hiển thị đúng vai trò bạn chọn)</span>
      </div>

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
                      currentUserRole={userRole}
                    />
                  </Card>
                  {mockComments[blog.id] ? (
                    <CommentList 
                      comments={mockComments[blog.id]} 
                      blogId={blog.id} 
                      currentUserRole={userRole}
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