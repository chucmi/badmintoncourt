import React from "react";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Footer from "../../layouts/HomeLayout/Footer/Footer";
import Header from "../../layouts/HomeLayout/Header/Header";
import { Outlet } from "react-router-dom";
import "./global.scss";
export default function HomeLayout() {
  return (
    <>
      <Layout className="grid-container min-h-screen">
        <Header />
        <Content className="text-center h-fit text-black">
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </>
  );
}
