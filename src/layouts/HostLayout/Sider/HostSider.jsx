import React from "react";
import { Layout, Menu } from "antd";
import Logo from "../../../assets/logo.png";
import Footer from "../Footer/Footer";

import {
  AppstoreOutlined,
  BarChartOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;

const backgroundColor = "white";
const themeBackgroundColor = "light";
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

  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: labels[index],
}));
export default function HostSider() {
  return (
    <>
      <Sider
        width={width}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: backgroundColor,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="p-6">
          <img className="bg-contain" src={Logo} alt="Logo" />
        </div>
        <Menu
          theme={themeBackgroundColor}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{ height: "68%" }}
        />

        <Footer />
      </Sider>
    </>
  );
}
