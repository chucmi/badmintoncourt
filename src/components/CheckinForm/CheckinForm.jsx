import { Button, DatePicker, Form, TimePicker } from "antd";
import React from "react";

export default function CheckinForm({ form, handleSaveCheckin }) {
  return (
    <>
      <Form form={form} layout="vertical" onFinish={handleSaveCheckin}>
        <Form.Item label="Checkin Time:" name={"checkin_time"}>
          <TimePicker format="HH:mm:ss" />
        </Form.Item>
        <Form.Item label="Checkout Time:" name={"checkout_time"}>
          <TimePicker format="HH:mm:ss" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Checkin
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
