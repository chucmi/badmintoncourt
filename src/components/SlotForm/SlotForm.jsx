import { Button, Form, Input, Switch, TimePicker } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

export default function SlotForm({ form, handleSaveSlot, slot }) {
  useEffect(() => {
    if (slot) {
      form.setFieldsValue({
        price: slot.price,
        status: slot.status === "true" ? true : false,
        start_time: dayjs(slot.start_time, "HH:mm:ss"),
        end_time: dayjs(slot.end_time, "HH:mm:ss"),
      });
    }
  }, [form, slot]);
  return (
    <Form form={form} layout="vertical" onFinish={handleSaveSlot}>
      <Form.Item
        label="Price:"
        name="price"
        rules={[{ required: true, message: "Please enter the price" }]}
      >
        <Input type="number" placeholder="Enter price" />
      </Form.Item>
      <Form.Item label="Status:" name="status" valuePropName="checked">
        <Switch checkedChildren="Open" unCheckedChildren="Closed" />
      </Form.Item>
      <Form.Item
        label="Start Time:"
        name="start_time"
        rules={[{ required: true, message: "Please select the start time" }]}
      >
        <TimePicker format="HH:mm" />
      </Form.Item>
      <Form.Item
        label="End Time:"
        name="end_time"
        rules={[
          { required: true, message: "Please select the end time" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const startTime = getFieldValue("start_time");
              if (!value || !startTime || value.isAfter(startTime)) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("End time must be after start time")
              );
            },
          }),
        ]}
      >
        <TimePicker format="HH:mm" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {slot ? "Update Slot" : "Create Slot"}
        </Button>
      </Form.Item>
    </Form>
  );
}
