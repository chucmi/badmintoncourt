import { Button, Form, Input, notification } from "antd";
import React, { useEffect, useState } from "react";
import FormInput from "../FormInput/FormInput";
import { getUser, updateUser } from "../../services/userAPI";

export default function UserProfile() {
  const [form] = Form.useForm();
  const [user, setUser] = useState({});
  const userId = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  ).id;

  const fetchUser = async () => {
    try {
      const data = await getUser(userId);
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    form.setFieldsValue({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      gender: user.gender,
      dob: user.dob,
    });
  }, [user, form]);

  const handleSave = async (values) => {
    console.log(values);
    const data = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      gender: values.gender,
      dob: values.dob,
    };
    await updateUser(data, userId);
    notification.success({
      message: "Cập nhật thành công",
      description: "Thông tin người dùng đã được cập nhật.",
    });
  };

  return (
    <>
      <div className="container mx-auto p-12 h-2/4 w-2/4">
        <Form form={form} onFinish={handleSave}>
          <FormInput label={"First Name:"} name={"first_name"}>
            <Input type="text" placeholder="Enter first name" />
          </FormInput>
          <FormInput label={"Last Name:"} name={"last_name"}>
            <Input type="text" placeholder="Enter last name" />
          </FormInput>
          <FormInput label={"Email:"} name={"email"}>
            <input
              className="w-full h-9 border-2 rounded-lg"
              type="email"
              placeholder="  Enter email"
            />
          </FormInput>
          <FormInput label={"Gender:"} name={"gender"}>
            <select className="w-full h-9 border-2 rounded-lg">
              <option value={true}>Male</option>
              <option value={false}>Female</option>
              <option value={""}>Other</option>
            </select>
          </FormInput>
          <FormInput label={"Day of Birth:"} name={"dob"}>
            <Input type="date" placeholder="Enter day of birth" />
          </FormInput>
          <FormInput>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </FormInput>
        </Form>
      </div>
    </>
  );
}
