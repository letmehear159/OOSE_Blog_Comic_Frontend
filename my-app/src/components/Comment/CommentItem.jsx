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
      menuOpen: false,
    };
    this.menuRef = React.createRef();
    this.buttonRef = React.createRef();
  }

  handleAction = async (action) => {
    const { comment } = this.props;
    const { handleAddComment, handleDeleteComment } = this.context;
    switch (action) {
      case 'reply':
        this.setState({ replying: true });
        break;
      case 'cancel-reply':
        this.setState({ replying: false });
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.menuOpen && !prevState.menuOpen) {
      document.addEventListener('mousedown', this.handleClickOutside);
    } else if (!this.state.menuOpen && prevState.menuOpen) {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  }

  handleClickOutside = (event) => {
    if (
      this.menuRef.current &&
      !this.menuRef.current.contains(event.target) &&
      this.buttonRef.current &&
      !this.buttonRef.current.contains(event.target)
    ) {
      this.setState({ menuOpen: false });
    }
  };

  render() {
    const { comment, blogId, currentUserRole, level } = this.props;
    const { replying, menuOpen } = this.state;

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

    return (
      <div className="mb-4 flex gap-3">
        {/* Avatar */}
        <div className="flex flex-col items-center pt-2">
          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
            {comment.user?.[0] || 'U'}
          </div>
        </div>
        <div className="flex-1">
          {/* Box riêng cho mỗi comment */}
          <div className="rounded-xl bg-white px-4 pt-2 pb-3 shadow border border-gray-200 relative">
            <div className="flex items-center gap-2 min-h-[36px]">
              <span className="font-semibold leading-9">{comment.user}</span>
              {comment.role && comment.role !== 'user' && (
                <Tag color={this.getRoleTagColor(comment.role)}>
                  {comment.role === 'admin' ? 'Quản trị viên' :
                    comment.role === 'blogger' ? 'Tác giả' :
                      comment.role === 'moderator' ? 'Người kiểm duyệt' : comment.role}
                </Tag>
              )}
              <Tooltip title={comment.createdAt}>
                <span className="text-xs text-gray-400 leading-9">{new Date(comment.createdAt).toLocaleString('vi-VN')}</span>
              </Tooltip>
              {/* Three dot icon menu */}
              <div className="ml-auto relative">
                <Button
                  size="small"
                  type="text"
                  icon={<MoreOutlined />}
                  ref={this.buttonRef}
                  onClick={() => this.setState({ menuOpen: !menuOpen })}
                />
                {menuOpen && (
                  <div ref={this.menuRef} className="absolute right-0 z-10 bg-white border rounded shadow-md mt-2 min-w-[120px]">
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
            <div className="my-1 text-base text-gray-800">
              <span>{comment.content}</span>
            </div>
            <div className="flex gap-2 mt-2 items-center">
              <Button size="small" type="link" onClick={() => this.handleAction('reply')}>Trả lời</Button>
            </div>
          </div>
          {/* Children - mỗi comment con là 1 box riêng, không nằm trong box cha */}
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
          {comment.children && comment.children.length > 0 && (
            <div className="mt-2 space-y-3">
              {comment.children.map(child => (
                <div key={child.id} className="pl-8">
                  <CommentItem
                    comment={child}
                    blogId={blogId}
                    currentUserRole={currentUserRole}
                    level={level + 1}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CommentItem;