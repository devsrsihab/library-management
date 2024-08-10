import React, { useState } from "react";
import { Button, Divider, Drawer } from "antd";
import { Link } from "react-router-dom";
import { IoReorderFourOutline } from "react-icons/io5";

const MenuDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);

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
          <Divider style={{ borderColor: "#000", borderStyle: "solid" }}>
            Profile
          </Divider>
          <p>
            <Link to="/books">Dashboard</Link>
          </p>
           <p> <Link to="/books">Profile</Link></p>
        </Drawer>
      </div>
    </>
  );
};

export default MenuDrawer;
