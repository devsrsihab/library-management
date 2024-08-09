import { Menu } from "antd";
import { Link } from "react-router-dom";

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
  const items = menus.map(({ key, label, path }) => ({
    key,
    label: <Link to={path}>{label}</Link>,
  }));
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </div>
    </>
  );
};

export default HeaderBar;
