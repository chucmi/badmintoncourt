import { Button, Form, Input, Rate } from "antd";
import React from "react";

export default function FeedbackForm({ form, handleSaveFeedback }) {
  return (
    <Form form={form} layout="vertical" onFinish={handleSaveFeedback}>
      <Form.Item
        label="Feedback:"
        name="problem"
        rules={[{ required: true, message: "Please enter the feedback" }]}
      >
        <Input type="text" placeholder="Enter feedback" />
      </Form.Item>
      <Form.Item label="Rating:" name="rating" initialValue={2.5}>
        <Rate allowHalf />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
