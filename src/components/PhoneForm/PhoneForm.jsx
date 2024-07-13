import { Button, Form, Input } from "antd";
import React from "react";

export default function PhoneForm({ form, handleSavePhone }) {
  return (
    <Form form={form} layout="vertical" onFinish={handleSavePhone}>
      <Form.Item
        name="telephone"
        label="Phone"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input type="text" placeholder="Enter phone" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Phone
        </Button>
      </Form.Item>
    </Form>
  );
}
