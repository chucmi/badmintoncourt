import { Button, Table, Modal, Avatar, Tag, notification, Form } from "antd";
import React, { useEffect, useState } from "react";
import UserForm from "../UserForm/UserForm";
import { createUser, getAllStaffs } from "../../services/userAPI";
import { EditOutlined} from "@mui/icons-material";
import { FaUser } from "react-icons/fa";

export default function StaffList() {
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const manager_id = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  ).id;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const datas = {
      username: values.username,
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      password: values.password,
      dob: values.dob,
      gender: values.gender,
      role_id: 3,
      manager_id: manager_id,
    };
    await createUser(datas);
    setIsUserModalVisible(false);
    notification.success({
      message: "Tạo nhân viên thành công",
      description: "Nhân viên đã được tạo thành công.",
    });
    form.resetFields();
  };

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const data = await getAllStaffs(manager_id);
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
      render: () => <Button icon={<EditOutlined />} />,
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
          Create Staff
        </Button>
      </div>

      <div style={{ marginTop: 20 }}>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </div>

      <Modal
        title="Create New Staff"
        open={isUserModalVisible}
        onCancel={() => setIsUserModalVisible(false)}
        footer={null}
      >
        <UserForm onFinish={onFinish} form={form} />
      </Modal>
    </>
  );
}
