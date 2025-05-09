// NoticeIcon.jsx
import React, { useState, useRef, useEffect } from "react";

const notifications = [
  {
    id: "000000001",
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "Bạn nhận được 14 báo cáo mới",
    description: "Kiểm tra các báo cáo tuần này trong dashboard.",
    datetime: "2024-06-10 09:00",
    read: false,
  },
  {
    id: "000000002",
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
    title: "Tài khoản đã được cập nhật",
    description: "Thông tin cá nhân của bạn đã thay đổi.",
    datetime: "2024-06-09 15:30",
    read: false,
  },
  {
    id: "000000003",
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png",
    title: "Có bài viết mới từ bạn bè",
    description: "",
    datetime: "2024-06-08 20:10",
    read: false,
  },
];

const NoticeIcon = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: "000000001",
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
      title: "Bạn nhận được 14 báo cáo mới",
      description: "Kiểm tra các báo cáo tuần này trong dashboard.",
      datetime: "2024-06-10 09:00",
      read: false,
    },
    {
      id: "000000002",
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
      title: "Tài khoản đã được cập nhật",
      description: "Thông tin cá nhân của bạn đã thay đổi.",
      datetime: "2024-06-09 15:30",
      read: false,
    },
    {
      id: "000000003",
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png",
      title: "Có bài viết mới từ bạn bè",
      description: "",
      datetime: "2024-06-08 20:10",
      read: false,
    },
  ]);
  const ref = useRef();

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClear = () => {
    setNotifications(notifications.map((noti) => ({ ...noti, read: true })));
  };

  const handleNotificationClick = (notificationId) => {
    setNotifications(
      notifications.map((noti) =>
        noti.id === notificationId ? { ...noti, read: true } : noti
      )
    );
  };

  const unreadCount = notifications.filter((noti) => !noti.read).length;

  return (
    <div className="relative pt-2" ref={ref}>
      <button
        className="relative text-gray-500 hover:text-blue-600 focus:outline-none"
        onClick={() => setOpen((o) => !o)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded shadow-lg z-50">
          <div className="p-4 border-b font-bold text-gray-700 ">Thông báo</div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center py-8">
                <span className="text-gray-400">Không có thông báo nào</span>
              </div>
            ) : (
              <ul>
                {notifications.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-3 px-4 py-4 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 relative"
                    onClick={() => handleNotificationClick(item.id)}
                  >
                    <img
                      src={item.avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 truncate flex items-center">
                        {item.title}
                        {!item.read && (
                          <span className="ml-2 w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                        )}
                      </div>
                      {item.description && item.description.trim() !== "" && (
                        <div className="text-gray-500 text-sm truncate">
                          {item.description}
                        </div>
                      )}
                      <div className="text-gray-400 text-xs mt-1">
                        {item.datetime}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="p-2 border-t text-black text-center">
            <button
              className="text-blue-600 hover:underline text-sm font-medium"
              onClick={handleClear}
            >
              Xoá tất cả thông báo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeIcon;
