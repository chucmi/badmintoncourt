import { DatePicker, Form } from "antd";
import React from "react";

export default function CheckinForm({ form, handleSaveCheckin }) {
  return (
    <>
      <Form form={form} layout="vertical" onFinish={handleSaveCheckin}>
        <Form.Item label="Checkin Time:" name={"checkin_time"}>
          <DatePicker type="time" />
        </Form.Item>
        <Form.Item label="Checkout Time:" name={"checkout_time"}>
          <DatePicker type="time" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
