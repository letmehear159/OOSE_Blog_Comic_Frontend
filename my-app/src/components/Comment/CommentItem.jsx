import React from 'react';
import { Button, Tooltip, Space, Tag } from 'antd';
import { MoreOutlined, DeleteOutlined, EyeInvisibleOutlined, FlagOutlined } from '@ant-design/icons';
import { CommentContext } from '../../context/CommentContext';
import CommentBox from './CommentBox';
import ReportButton from '../Report/ReportButton';

class CommentItem extends React.Component {
  static contextType = CommentContext;
  static defaultProps = {
    currentUserRole: 'user',
    level: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      replying: false,
      editing: false,
      editContent: props.comment.content,
      menuOpen: false,
    };
  }

  handleAction = async (action) => {
    const { comment } = this.props;
    const { handleAddComment, handleUpdateComment, handleDeleteComment } = this.context;
    switch (action) {
      case 'reply':
        this.setState({ replying: true });
        break;
      case 'cancel-reply':
        this.setState({ replying: false });
        break;
      case 'edit':
        this.setState({ editing: true });
        break;
      case 'cancel-edit':
        this.setState({ editing: false, editContent: comment.content });
        break;
      case 'submit-edit':
        await handleUpdateComment(comment.id, this.state.editContent);
        this.setState({ editing: false });
        break;
      case 'delete':
        await handleDeleteComment(comment.id);
        break;
      default:
        break;
    }
  };

  getRoleTagColor = (role) => {
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

  render() {
    const { comment, blogId, currentUserRole, level } = this.props;
    const { replying, editing, editContent, menuOpen } = this.state;

    // Menu actions for three-dot icon
    const menuActions = [];
    if (currentUserRole === 'admin' || currentUserRole === 'blogger') {
      menuActions.push({
        key: 'delete',
        icon: <DeleteOutlined className="text-red-500" />, label: 'Xoá',
        onClick: () => this.handleAction('delete')
      });
      menuActions.push({
        key: 'hide',
        icon: <EyeInvisibleOutlined className="text-gray-500" />, label: 'Ẩn',
        onClick: () => this.handleAction('hide')
      });
    } else {
      menuActions.push({
        key: 'report',
        icon: <FlagOutlined className="text-orange-500" />, label: 'Báo cáo',
        onClick: () => this.setState({ menuOpen: false })
      });
    }

    const borderColors = [
      'border-gray-200', // cấp 1
      'border-gray-100', // cấp 2
      'border-gray-50',  // cấp 3
    ];
    const borderColor = borderColors[level] || 'border-gray-50';
    const marginLeft = `ml-${Math.min(8 + level * 4, 20)}`; // ml-8, ml-12, ml-16, ml-20

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
              <Tag color={this.getRoleTagColor(comment.role)}>
                {comment.role === 'admin' ? 'Quản trị viên' :
                  comment.role === 'blogger' ? 'Tác giả' :
                    comment.role === 'moderator' ? 'Người kiểm duyệt' : comment.role}
              </Tag>
            )}
            <Tooltip title={comment.createdAt}>
              <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString('vi-VN')}</span>
            </Tooltip>
            {/* Three dot icon menu */}
            <div className="ml-auto relative">
              <Button
                size="small"
                type="text"
                icon={<MoreOutlined />}
                onClick={() => this.setState({ menuOpen: !menuOpen })}
              />
              {menuOpen && (
                <div className="absolute right-0 z-10 bg-white border rounded shadow-md mt-2 min-w-[120px]">
                  {menuActions.map(action => (
                    <div
                      key={action.key}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => { action.onClick(); this.setState({ menuOpen: false }); }}
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
                  onChange={e => this.setState({ editContent: e.target.value })}
                  rows={3}
                />
                <Space>
                  <Button size="small" type="primary" onClick={() => this.handleAction('submit-edit')} disabled={!editContent.trim()}>
                    Lưu
                  </Button>
                  <Button size="small" onClick={() => this.handleAction('cancel-edit')}>Huỷ</Button>
                </Space>
              </div>
            ) : (
              <span>{comment.content}</span>
            )}
          </div>
          <div className="flex gap-2 mt-2 items-center">
            <Button size="small" type="link" onClick={() => this.handleAction('reply')}>Trả lời</Button>
          </div>
          {/* Children */}
          {replying && (
            <div className="mt-2">
              <CommentBox
                blogId={blogId}
                parentId={comment.id}
                currentUserRole={currentUserRole}
                onSubmit={async (data) => {
                  await this.context.handleAddComment(data);
                  this.setState({ replying: false });
                }}
                placeholder="Nhập phản hồi..."
              />
              <Button size="small" onClick={() => this.handleAction('cancel-reply')} className="mt-1">Huỷ</Button>
            </div>
          )}
          {/* Áp dụng Composite Pattern ở đây */}
          {comment.children && comment.children.length > 0 && (
            <div
              className={`${marginLeft} mt-2 border-l ${borderColor} pl-4`}
              style={{ borderLeftWidth: 4, borderLeftColor: 'rgba(163, 163, 165, 0.4)' }}
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
}

export default CommentItem;