import { useState } from 'react';
import { Button, Tooltip, Popconfirm, Space, Tag } from 'antd';
import { MoreOutlined, DeleteOutlined, EyeInvisibleOutlined, FlagOutlined } from '@ant-design/icons';
import { useComment } from '../../context/CommentContext';
import CommentBox from './CommentBox';
import ReportButton from '../Report/ReportButton';

// Thêm prop level để phân cấp, mặc định là 0
function CommentItem({ comment, blogId, currentUserRole = 'user', level = 0 }) {
  const { handleAddComment, handleUpdateComment, handleDeleteComment } = useComment();
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Menu actions for three-dot icon
  const menuActions = [];
  if (currentUserRole === 'admin' || currentUserRole === 'blogger') {
    menuActions.push({
      key: 'delete',
      icon: <DeleteOutlined className="text-red-500" />, label: 'Xoá',
      onClick: () => handleAction('delete')
    });
    menuActions.push({
      key: 'hide',
      icon: <EyeInvisibleOutlined className="text-gray-500" />, label: 'Ẩn',
      onClick: () => handleAction('hide')
    });
  } else {
    menuActions.push({
      key: 'report',
      icon: <FlagOutlined className="text-orange-500" />, label: 'Báo cáo',
      onClick: () => setMenuOpen(false)
    });
  }

  // Tạo các class cho border và margin theo level
  const borderColors = [
    'border-gray-200', // cấp 1
    'border-gray-100', // cấp 2
    'border-gray-50',  // cấp 3
  ];
  const borderColor = borderColors[level] || 'border-gray-50';
  // Tăng margin trái theo level
  const marginLeft = `ml-${Math.min(8 + level * 4, 20)}`; // ml-8, ml-12, ml-16, ml-20
  // Tăng độ mờ bằng style inline nếu muốn mờ hơn nữa
  const borderOpacity = 0.2 + Math.max(0, 0.15 - level * 0.05); // giảm dần opacity

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
          {/* Three dot icon menu - moved here to align with user name */}
          <div className="ml-auto relative">
            <Button
              size="small"
              type="text"
              icon={<MoreOutlined />}
              onClick={() => setMenuOpen((open) => !open)}
            />
            {menuOpen && (
              <div className="absolute right-0 z-10 bg-white border rounded shadow-md mt-2 min-w-[120px]">
                {menuActions.map(action => (
                  <div
                    key={action.key}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => { action.onClick(); setMenuOpen(false); }}
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
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
        <div className="flex gap-2 mt-2 items-center">
          <Button size="small" type="link" onClick={() => handleAction('reply')}>Trả lời</Button>
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
          <div
            className={`${marginLeft} mt-2 border-l ${borderColor} pl-4`}
            style={{ borderLeftWidth: 4, borderLeftColor: 'rgba(163, 163, 165, 0.4)' /* gray-200 + opacity 0.4, width 4px */ }}
          >
            {comment.children.map(child => (
              <CommentItem 
                key={child.id} 
                comment={child} 
                blogId={blogId} 
                currentUserRole={currentUserRole} 
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentItem;