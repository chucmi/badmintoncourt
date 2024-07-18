import { Button, Table, Modal, Avatar, Tag, notification, Form } from "antd";
import React, { useEffect, useState } from "react";
import UserForm from "../UserForm/UserForm";
import {
  createUser,
  getAllStaffs,
  toggleStatus,
  updateProfile,
  updateUser,
} from "../../services/userAPI";
import { EditOutlined } from "@mui/icons-material";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { mdiBadminton } from "@mdi/js";
import Icon from "@mdi/react";
import { formatDate } from "../../utils/time";
import { data } from "autoprefixer";

export default function OwnerList() {
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [selectUser, setSelectUser] = useState(null);

  const onFinish = async (values) => {
    try {
      if (selectUser) {
        const datas = {
          user_name: values.username,
          email: values.email,
          first_name: values.first_name,
          last_name: values.last_name,
          dob: values.dob,
          gender: values.gender === "" ? null : values.gender,
        };
        await updateProfile(datas, selectUser.id);
        setIsUserModalVisible(false);
        notification.success({
          message: "Cập nhật chủ sân thành công",
          description: "Chủ sân đã được cập nhật thành công.",
        });
        form.resetFields();
        fetchStaffs();
      } else {
        const datas = {
          username: values.username,
          email: values.email,
          first_name: values.first_name,
          last_name: values.last_name,
          password: values.password,
          dob: values.dob,
          gender: values.gender === "" ? null : values.gender,
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
        fetchStaffs();
      }
    } catch (error) {
      notification.error({
        message: error?.message || "Some thing wrong. Please try later!",
        description: "Đã xảy ra lỗi vui lòng thử lại sau.",
      });
    }
  };

  const fetchStaffs = async () => {
    try {
      setListLoading(true);
      const data = await getAllStaffs(1);
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
      title: "Tên",
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
      render: (gender) =>
        gender === null ? "Chưa xác định" : gender ? "Nam" : "Nữ",
    },
    {
      title: "Ngày tháng năm sinh",
      dataIndex: "dob",
      key: "dob",
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
                className="flex justify-center gap-2"
                onClick={() => navigate("/listcourt/" + record.id)}
                icon={<Icon path={mdiBadminton} size={1} />}
              >
                Xem sân
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setSelectUser(record);
                  setIsUserModalVisible(true);
                }}
                icon={<EditOutlined />}
              >
                Chỉnh sửa
              </Button>
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
          <>
            <div className="flex justify-center gap-2">
              <Button
                type="primary"
                onClick={() => {
                  setSelectUser(record);
                  setIsUserModalVisible(true);
                }}
                icon={<EditOutlined />}
              >
                Chỉnh sửa
              </Button>
              <Button
                loading={loading}
                type="primary"
                onClick={() => handleToggle(record.id)}
              >
                Duyệt
              </Button>
            </div>
          </>
        ),
    },
  ];

  const dataSource = staffList.map((staff) => ({
    key: staff.id,
    id: staff.id,
    username: staff.username,
    email: staff.email,
    gender: staff.gender,
    dob: formatDate(new Date(staff.dob)),
    first_name: staff.first_name,
    last_name: staff.last_name,
    status: staff.status,
  }));

  const handleToggle = async (id) => {
    try {
      setLoading(true);
      const response = await toggleStatus(id);
      notification.success({
        message: "Thay đổi trang thái thành công",
        description: "Thay đổi trang thái thành công.",
      });
      fetchStaffs();
      return response;
    } catch (error) {
      notification.error({
        message: error?.message || "Some thing wrong. Please try later!",
        description: "Thay đổi trang thái thất bại.",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Button
          type="primary"
          onClick={() => {
            form.resetFields();
            setSelectUser(null);
            setIsUserModalVisible(true);
          }}
        >
          Tạo mới chủ sân
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
        title={selectUser ? "Chỉnh sửa" : "Tạo chủ sân"}
        open={isUserModalVisible}
        onCancel={() => setIsUserModalVisible(false)}
        footer={null}
      >
        <UserForm onFinish={onFinish} form={form} user={selectUser} />
      </Modal>
    </>
  );
}
