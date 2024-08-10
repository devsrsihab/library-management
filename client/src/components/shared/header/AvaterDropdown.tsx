import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    ),
  },
];

const AvaterDropdown: React.FC = () => (
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
);

export default AvaterDropdown;
