import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

// AppSidebar.js
const AppSidebar = ({ menuItems, onGenreSelect }) => (
  <Sidebar className="h-full w-full">
    <div className="h-full max-h-screen overflow-y-auto bg-[#FBFBFB]">
      <Menu
        menuItemStyles={{
          button: {
            color: "black",
            backgroundColor: "#FBFBFB",
            "&:hover": {
              color: "black",
            },
            "&.active": {
              backgroundColor: "#13395e",
              color: "#b6c8d9",
            },
          },
        }}
      >
        {menuItems.map((item) =>
          item.children ? (
            <SubMenu key={item.label} label={item.label}>
              {item.children.map((child) => (
                <MenuItem
                  key={child.label}
                  onClick={() => onGenreSelect(child.label)} // <-- Gửi label
                >
                  {child.label}
                </MenuItem>
              ))}
            </SubMenu>
          ) : (
            <MenuItem
              key={item.label}
              onClick={() => onGenreSelect(null)} // <-- null để hiển thị tất cả
            >
              {item.label}
            </MenuItem>
          )
        )}
      </Menu>
    </div>
  </Sidebar>
);

export default AppSidebar;
