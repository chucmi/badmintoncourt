import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Form,
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
import { AiOutlineOrderedList } from "react-icons/ai";
import { History } from "@mui/icons-material";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [form] = Form.useForm();

  const items = [
    {
      key: "1",
      label: (
        <a
          onClick={(e) => {
            e.preventDefault();
            handleProfile();
          }}
        >
          Profile
        </a>
      ),
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: (
        <a
          onClick={(e) => {
            e.preventDefault();
            handleOrderList();
          }}
        >
          Orders
        </a>
      ),
      icon: <AiOutlineOrderedList />,
    },
    {
      key: "3",
      label: (
        <a
          onClick={(e) => {
            e.preventDefault();
            handleHistory();
          }}
        >
          History
        </a>
      ),
      icon: <History />,
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

  const handleProfile = () => {
    navigate("/profile");
  };

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

  const handleHistory = () => {
    navigate("/transaction-history");
  };

  const handleOrderList = () => {
    navigate("/orders");
  };

  const handleOnSearch = () => {
    form
      .validateFields()
      .then((values) => {
        window.location.href = "/search/" + values.search;
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <>
      <HeaderAntd className="text-center flex items-center justify-center bg-slate-300 text-white h-24">
        <a href="/">
          <img className="h-16 w-80 bg-contain" src={Logo} />
        </a>
        <Form form={form} className="w-4/5 flex pt-7">
          <Form.Item name={"search"} className="font-bold ml-8 w-full">
            <Input
              placeholder="Nhập sân cầu lông bạn cần tìm?"
              className="h-12"
              value={""}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              className="text-black font-bold h-12 w-48 ml-2"
              onClick={handleOnSearch}
            >
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
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
