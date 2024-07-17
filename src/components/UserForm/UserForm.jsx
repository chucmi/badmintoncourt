import { Button, Checkbox, Form, Input, Select } from "antd";
import FormInput from "../FormInput/FormInput";
import { useEffect, useState } from "react";
import { createUser } from "../../services/userAPI";

export default function UserForm({ user, onFinish, form }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect((user) => {
    form.setFieldsValue({
      gender: true,
    });
  }),
    [user];

  return (
    <>
      <div>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <FormInput
            label={"Họ:"}
            name={"first_name"}
            rules={[{ required: true, message: "Please enter the first name" }]}
          >
            <Input type="text" placeholder="Enter first name" />
          </FormInput>
          <FormInput
            label={"Tên:"}
            name={"last_name"}
            rules={[{ required: true, message: "Please enter the last name" }]}
          >
            <Input type="text" placeholder="Enter last name" />
          </FormInput>
          <FormInput
            label={"Email:"}
            name={"email"}
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input type="email" placeholder="Enter email" />
          </FormInput>
          <FormInput
            label={"Tên đăng nhập:"}
            name={"username"}
            rules={[{ required: true, message: "Please enter the username" }]}
          >
            <Input type="text" placeholder="Enter username" />
          </FormInput>
          {!user ? (
            <>
              <FormInput
                label={"Mật khẩu:"}
                name={"password"}
                rules={[
                  { required: true, message: "Please enter the password" },
                ]}
              >
                <Input.Password
                  placeholder="Enter password"
                  visibilityToggle={{ visible: showPassword }}
                />
              </FormInput>

              <FormInput>
                <Checkbox
                  checked={showPassword}
                  onClick={togglePasswordVisibility}
                >
                  Xem mật khẩu
                </Checkbox>
              </FormInput>
            </>
          ) : null}

          <FormInput
            label={"Giới tính:"}
            name={"gender"}
            rules={[{ required: true, message: "Please select the gender" }]}
          >
            <select className="w-full h-9 border-2 rounded-lg">
              <option value={true}>Nam</option>
              <option value={false}>Nữ</option>
              <option value={""}>Khác</option>
            </select>
          </FormInput>
          <FormInput
            label={"Ngày tháng năm sinh:"}
            name={"dob"}
            rules={[
              {
                required: true,
                message: "Please enter the day of birth",
              },
            ]}
          >
            <Input type="date" placeholder="Enter day of birth" />
          </FormInput>
          <FormInput>
            <Button type="primary" htmlType="submit">
              {user ? "Cập nhật" : "Tạo mới"}
            </Button>
          </FormInput>
        </Form>
      </div>
    </>
  );
}
