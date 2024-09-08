import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { currentToken } from "../../../redux/features/auth/authSlice";

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
  {
    key: "register",
    label: `Register`,
    path: "/auth/register",
  },
  {
    key: "login",
    label: `Login`,
    path: "/auth/login",
  },
];

const HeaderBar = () => {
  const location = useLocation();
  const { pathname } = location;
  const authToken = useAppSelector(currentToken);

  const filteredMenus = authToken
    ? menus.filter((menu) => menu.key !== "login" && menu.key !== "register")
    : menus.filter((menu) => menu.key !== "borrowed");

  const items = filteredMenus.map(({ key, label, path }) => ({
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



