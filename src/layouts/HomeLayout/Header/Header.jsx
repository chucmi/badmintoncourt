import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Input,
  Space,
  notification,
} from "antd";

import {
  SearchOutlined,
  UserOutlined,
  DownOutlined,
  SmileOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Header as HeaderAntd } from "antd/es/layout/layout";
import Logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/authAPI"; // Import logout function
import { useSelector } from "react-redux";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
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
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      notification.error({
        message: error?.message || "Some thing wrong. Please try later!",
      });
    }
  };

  return (
    <>
      <HeaderAntd className="text-center flex items-center justify-center bg-slate-300 text-white h-24">
        <a href="/">
          <img className="h-16 w-80 bg-contain" src={Logo} />
        </a>
        <Input
          className="font-bold h-12 ml-8"
          placeholder="Nhập sân cầu lông bạn cần tìm?"
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          className="text-black font-bold h-12 w-48 ml-2"
        >
          Tìm kiếm
        </Button>
        {isLoggedIn ? (
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar size={42} className="ml-5" icon={<UserOutlined />} />
                <DownOutlined className="text-xl ml-2" />
              </Space>
            </a>
          </Dropdown>
        ) : (
          <Button
            type="primary"
            className="ml-5 text-black font-bold h-12 w-48"
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </Button>
        )}

        <a href="/cart">
          <Button className="bg-transparent border-none text-xl ml-5 flex h-12">
            <Badge count={cartItems.length} showZero>
              <ShoppingCartOutlined className="text-3xl" />
            </Badge>
          </Button>
        </a>
      </HeaderAntd>
    </>
  );
}
