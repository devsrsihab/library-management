import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const menus = [
  {
    key: "home",
    label: `Home`,
    path: "/",
  },
  {
    key: "borrowed",
    label: `Borrowings`,
    path: "/borrowed",
  },
  {
    key: "books",
    label: `Books`,
    path: "/books",
  },
];

const HeaderBar = () => {
  const location = useLocation();
  const { pathname } = location;

  const items = menus.map(({ key, label, path }) => ({
    key,
    label: <Link to={path}>{label}</Link>,
  }));

  const activeMenuItem =
    menus.find((menu) => pathname === menu.path)?.key || "home";

  return (
    <>
      <div
        className="header-bar"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowX: "auto", // Allow horizontal scrolling on small devices
          whiteSpace: "nowrap", // Prevent line breaks in menu items
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeMenuItem]}
          items={items}
          style={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            borderBottom: "none", // Remove border for cleaner look
          }}
        />
      </div>
    </>
  );
};

export default HeaderBar;
