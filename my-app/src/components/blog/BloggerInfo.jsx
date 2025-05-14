import { UserOutlined, CalendarOutlined, PlusOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import FollowButton from '../Follow/FollowButton'
import { useNavigate } from 'react-router-dom'

export const BloggerInfo = ({ name, avatarUrl, date, isFollowing, onFollow, onUnfollow, authorId }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (authorId) {
      navigate(`/users/${authorId}`);
    }
  };
  return (
    <div
      className="flex items-center  my-5 justify-between  border border-gray-200 shadow-md rounded-2xl p-4 w-md ">
      {/* Left: Avatar + Info */}
      <div className="flex items-center gap-4">
        <div className="cursor-pointer" onClick={handleNavigate}>
          <Avatar
            src={avatarUrl}
            alt={name}
            style={{
              width: '80px',
              height: '80px'
            }}
          />
        </div>
        <div className="flex flex-col">
          <div className="text-lg font-semibold text-[#333] font-[Quicksand] flex items-center gap-1">
            <span className={'font-bold cursor-pointer'} onClick={handleNavigate}>{name}</span>
          </div>
          <FollowButton
            isFollowing={isFollowing}
            onFollow={onFollow}
            onUnfollow={onUnfollow}
            // bloggerId can be passed here if FollowButton needs it in the future
          />
        </div>
        <div className={'italic mt-11  font-medium h-full '}>{date}</div>
      </div>
      {/* Right: Follow button */}
    </div>
  )
}
