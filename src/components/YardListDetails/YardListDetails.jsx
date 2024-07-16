import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPaymentsOfYard } from "../../services/paymentAPI";
import {
  Button,
  Form,
  Modal,
  notification,
  Table,
  Tag,
  Typography,
} from "antd";
import CheckinForm from "../CheckinForm/CheckinForm";
import moment from "moment";
import { updateCheckin } from "../../services/checkinAPI";
import { formatDateTime } from "../../utils/time";

export default function YardListDetails() {
  const { yardid } = useParams();
  const [payments, setPayments] = useState([]);
  const [form] = Form.useForm();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectPayment, setSelectPayment] = useState(null);
  const [selectUser, setSelectUser] = useState(null);
  const token = localStorage.getItem("token");
  const [checkin, setCheckin] = useState(null);

  const staffId = JSON.parse(atob(token.split(".")[1])).id;

  const [error, setError] = useState();
  const fetchPayments = async () => {
    try {
      const data = await getPaymentsOfYard(yardid);
      setPayments(data);
    } catch (err) {
      setError("Failed to fetch payments.");
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Giá tiền",
      dataIndex: "final_price",
      key: "final_price",
    },
    {
      title: "Đặt lúc",
      dataIndex: "booking_at",
      key: "booking_at",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status ? (
          <Tag color="green">Đã check-in</Tag>
        ) : (
          <Tag color="orange">Chờ check-in</Tag>
        ),
    },
    {
      title: "Đặt từ",
      dataIndex: "tournament_start",
      key: "tournament_start",
    },
    {
      title: "Đặt tới",
      dataIndex: "tournament_end",
      key: "tournament_end",
    },
    {
      title: "Bắt đầu lúc",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "Kết thúc lúc",
      dataIndex: "end_time",
      key: "end_time",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) =>
        !record.status ? (
          <Button
            type="primary"
            onClick={() => {
              setIsFormVisible(true);
              setSelectPayment(record.id);
              setSelectUser(record.user_id);
              setCheckin(record.checkin_id);
            }}
          >
            Check-in
          </Button>
        ) : (
          <>
            <Tag color="green">Đã check-in</Tag>
          </>
        ),
    },
  ];

  const dataSource = payments.map((payment) => ({
    id: payment.id,
    checkin_id: payment.checkin.id,
    final_price: (payment.final_price / 100).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    }),
    booking_at: formatDateTime(payment.booking_order.booking_at),
    tournament_start: payment.booking_order.tournament_start,
    tournament_end: payment.booking_order.tournament_end,
    start_time: payment.booking_order.slot.start_time,
    end_time: payment.booking_order.slot.end_time,
    user_id: payment.booking_order.user_id,
    status: payment.checkin.status,
  }));

  const handleSaveCheckin = async (values) => {
    try {
      const data = {
        id: checkin,
        check_in_time: values.checkin_time.format("HH:mm:ss"),
        check_out_time: values.checkout_time.format("HH:mm:ss"),
        status: true,
        payment_id: selectPayment,
        user_id: selectUser,
        check_in_by_id: staffId,
      };

      await updateCheckin(data);
      notification.success({
        message: "Check-in thành công",
        description: "Đã checkin thành công.",
      });

      fetchPayments();

      setIsFormVisible(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <Typography.Title level={3}>Danh sách check-in</Typography.Title>
      </div>
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        open={isFormVisible}
        onCancel={() => setIsFormVisible(false)}
        footer={null}
        title="Check-in"
      >
        <CheckinForm handleSaveCheckin={handleSaveCheckin} form={form} />
      </Modal>
    </>
  );
}
