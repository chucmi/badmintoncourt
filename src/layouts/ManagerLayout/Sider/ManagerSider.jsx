import React from "react";
import { Layout, Menu } from "antd";
import Logo from "../../../assets/logo.png";
import Footer from "../Footer/Footer";

const { Sider } = Layout;

const ManagerSider = ({
  items,
  width = 260,
  backgroundColor,
  themeBackgroundColor,
}) => {
  return (
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
        items={items}
        style={{ height: "65%" }}
      />
      <Footer />
    </Sider>
  );
};

export default ManagerSider;
