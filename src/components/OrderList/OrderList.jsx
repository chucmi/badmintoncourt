import { Button, notification, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { getOrdersByUserId, updateOrderStatus } from "../../services/orderAPI";
import {
  Money,
  MoneyOffCsredTwoTone,
  MoneyOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { createPayment } from "../../services/paymentAPI";
import { formatDateTime } from "../../utils/time";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const userId = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  ).id;

  let notificationDisplayed = false;

  const navigate = useNavigate();
  const fetchOrders = async () => {
    try {
      const data = await getOrdersByUserId(userId);
      if (data) {
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [userId]);

  const handlePayment = async (amount, bookingCode) => {
    try {
      const response = await createPayment(amount, bookingCode);
      window.location.href = response.data.payment_url;
    } catch (error) {
      if (!notificationDisplayed) {
        notification.error({
          message: error?.message || "Some thing wrong. Please try later!",
        });
        notificationDisplayed = true;
      }
    }
  };

  const handleCancelOrder = async (id) => {
    try {
      await updateOrderStatus(id);
      await fetchOrders();
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
  };

  const columns = [
    {
      title: "Mã đặt sân",
      dataIndex: "id",
      key: "id",
      render: (text) => `#${text}`,
    },
    {
      title: "Tên sân",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <>
          <div className="flex items-center justify-between gap-2">
            <a className="text-blue-500" href={`/yard/${record.yard_id}`}>
              {text}
            </a>
          </div>
        </>
      ),
    },
    {
      title: "Đặt lúc",
      dataIndex: "booking_at",
      key: "booking_at",
      render: (text) => `${text}`,
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "start_time",
      key: "start_time",
      render: (text) => `${text}`,
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "end_time",
      key: "end_time",
      render: (text) => `${text}`,
    },
    {
      title: "Thành tiền",
      dataIndex: "price",
      key: "price",
      render: (text) => `${text.toLocaleString("vi-VN")}đ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        if (text === true) {
          return <Tag color="green">Đã thanh toán</Tag>;
        } else if (text === null) {
          return <Tag color="orange">Chờ thanh toán</Tag>;
        } else {
          return <Tag color="red">Đã hủy thanh toán</Tag>;
        }
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, record) =>
        record.status === null ? (
          <>
            <div className="flex gap-2">
              <Button
                className="flex bg-green-400 font-semibold"
                icon={<MoneyOutlined />}
                onClick={() => handlePayment(record.price, record.id)}
              >
                Thanh toán
              </Button>
              <Button
                className="bg-red-400 flex font-semibold"
                icon={<MoneyOffCsredTwoTone />}
                onClick={() => handleCancelOrder(record.id)}
              >
                Hủy
              </Button>
            </div>
          </>
        ) : (
          <></>
        ),
    },
  ];

  const data = orders.map((order) => ({
    key: order.id,
    id: order.id,
    name: order.yard.name,
    yard_id: order.yard.id,
    booking_at: formatDateTime(order.booking_at),
    start_time: order.tournament_start + "  lúc " + order.slot.start_time,
    end_time: order.tournament_end + "  lúc " + order.slot.end_time,
    price: order.slot.price,
    status: order.status,
  }));
  return (
    <>
      <div className="flex justify-center">
        <div className="container">
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </div>
    </>
  );
}
