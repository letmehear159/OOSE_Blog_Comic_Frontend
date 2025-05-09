import { useState } from 'react';
import { Button, Input } from 'antd';

function CommentBox({ onSubmit, parentId = null, blogId, placeholder = 'Nhập bình luận của bạn...' }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!content.trim()) return;
    setLoading(true);
    await onSubmit({ blogId, content, parentId });
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
      <div>
        <Button
          type="primary"
          onClick={handleSend}
          disabled={!content.trim()}
          loading={loading}
        >
          Gửi bình luận
        </Button>
      </div>
    </div>
  );
}

export default CommentBox; 