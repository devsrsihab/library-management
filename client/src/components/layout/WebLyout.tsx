import { Layout, theme, Row, Col } from "antd";
import { Outlet } from "react-router-dom";
import HeaderBar from "../shared/header/HeaderBar";
import AvaterDropdown from "../shared/header/AvaterDropdown";
import Logo from "../shared/header/Logo";
import MenuDrawer from "../shared/header/MenuDrawer";
import { currentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import "../../App.css";
import Container from "../shared/Container";

const { Header, Content, Footer } = Layout;

const WebLyout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const authToken = useAppSelector(currentToken);

  return (
    <Layout className="layout-sr">
      <div className="bg-[#001529]">
        <Container>
          <Header
            className="px-0  sticky z-50  top-0 "
            style={{
              display: "flex",
              justifyContent: "space-between",
              background: "#001529",
            }}
          >
            <Row
              align="middle"
              justify="space-between"
              style={{ width: "100%" }}
            >
              <Col xs={8} md={4} lg={5} xl={5}>
                <Logo />
              </Col>
              <Col xs={0} md={16} lg={14} xl={14}>
                <HeaderBar />
              </Col>
              <Col xs={0} md={4} lg={5} xl={5}>
                {authToken && <AvaterDropdown />}
              </Col>
              <Col xs={16} md={0} lg={0} xl={0}>
                <MenuDrawer />
              </Col>
            </Row>
          </Header>
        </Container>
      </div>
      <Content style={{ padding: "0 0 0 0", background: colorBgContainer }}>
        <Row justify="center" style={{ marginBottom: "24px" }}>
          <Col xs={24} md={20} lg={24}>
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet /> {/* This is where child routes will be rendered */}
            </div>
          </Col>
        </Row>
      </Content>
      <Container>
        <Footer style={{ textAlign: "center", padding: "12px 24px" }}>
          SRS Library ©{new Date().getFullYear()} Created by SRS
        </Footer>
      </Container>
    </Layout>
  );
};

export default WebLyout;
