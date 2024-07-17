import React, { useEffect, useState } from "react";
import { getFeedbacks } from "../../services/feedbackAPI";
import { Rate, Table } from "antd";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  //   [
  //     {
  //       "id": 2,
  //       "rating": 3.5,
  //       "problem": "test",
  //       "create_at": null,
  //       "create_date": "2024-07-12",
  //       "update_date": null,
  //       "create_by": 13,
  //       "update_by": null,
  //       "payment_id": 33,
  //       "user_id": 13,
  //       "yard_id": 2,
  //       "yard_name": "Sân Cầu Lông Tét",
  //       "yard_host_id": 3,
  //       "yard_status": true
  //     }
  //   ]

  const fetchFeedbacks = async () => {
    setLoading(true); // Start loading
    try {
      const data = await getFeedbacks();
      if (data) {
        setFeedbacks(data);
      }
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const data = feedbacks.map((feedback) => ({
    key: feedback.id,
    id: feedback.id,
    rating: feedback.rating,
    problem: feedback.problem,
    create_date: feedback.create_date,
    yard_name: feedback.yard_name,
    yard_id: feedback.yard_id,
    user_id: feedback.user_id,
    payment_id: feedback.payment_id,
  }));

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Điểm dánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (_, record) => (
        <>
          <div className="flex items-center gap-2">
            <Rate allowHalf defaultValue={record.rating} disabled />
            {record.rating}
          </div>
        </>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "problem",
      key: "problem",
    },
    {
      title: "Ngày gửi",
      dataIndex: "create_date",
      key: "create_date",
    },
    {
      title: "Sân",
      dataIndex: "yard_name",
      key: "yard_name",
    },
  ];

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-4 text-center">
          Danh sách phản hồi
        </h1>
      </div>
      <div className="flex justify-center ">
        <div className="container">
          <Table
            loading={loading}
            dataSource={data}
            columns={columns}
            pagination={false}
          />
        </div>
      </div>
    </>
  );
}
