import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Breadcrumb, theme } from "antd";
import { SiMongodb } from "react-icons/si";
import { SiMysql } from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import Sql from '../components/Sql';
import Mongo from '../components/Mongo';
import Dynamo from "../components/Dynamo";
const { Header, Sider, Content } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    { key: "1", icon: <SiMysql size={25} />, label: "My Sql" },
    { key: "2", icon: <SiMongodb />, label: "Mongodb" },
    { key: "3", icon: <FaAws /> , label: "Dynamodb" },
  ];

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: "100vh" }}
      >
        <div className="demo-logo-vertical" />
        <h2 style={{ color: "wheat", marginLeft: collapsed ? "5px" : "60px" }}>
          CRUD
        </h2>
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
          {selectedKey === "1" && (
            <Sql></Sql>
          )}
          {selectedKey === "2" && (
            <Mongo></Mongo>
          )}
          {selectedKey === "3" && (
            <Dynamo></Dynamo>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
