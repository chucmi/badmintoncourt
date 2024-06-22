import React from "react";
import { Layout, notification } from "antd";
import Header from "../../layouts/ManagerLayout/Header/Header";
import CourtForm from "../../components/CourtForm/CourtForm";
import ManagerSider from "../../layouts/ManagerLayout/Sider/ManagerSider";
import {
  LogoutOutlined,
  BarChartOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { logout } from "../../services/authAPI"; // Import logout function from authAPI
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const width = 260;

const labels = ["Home", "Court Management", "Staff Management", "Settings"];

const items = [
  BarChartOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: labels[index],
}));

const backgroundColor = "white";
const themeBackgroundColor = "light";

export default function HostPage() {
  const navigate = useNavigate();

  // Add the logout item separately
  items.push({
    key: String(items.length + 1),
    icon: React.createElement(LogoutOutlined),
    label: (
      <a
        onClick={(e) => {
          e.preventDefault();
          handleLogout();
        }}
      >
        Logout
      </a>
    ),
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      notification.error({
        message: error?.message || "Some thing wrong. Please try later!",
      });
    }
  };

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

          <Content className="">
            <CourtForm />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
