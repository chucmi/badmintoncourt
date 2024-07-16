import { Button, Table, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getOwnerYards } from "../../services/yardAPI";
import { useNavigate } from "react-router-dom";

export default function YardListStaff() {
  const [yards, setYards] = useState([]);
  const manager_id = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  ).manager_id;

  const navigate = useNavigate();
  // [
  //     {
  //         "id": 12,
  //         "name": "TestABC",
  //         "address": "TestABC",
  //         "province_id": 75,
  //         "description": "TestABC",
  //         "status": true,
  //         "open_time": "07:00:52",
  //         "close_time": "11:00:00",
  //         "create_date": null,
  //         "update_date": null,
  //         "create_by": 15,
  //         "update_by": null,
  //         "host_id": 15,
  //         "telephones": [],
  //         "slots": [
  //           {
  //             "id": 13,
  //             "price": 100000,
  //             "status": "true",
  //             "start_time": "07:00:00",
  //             "end_time": "08:00:00",
  //             "create_date": "2024-07-13",
  //             "update_date": null,
  //             "create_by": 15,
  //             "update_by": null
  //           },
  //           {
  //             "id": 14,
  //             "price": 10000,
  //             "status": "true",
  //             "start_time": "09:00:00",
  //             "end_time": "10:00:00",
  //             "create_date": "2024-07-13",
  //             "update_date": null,
  //             "create_by": 15,
  //             "update_by": null
  //           }
  //         ],
  //         "images": []
  //       },
  //       {
  //         "id": 13,
  //         "name": "TestABC23",
  //         "address": "TestABC23",
  //         "province_id": 79,
  //         "description": "TestABC11",
  //         "status": true,
  //         "open_time": "07:00:52",
  //         "close_time": "11:00:00",
  //         "create_date": null,
  //         "update_date": null,
  //         "create_by": 15,
  //         "update_by": null,
  //         "host_id": 15,
  //         "telephones": [],
  //         "slots": [],
  //         "images": []
  //       }

  // ]

  const fetchYards = async () => {
    try {
      const response = await getOwnerYards(manager_id);
      setYards(response);
    } catch (error) {
      console.error("Error fetching yards:", error);
    }
  };

  useEffect(() => {
    fetchYards();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên sân",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) =>
        record.status === true ? (
          <Tag color="green">Đang hoat động</Tag>
        ) : (
          <Tag color="red">Ngừng hoat động</Tag>
        ),
    },
    {
      title: "Giờ mở cửa",
      dataIndex: "open_time",
      key: "open_time",
    },
    {
      title: "Giờ đóng cửa",
      dataIndex: "close_time",
      key: "close_time",
    },
    {
      title: "Checkin",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => navigate(`/yards/${record.id}`)}>
          Xem Checkin
        </Button>
      ),
    },
  ];

  const dataSource = yards.map((yard) => ({
    id: yard.id,
    key: yard.id,
    name: yard.name,
    status: yard.status,
    open_time: yard.open_time,
    close_time: yard.close_time,
  }));

  return (
    <>
      <div>
        <Typography.Title level={3}>Danh sách sân</Typography.Title>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
}
