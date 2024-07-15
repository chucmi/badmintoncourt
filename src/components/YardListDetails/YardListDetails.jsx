import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPaymentsOfYard } from "../../services/paymentAPI";
import { Button, Form, Modal, notification, Table } from "antd";
import CheckinForm from "../CheckinForm/CheckinForm";
import moment from "moment";
import { updateCheckin } from "../../services/checkinAPI";

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
      title: "Final Price",
      dataIndex: "final_price",
      key: "final_price",
    },
    {
      title: "Booking At",
      dataIndex: "booking_at",
      key: "booking_at",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Tournament Start",
      dataIndex: "tournament_start",
      key: "tournament_start",
    },
    {
      title: "Tournament End",
      dataIndex: "tournament_end",
      key: "tournament_end",
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
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
      ),
    },
  ];

  const dataSource = payments.map((payment) => ({
    id: payment.id,
    checkin_id: payment.checkin.id,
    final_price: payment.final_price,
    booking_at: payment.booking_order.booking_at,
    status: payment.booking_order.status,
    tournament_start: payment.booking_order.tournament_start,
    tournament_end: payment.booking_order.tournament_end,
    start_time: payment.booking_order.slot.start_time,
    end_time: payment.booking_order.slot.end_time,
    user_id: payment.booking_order.user_id,
  }));

  const handleSaveCheckin = async (values) => {
    try {
      const data = {
        id: checkin,
        checkin_time: values.checkin_time.format("HH:mm:ss"),
        checkout_time: values.checkout_time.format("HH:mm:ss"),
        status: true,
        payment_id: selectPayment,
        user_id: selectUser,
        check_in_by_id: staffId,
      };

      await updateCheckin(data);
      notification.success({
        message: "Check-in successfully",
        description: "The check-in has been successfully.",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>YardListDetails</div>
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
