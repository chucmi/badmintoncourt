import { Button, Table, Modal, Avatar, Tag, notification, Form } from "antd";
import React, { useEffect, useState } from "react";
import UserForm from "../UserForm/UserForm";
import { createUser, getAllStaffs } from "../../services/userAPI";
import { EditOutlined } from "@mui/icons-material";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function OwnerList() {
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const datas = {
      username: values.username,
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      password: values.password,
      dob: values.dob,
      gender: values.gender,
      role_id: 4,
      manager_id: 1,
    };
    await createUser(datas);
    setIsUserModalVisible(false);
    notification.success({
      message: "Tạo chủ sân thành công",
      description: "Chủ sân đã được tạo thành công.",
    });
    form.resetFields();
  };

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const data = await getAllStaffs(1);
        if (data) {
          setStaffList(data);
        }
      } catch (error) {
        console.error("Failed to fetch staffs:", error);
      }
    };
    fetchStaffs();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => `#${text}`,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <>
          <Avatar
            style={{ backgroundColor: "#87d068", marginRight: 8 }}
            icon={<FaUser />}
          />
          {`${record.first_name} ${record.last_name}`}
        </>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => (gender ? "Male" : "Female"),
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
      render: (dob) => new Date(dob).toLocaleDateString(),
    },
    {
      title: "Status",
      key: "status",
      render: () => <Tag color="green">Active</Tag>, // Example status : Active, Inactive
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          onClick={() => navigate("/listcourt/" + record.id)}
          icon={<EditOutlined />}
        />
      ),
    },
  ];

  const dataSource = staffList.map((staff) => ({
    key: staff.id,
    id: staff.id,
    username: staff.username,
    email: staff.email,
    gender: staff.gender,
    dob: staff.dob,
    first_name: staff.first_name,
    last_name: staff.last_name,
  }));

  return (
    <>
      <div>
        <Button type="primary" onClick={() => setIsUserModalVisible(true)}>
          Create Owner
        </Button>
      </div>

      <div style={{ marginTop: 20 }}>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </div>

      <Modal
        title="Create New Owner"
        open={isUserModalVisible}
        onCancel={() => setIsUserModalVisible(false)}
        footer={null}
      >
        <UserForm onFinish={onFinish} form={form} />
      </Modal>
    </>
  );
}
