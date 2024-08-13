import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../redux/features/auth/authSlice";



const AvaterDropdown: React.FC = () => {
      const distpatch = useAppDispatch();

      const handleLogout = () => {
        distpatch(logout());
      };

      const items: MenuProps["items"] = [
        {
          key: "profile",
          label: <Link to={"/profile"}>Profile</Link>,
        },
        {
          key: "logout",
          label: <span onClick={handleLogout}>Logout</span>,
        },
      ];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Space direction="vertical" align="center">
          <Dropdown menu={{ items }} placement="bottomRight">
            <img
              className="w-10 h-10 cursor-pointer  p-1 rounded-full ring-2 ring-gray-300 "
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="Bordered avatar"
            />
          </Dropdown>
        </Space>
      </div>
    </>
  );
};

export default AvaterDropdown;
