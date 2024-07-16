import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPaymentsOfYard } from "../../services/paymentAPI";
import { Button, Form, Modal, notification, Table, Typography } from "antd";
import CheckinForm from "../CheckinForm/CheckinForm";
import moment from "moment";
import { updateCheckin } from "../../services/checkinAPI";
import { formatDateTime } from "../../utils/time";

export default function YardListDetailsOwner() {
  const { yardid } = useParams();
  const [payments, setPayments] = useState([]);

  //   [
  //     {
  //       "id": 32,
  //       "final_price": 6000000,
  //       "booking_order": {
  //         "id": 15,
  //         "booking_at": "2024-07-12T14:26:40.802594",
  //         "status": true,
  //         "yard": {
  //           "id": 1,
  //           "name": "Sân Vip số 1 Sài Gòn",
  //           "address": "HCM",
  //           "province_id": 79,
  //           "description": "Sân cầu lông số 1 HCM",
  //           "status": true,
  //           "open_time": "07:00:00",
  //           "close_time": "22:00:00",
  //           "create_date": null,
  //           "update_date": null,
  //           "create_by": 3,
  //           "update_by": 1,
  //           "host_id": null
  //         },
  //         "user_id": 13,
  //         "slot": {
  //           "id": 5,
  //           "price": 60000,
  //           "status": "true",
  //           "start_time": "07:00:00",
  //           "end_time": "08:00:00",
  //           "create_date": "2024-06-17",
  //           "update_date": null,
  //           "create_by": 3,
  //           "update_by": null
  //         },
  //         "tournament_start": "2024-07-12",
  //         "tournament_end": "2024-07-12"
  //       },
  //       "istournament": true
  //     }
  //   ]

  const fetchPayments = async () => {
    try {
      const data = await getPaymentsOfYard(yardid);
      setPayments(data);
    } catch (err) {
      console.log(err);
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
      title: "Ngày bắt đầu",
      dataIndex: "tournament_start",
      key: "tournament_start",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "tournament_end",
      key: "tournament_end",
    },
    {
      title: "Giờ bắt đầu",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "Giờ kết thúc",
      dataIndex: "end_time",
      key: "end_time",
    },
    {
      title: "",
      key: "action",
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
  }));

  return (
    <>
      <div>
        <Typography.Title level={3}>
          Danh sách thanh toán của sân
        </Typography.Title>
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
}
