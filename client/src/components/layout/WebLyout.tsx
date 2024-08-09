import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import HeaderBar from "../shared/header/HeaderBar";

const { Header, Content, Footer } = Layout;

const WebLyout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header>
        <HeaderBar />
      </Header>
      <Content style={{ padding: "0 48px", background: colorBgContainer }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet /> {/* This is where child routes will be rendered */}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default WebLyout;
