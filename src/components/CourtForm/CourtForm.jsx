import { Button, Form, Input, Select, TimePicker, Switch } from "antd";
import { useState, useEffect } from "react";
import FormInput from "../FormInput/FormInput";
import { getProvinces } from "../../services/provinceAPI";

export default function CourtForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values:", values);
    // Perform your submit action here
  };

  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      const data = await getProvinces();
      if (data) {
        setProvinces(data);
      }
    };
    fetchProvinces();
  }, []);

  return (
    <>
      <div className="font-bold text-2xl mb-4 text-center mt-6">
        Add Your Court
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
          label="Court Name:"
          name="courtName"
          rules={[{ required: true, message: "Please enter the court name" }]}
        >
          <Input placeholder="Enter court name" />
        </FormInput>

        <FormInput
          label="Address:"
          name="address"
          rules={[{ required: true, message: "Please enter the address" }]}
        >
          <Input placeholder="Enter address" />
        </FormInput>

        <FormInput
          label="Province:"
          name="province_id"
          rules={[{ required: true, message: "Please select the province" }]}
        >
          <Select placeholder="Select province">
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
          label="Description:"
          name="description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <Input.TextArea placeholder="Enter description" rows={4} />
        </FormInput>

        <div className="flex">
          <FormInput
            label="Opening Time:"
            name="openingTime"
            rules={[
              { required: true, message: "Please select the opening time" },
              {
                validator: (_, value) =>
                  value && value.isValid()
                    ? Promise.resolve()
                    : Promise.reject(new Error("Please select a valid time")),
              },
            ]}
          >
            <TimePicker format="HH:mm" />
          </FormInput>

          <div className="w-8" />

          <FormInput
            label="Closing Time:"
            name="closingTime"
            rules={[
              { required: true, message: "Please select the closing time" },
              {
                validator: (_, value) =>
                  value && value.isValid()
                    ? Promise.resolve()
                    : Promise.reject(new Error("Please select a valid time")),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const openingTime = getFieldValue("openingTime");
                  if (!value || !openingTime || value.isAfter(openingTime)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Closing time must be after opening time")
                  );
                },
              }),
            ]}
          >
            <TimePicker format="HH:mm" />
          </FormInput>
        </div>

        <FormInput label="Status:" name="status" valuePropName="checked">
          <Switch checkedChildren="Open" unCheckedChildren="Closed" />
        </FormInput>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
