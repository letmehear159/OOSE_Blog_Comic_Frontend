import { useState } from 'react';
import { Button, Tooltip, Popconfirm, Space, Tag } from 'antd';
import { useComment } from './CommentContext';
import CommentBox from './CommentBox';
import ReportButton from '../Report/ReportButton';

function CommentItem({ comment, blogId, currentUserRole = 'user' }) {
  const { handleAddComment, handleUpdateComment, handleDeleteComment } = useComment();
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  // Chain of responsibility cho action
  const handleAction = async (action, payload) => {
    switch (action) {
      case 'reply':
        setReplying(true);
        break;
      case 'cancel-reply':
        setReplying(false);
        break;
      case 'edit':
        setEditing(true);
        break;
      case 'cancel-edit':
        setEditing(false);
        setEditContent(comment.content);
        break;
      case 'submit-edit':
        await handleUpdateComment(comment.id, editContent);
        setEditing(false);
        break;
      case 'delete':
        await handleDeleteComment(comment.id);
        break;
      default:
        break;
    }
  };

  // Kiểm tra xem người dùng hiện tại có quyền chỉnh sửa/xóa bình luận không
  const canEditDelete = currentUserRole === 'admin' || 
                        (currentUserRole === 'blogger' && comment.blogOwnerId === currentUserRole) || 
                        comment.userId === currentUserRole;
  
  // Xác định màu cho role tag
  const getRoleTagColor = (role) => {
    switch (role) {
      case 'admin':
        return 'red';
      case 'blogger':
        return 'blue';
      case 'moderator':
        return 'purple';
      default:
        return 'default';
    }
  };

  return (
    <div className="mb-4 flex gap-3">
      {/* Avatar placeholder */}
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
        {comment.user?.[0] || 'U'}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{comment.user}</span>
          {comment.role && comment.role !== 'user' && (
            <Tag color={getRoleTagColor(comment.role)}>
              {comment.role === 'admin' ? 'Quản trị viên' : 
               comment.role === 'blogger' ? 'Tác giả' : 
               comment.role === 'moderator' ? 'Người kiểm duyệt' : comment.role}
            </Tag>
          )}
          <Tooltip title={comment.createdAt}>
            <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString('vi-VN')}</span>
          </Tooltip>
        </div>
        <div className="my-1">
          {editing ? (
            <div className="space-y-2">
              <textarea
                className="w-full border rounded p-2"
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                rows={3}
              />
              <Space>
                <Button size="small" type="primary" onClick={() => handleAction('submit-edit')} disabled={!editContent.trim()}>
                  Lưu
                </Button>
                <Button size="small" onClick={() => handleAction('cancel-edit')}>Huỷ</Button>
              </Space>
            </div>
          ) : (
            <span>{comment.content}</span>
          )}
        </div>
        <div className="flex gap-2 mt-2">
          <Button size="small" type="link" onClick={() => handleAction('reply')}>Trả lời</Button>
          
          {/* Hiển thị nút sửa/xóa nếu người dùng có quyền */}
          {canEditDelete && (
            <>
              <Button size="small" type="link" onClick={() => handleAction('edit')}>Sửa</Button>
              <Popconfirm title="Xoá bình luận này?" onConfirm={() => handleAction('delete')} okText="Xoá" cancelText="Huỷ">
                <Button size="small" type="link" danger>Xoá</Button>
              </Popconfirm>
            </>
          )}

          {/* Hiển thị nút báo cáo cho người dùng không phải admin */}
          {currentUserRole !== 'admin' && (
            <div className="ml-auto">
              <ReportButton targetType="comment" targetId={comment.id} />
            </div>
          )}
        </div>
        {/* Children */}
        {replying && (
          <div className="mt-2">
            <CommentBox
              blogId={blogId}
              parentId={comment.id}
              currentUserRole={currentUserRole}
              onSubmit={async (data) => {
                await handleAddComment(data);
                setReplying(false);
              }}
              placeholder="Nhập phản hồi..."
            />
            <Button size="small" onClick={() => handleAction('cancel-reply')} className="mt-1">Huỷ</Button>
          </div>
        )}
        {comment.children && comment.children.length > 0 && (
          <div className="ml-8 mt-2 border-l pl-4">
            {comment.children.map(child => (
              <CommentItem 
                key={child.id} 
                comment={child} 
                blogId={blogId} 
                currentUserRole={currentUserRole} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentItem; 