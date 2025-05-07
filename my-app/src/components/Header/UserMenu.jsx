import React, { useState, useRef, useEffect } from "react";

const menuOptions = [
  {
    label: "My Profile",
    icon: (
      <svg
        className="w-5 h-5 mr-2 text-gray-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    onClick: () => window.location.href = '/users',
  },
  {
    label: "Setting",
    icon: (
      <svg
        className="w-5 h-5 mr-2 text-gray-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09A1.65 1.65 0 008 3.09V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
        />
      </svg>
    ),
    onClick: () => alert("Go to setting!"),
  },
  {
    label: "Logout",
    icon: (
      <svg
        className="w-5 h-5 mr-2 text-gray-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12a9 9 0 0118 0 9 9 0 01-18 0z"
        />
      </svg>
    ),
    onClick: () => alert("Logout!"),
  },
];

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Avatar"
        className="w-9 h-9 rounded-full border-2 border-gray-200 object-cover cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      />
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
          <ul>
            {menuOptions.map((option) => (
              <li
                key={option.label}
                className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-800 text-sm"
                onClick={() => {
                  setOpen(false);
                  option.onClick();
                }}
              >
                {option.icon}
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
