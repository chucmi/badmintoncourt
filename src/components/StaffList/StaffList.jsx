import { Button, Table, Modal, Avatar, Tag, notification, Form } from "antd";
import React, { useEffect, useState } from "react";
import UserForm from "../UserForm/UserForm";
import { createUser, getAllStaffs, toggleStatus } from "../../services/userAPI";
import { EditOutlined } from "@mui/icons-material";
import { FaUser } from "react-icons/fa";

export default function StaffList() {
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const manager_id = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  ).id;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);

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
    notification.info({
      message: "Đang tạo nhân viên...",
    });
    await createUser(datas);
    setIsUserModalVisible(false);
    notification.success({
      message: "Tạo nhân viên thành công",
      description: "Nhân viên đã được tạo thành công.",
    });
    form.resetFields();
  };

  const handleToggle = async (id) => {
    try {
      setLoading(true);
      const response = await toggleStatus(id);
      notification.success({
        message: "Thay đổi trang thái thành công",
        description: "Thay đổi trang thái thành công.",
      });
      setLoading(false);
      fetchStaffs();
      return response;
    } catch (error) {
      notification.error({
        message: error?.message || "Some thing wrong. Please try later!",
        description: "Thay đổi trang thái thất bại.",
      });
      throw error;
    }
  };

  const fetchStaffs = async () => {
    try {
      setListLoading(true);
      const data = await getAllStaffs(manager_id);
      if (data) {
        setStaffList(data);
        setListLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch staffs:", error);
    }
  };
  useEffect(() => {
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
      title: "Họ và Tên",
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
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => (gender ? "Male" : "Female"),
    },
    {
      title: "Ngày tháng năm sinh",
      dataIndex: "dob",
      key: "dob",
      render: (dob) => new Date(dob).toLocaleDateString(),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) =>
        record.status ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ), // Example status : Active, Inactive
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) =>
        record.status ? (
          <>
            <div className="flex justify-center gap-2">
              <Button
                loading={loading}
                type="primary"
                className="bg-red-400"
                onClick={() => handleToggle(record.id)}
              >
                Thu hồi
              </Button>
            </div>
          </>
        ) : (
          <Button
            type="primary"
            loading={loading}
            onClick={() => handleToggle(record.id)}
          >
            Duyệt
          </Button>
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
    status: staff.status,
  }));

  return (
    <>
      <div>
        <Button type="primary" onClick={() => setIsUserModalVisible(true)}>
          Thêm nhân viên
        </Button>
      </div>

      <div style={{ marginTop: 20 }}>
        <Table
          loading={listLoading}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
      </div>

      <Modal
        title="Tạo mới nhân viên"
        open={isUserModalVisible}
        onCancel={() => setIsUserModalVisible(false)}
        footer={null}
      >
        <UserForm onFinish={onFinish} form={form} />
      </Modal>
    </>
  );
}
