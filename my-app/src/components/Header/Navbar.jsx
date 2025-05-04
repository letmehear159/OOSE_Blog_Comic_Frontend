// Navbar.jsx
import React from "react";
import NotiIcon from "./NotiIcon";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 h-16 bg-black border-b border-gray-200">
      {/* Logo + Links */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="Logo"
            className="h-10"
          />
          <span className="ml-3 font-bold text-xl">MyApp</span>
        </div>
        {/* Navigation Links */}
        <div className="flex items-center gap-6 ml-6">
          <a href="/" className="text-white hover:text-gray-600 font-medium transition">Home</a>
          <a href="/blog" className="text-white hover:text-gray-600 font-medium transition">Blog</a>
          <a href="/about" className="text-white hover:text-gray-600 font-medium transition">About</a>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex align-center items-center gap-7">
        <NotiIcon />
        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;