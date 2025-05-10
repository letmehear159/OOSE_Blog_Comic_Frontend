import { useState } from 'react';
import { Button, Input } from 'antd';

function CommentBox({ onSubmit, parentId = null, blogId, placeholder = 'Nhập bình luận của bạn...', currentUserRole = 'user' }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!content.trim()) return;
    setLoading(true);
    await onSubmit({ 
      blogId, 
      content, 
      parentId,
      userRole: currentUserRole
    });
    setContent('');
    setLoading(false);
  };

  return (
    <div className="space-y-2">
      <Input.TextArea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder={placeholder}
        rows={3}
      />
      <div className="flex justify-end mt-2 relative">
        <Button
          type="primary"
          onClick={handleSend}
          disabled={!content.trim()}
          loading={loading}
        >
          Gửi bình luận
        </Button>
        {currentUserRole !== 'user' && (
          <span className="absolute left-0 bottom-0 text-xs text-gray-400 ml-1 mb-1">
            Bạn đang bình luận với tư cách {
              currentUserRole === 'admin' ? 'Quản trị viên' : 
              currentUserRole === 'blogger' ? 'Tác giả' : 
              currentUserRole === 'moderator' ? 'Người kiểm duyệt' : currentUserRole
            }
          </span>
        )}
      </div>
    </div>
  );
}

export default CommentBox;