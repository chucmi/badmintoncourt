import React from "react";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Footer from "../../layouts/HomeLayout/Footer/Footer";
import Header from "../../layouts/HomeLayout/Header/Header";
import { Outlet } from "react-router-dom";
import "./global.scss";
export default function HomePage() {
  return (
    <>
      <Layout>
        <Header />
        <Content className="h-fit">
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </>
  );
}
