import React from "react";
import { Layout } from "antd";
import Header from "../../layouts/HostLayout/Header/Header";
import HostSider from "../../layouts/HostLayout/Sider/HostSider";

const { Content } = Layout;

const width = 260;

const labels = [
  "Home",
  "Court Management",
  "Staff Management",
  "Settings",
  "Logout",
];

export default function HostPage() {
  return (
    <>
      <Layout hasSider>
        <HostSider />

        <Layout
          style={{
            marginLeft: width,
          }}
        >
          <Header />

          <Content className="text-center h-screen flex items-center justify-center text-black">
            Content
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
