import React from "react";
import { Layout } from "antd";
import Header from "../../layouts/ManagerLayout/Header/Header";
import CourtForm from "../../components/CourtForm/CourtForm";
import {
  AppstoreOutlined,
  BarChartOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import ManagerSider from "../../layouts/ManagerLayout/Sider/ManagerSider";

const { Content } = Layout;

const width = 260;

const labels = [
  "Home",
  "Court Management",
  "Staff Management",
  "Settings",
  "Logout",
];

const items = [
  BarChartOutlined,
  AppstoreOutlined,
  TeamOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: labels[index],
}));

// Add the logout item separately
items.push({
  key: String(items.length + 1),
  icon: React.createElement(LogoutOutlined),
  label: (
    <a target="" rel="Logout" href="/">
      Logout
    </a>
  ),
});

const backgroundColor = "white";
const themeBackgroundColor = "light";

export default function HostPage() {
  return (
    <>
      <Layout hasSider>
        <ManagerSider
          backgroundColor={backgroundColor}
          themeBackgroundColor={themeBackgroundColor}
          items={items}
        />

        <Layout
          style={{
            marginLeft: width,
          }}
        >
          <Header username="Host" />

          <Content className="text-center h-screen flex text-black">
            <CourtForm />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
