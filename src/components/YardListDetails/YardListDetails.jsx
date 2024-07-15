import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPaymentsOfYard } from "../../services/paymentAPI";
import { Button, Form, Modal, Table } from "antd";
import CheckinForm from "../CheckinForm/CheckinForm";

export default function YardListDetails() {
  const { yardid } = useParams();
  const [payments, setPayments] = useState([]);
  const [form] = Form.useForm();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [error, setError] = useState();
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
      render: () => (
        <Button type="primary" onClick={() => setIsFormVisible(true)}>
          Check-in
        </Button>
      ),
    },
  ];

  const dataSource = payments.map((payment) => ({
    id: payment.id,
    final_price: payment.final_price,
    booking_at: payment.booking_order.booking_at,
    status: payment.booking_order.status,
    tournament_start: payment.booking_order.tournament_start,
    tournament_end: payment.booking_order.tournament_end,
    start_time: payment.booking_order.slot.start_time,
    end_time: payment.booking_order.slot.end_time,
  }));

  const handleSaveCheckin = async (values) => {
    try {
      console.log(values);
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
