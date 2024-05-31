import React from "react";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Footer from "../../layouts/HomeLayout/Footer/Footer";
import Header from "../../layouts/HomeLayout/Header/Header";
export default function HomePage() {
  return (
    <>
      <Layout>
        <Header />
        <Content className="text-center h-screen flex items-center justify-center text-black">
          Content
        </Content>
        <Footer />
      </Layout>
    </>
  );
}
