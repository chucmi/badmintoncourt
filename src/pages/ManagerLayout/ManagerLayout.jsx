import React from "react";
import { Layout, notification } from "antd";
import Header from "../../layouts/ManagerLayout/Header/Header";
import ManagerSider from "../../layouts/ManagerLayout/Sider/ManagerSider";
import {
  LogoutOutlined,
  BarChartOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { logout } from "../../services/authAPI"; // Import logout function from authAPI
import { Outlet, useNavigate, Link } from "react-router-dom";

const { Content } = Layout;

const width = 260;

const backgroundColor = "white";
const themeBackgroundColor = "light";

export default function ManagerLayout({ items }) {
  const token = localStorage.getItem("token");
  const username = JSON.parse(atob(token.split(".")[1])).sub;

  return (
    <>
      <Layout hasSider>
        <ManagerSider
          backgroundColor={backgroundColor}
          themeBackgroundColor={themeBackgroundColor}
          items={items}
        />

        <Layout style={{ marginLeft: width }}>
          <Header username={username} />

          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
