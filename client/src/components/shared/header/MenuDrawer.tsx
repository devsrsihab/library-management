import React, { useState } from "react";
import { Button, Divider, Drawer } from "antd";
import { Link } from "react-router-dom";
import { IoReorderFourOutline } from "react-icons/io5";
import { useGetMeQuery } from "../../../redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { currentToken, logout } from "../../../redux/features/auth/authSlice";
import MenuLoader from "../loader/MenuLoader";

const MenuDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const distpatch = useAppDispatch();
  const { data, isLoading } = useGetMeQuery(undefined);
  const userInfo = data?.data;
  const authToken = useAppSelector(currentToken);

  const handleLogout = () => {
    distpatch(logout());
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button type="primary" onClick={showDrawer}>
          <IoReorderFourOutline />
        </Button>
        <Drawer title="Menus" onClose={onClose} open={open}>
          <p>
            <Link to="/">Home</Link>
          </p>
          <p>
            <Link to="/borrowed">Borrowed</Link>
          </p>
          <p>
            <Link to="/books">Books</Link>
          </p>
          {isLoading ? (
            <MenuLoader />
          ) : (
            <div>
              {authToken ? (
                <div>
                  <Divider
                    style={{ borderColor: "#000", borderStyle: "solid" }}
                  >
                    Profile
                  </Divider>
                  <p>
                    <span>{userInfo?.name}</span>
                  </p>
                  <p>
                    <Link to="/books">Dashboard</Link>
                  </p>
                  <p>
                    <Link to="/books">Profile</Link>
                  </p>
                  <p>
                    <Link onClick={handleLogout} to="/books">
                      Logout
                    </Link>
                  </p>
                </div>
              ) : (
                <div>
                  <p>
                    <Link to="/register">Register</Link>
                  </p>
                  <p>
                    <Link to="/auth/login">Login</Link>
                  </p>
                </div>
              )}
            </div>
          )}
        </Drawer>
      </div>
    </>
  );
};

export default MenuDrawer;
