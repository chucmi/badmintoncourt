import {
  Button,
  Form,
  Input,
  Select,
  TimePicker,
  Switch,
  notification,
} from "antd";
import { useState, useEffect } from "react";
import FormInput from "../FormInput/FormInput";
import { getProvinces } from "../../services/provinceAPI";
import { createYard } from "../../services/yardAPI";

export default function CourtForm() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const formatTime = (time) => time.format("HH:mm:ss");

    const data = {
      name: values.courtName,
      address: values.address,
      description: values.description,
      province_id: parseInt(values.province_id),
      status: false,
      open_time: formatTime(values.openingTime),
      close_time: formatTime(values.closingTime),
      host_id: JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id,
    };

    try {
      await createYard(data);
      notification.success({
        message: "Tạo sân thành công",
        description: "Sân của bạn đã được tạo thành công.",
      });
    } catch (error) {
      notification.error({
        message: error?.message || "Some thing wrong. Please try later!",
      });
    }
  };

  const [provinces, setProvinces] = useState([]);
  const fetchProvinces = async () => {
    const data = await getProvinces();
    if (data) {
      setProvinces(data);
    }
  };
  useEffect(() => {
    fetchProvinces();
  }, []);

  return (
    <>
      <div className="font-bold text-2xl mb-4 text-center mt-6">
        Đăng ký sân mới
      </div>
      <Form
        className="mx-44"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          status: false, // Default status to closed
        }}
      >
        <FormInput
          label="Tên sân:"
          name="courtName"
          rules={[{ required: true, message: "Vui lòng nhập tên sân" }]}
        >
          <Input placeholder="Nhập tên sân" />
        </FormInput>

        <FormInput
          label="Địa chỉ:"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input placeholder="Nhập địa chỉ" />
        </FormInput>

        <FormInput
          label="Tỉnh:"
          name="province_id"
          rules={[{ required: true, message: "Vui lòng chọn tỉnh thành" }]}
        >
          <Select placeholder="Chọn tỉnh thành">
            {provinces.map((province) => (
              <Select.Option
                key={province.province_id}
                value={province.province_id}
              >
                {province.province_name}
              </Select.Option>
            ))}
          </Select>
        </FormInput>

        <FormInput
          label="Mô tả:"
          name="description"
          rules={[{ required: true, message: "Vui lòng thêm mô tả sân" }]}
        >
          <Input.TextArea placeholder="Nhập mô tả" rows={4} />
        </FormInput>

        <div className="flex">
          <FormInput
            label="Giờ mở cửa:"
            name="openingTime"
            rules={[
              { required: true, message: "Vui lòng chọn giờ mở cửa" },
              {
                validator: (_, value) =>
                  value && value.isValid()
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Vui lòng chọn thời gian phù hợp")
                      ),
              },
            ]}
          >
            <TimePicker format="HH:mm" />
          </FormInput>

          <div className="w-8" />

          <FormInput
            label="Giờ đóng cửa:"
            name="closingTime"
            rules={[
              { required: true, message: "Vui lòng chọn thời gian đóng cửa" },
              {
                validator: (_, value) =>
                  value && value.isValid()
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Vui lòng chọn thời gian phù hợp")
                      ),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const openingTime = getFieldValue("openingTime");
                  if (!value || !openingTime || value.isAfter(openingTime)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Thời gian đóng cửa phải hơn thời gian mở cửa")
                  );
                },
              }),
            ]}
          >
            <TimePicker format="HH:mm" />
          </FormInput>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tạo sân
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
