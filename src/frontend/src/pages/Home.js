import { useState, lazy, Suspense } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Breadcrumb, theme, Spin } from "antd";
import { SiMongodb } from "react-icons/si";
import { SiMysql } from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import crud from "../assests/crud.png";
const { Header, Sider, Content, Footer } = Layout;

// Lazy load components
const Sql = lazy(() => import("../components/Sql"));
const Mongo = lazy(() => import("../components/Mongo"));
const Dynamo = lazy(() => import("../components/Dynamo"));

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    { key: "1", icon: <SiMysql size={25} />, label: "My Sql" },
    { key: "2", icon: <SiMongodb />, label: "Mongodb" },
    { key: "3", icon: <FaAws />, label: "Dynamodb" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        {collapsed ? (
          <img
            src={crud}
            style={{
              height: "62px",
              width: "72px",
              margin: "10px 0px 10px 0px",
            }}
            alt="crud"
          ></img>
        ) : (
          <h3
            style={{
              color: "white",
              marginLeft: "25px",
              marginTop: "20px",
            }}
          >
            CRUD APP
          </h3>
        )}

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
        </Header>

        <Breadcrumb style={{ margin: "16px 16px" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            {menuItems.find((item) => item.key === selectedKey)?.label ||
              "Dashboard"}
          </Breadcrumb.Item>
        </Breadcrumb>

        <Content
          style={{
            margin: "0 16px 24px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Suspense fallback={<Spin size="large" />}>
            {selectedKey === "1" && <Sql />}
            {selectedKey === "2" && <Mongo />}
            {selectedKey === "3" && <Dynamo />}
          </Suspense>
        </Content>
        <Footer>
          <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
            {/* Left Section */}
            <span></span>

            {/* Center Links */}
            <div className="mt-2 mt-md-0"></div>

            {/* Right (Social Icons) */}
            <div className="mt-2 mt-md-0 d-flex">
              <a
                href="mailto:hariraghava21s@gmail.com"
                className="text-dark me-3 fs-5"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://www.linkedin.com/in/hariraghav962003"
                target="_blank"
                rel="noreferrer"
                className="text-dark me-3 fs-5"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/hariraghav2003"
                target="_blank"
                rel="noreferrer"
                className="text-dark fs-5"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
