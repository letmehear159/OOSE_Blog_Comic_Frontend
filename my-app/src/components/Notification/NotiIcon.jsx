// NoticeIcon.jsx
import React, { useState, useRef, useEffect } from "react";

const NoticeIcon = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: "000000001",
      avatar: "https://i.pravatar.cc/150?img=1",
      content:
        "Nguyễn Văn A đã bình luận về bài viết của bạn: 'Bài review về Itachi rất hay, phân tích sâu sắc!'",
      date: "10/06/2024",
      read: false,
    },
    {
      id: "000000002",
      avatar: "https://i.pravatar.cc/150?img=2",
      content:
        "Trần Thị B đã lưu bài viết 'Phân tích nhân vật Levi Ackerman' của bạn",
      date: "09/06/2024",
      read: false,
    },
    {
      id: "000000003",
      avatar: "https://i.pravatar.cc/150?img=3",
      content: "Lê Văn C đã thích bài viết của bạn về Gojou Satoru",
      date: "08/06/2024",
      read: false,
    },
    {
      id: "000000004",
      avatar: "https://i.pravatar.cc/150?img=4",
      content: "Phạm Thị D đã theo dõi bạn",
      date: "07/06/2024",
      read: false,
    },
    {
      id: "000000005",
      avatar: "https://i.pravatar.cc/150?img=5",
      content:
        "Hoàng Văn E đã trả lời bình luận của bạn: 'Cảm ơn bạn đã chia sẻ góc nhìn thú vị về nhân vật này!'",
      date: "06/06/2024",
      read: false,
    },
    {
      id: "000000006",
      avatar: "https://i.pravatar.cc/150?img=6",
      content:
        "Đỗ Thị F đã đề xuất bài viết mới: 'Phân tích sâu về nhân vật Killua Zoldyck'",
      date: "05/06/2024",
      read: false,
    },
    {
      id: "000000007",
      avatar: "https://i.pravatar.cc/150?img=7",
      content: "Vũ Văn G đã chia sẻ bài viết của bạn về Vương Lâm",
      date: "04/06/2024",
      read: false,
    },
  ]);

  const ref = useRef();

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

  const truncateText = (text, maxWords = 15) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="relative pt-1" ref={ref}>
      <button
        className="relative text-gray-500 bg-blue-400 p-1.5 rounded-full hover:text-blue-600 focus:outline-none"
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
          <div className="p-4 border-b font-bold text-gray-700">Thông báo</div>
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
                    className="flex gap-4 px-4 py-4 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 relative"
                    onClick={() => handleNotificationClick(item.id)}
                  >
                    <img
                      src={item.avatar}
                      alt="avatar"
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0 pr-6 relative">
                      <div className={`text-gray-900 text-sm leading-relaxed`}>
                        {truncateText(item.content)}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          !item.read ? "text-[#6BB0FF]" : "text-gray-400"
                        }`}
                      >
                        {item.date}
                      </div>

                      {!item.read && (
                        <span className="absolute top-1/2 right-0 transform -translate-y-1/2 w-2 h-2 rounded-full bg-[#6BB0FF]"></span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className=" p-2 pt-0 text-black text-center">
            <button
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-100 rounded-lg text-sm font-medium transition-colors duration-200"
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
