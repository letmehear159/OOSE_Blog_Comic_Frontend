import { UserOutlined, CalendarOutlined, PlusOutlined } from '@ant-design/icons'
import { Avatar, Button, Image } from 'antd'

export const BloggerInfo = ({ name, avatarUrl, date, onFollow }) => {
  return (
    <div
      className="flex items-center  my-5 justify-between  border border-gray-200 shadow-md rounded-2xl p-4 w-md ">
      {/* Left: Avatar + Info */}
      <div className="flex items-center gap-4">
        <Avatar
          src={avatarUrl}
          alt={name}
          style={{
            width: '80px',
            height: '80px'
          }}
        />
        <div className="flex flex-col">
          <div className="text-lg font-semibold text-[#333] font-[Quicksand] flex items-center gap-1">
            <span className={'font-bold'}>{name}</span>
          </div>
          <Button
            onClick={onFollow}
            icon={<PlusOutlined/>}
            type={'primary'}
            className="!mt-2 !rounded-full px-4 !font-bold font-[Quicksand]"
          >
            Theo dõi
          </Button>

        </div>

        <div className={'italic mt-11  font-medium h-full text-xl'}>{new Date(date).toLocaleDateString('vi-VN')}</div>
      </div>

      {/* Right: Follow button */}

    </div>
  )
}
