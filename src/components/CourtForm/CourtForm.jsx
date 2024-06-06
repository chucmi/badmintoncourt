import { Button, Form, Input, Select, TimePicker, Switch } from "antd";
import FormInput from "../FormInput/FormInput";

export default function CourtForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values:', values);
    // Perform your submit action here
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          status: false, // Default status to closed
        }}
      >
        <div className="font-bold text-2xl mb-4">Add Your Court</div>

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
            {/* Add your province options here */}
            <Select.Option value="1">Province 1</Select.Option>
            <Select.Option value="2">Province 2</Select.Option>
            {/* Add more options as needed */}
          </Select>
        </FormInput>

        <FormInput
          label="Description:"
          name="description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <Input.TextArea placeholder="Enter description" rows={4} />
        </FormInput>

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
                const openingTime = getFieldValue('openingTime');
                if (!value || !openingTime || value.isAfter(openingTime)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Closing time must be after opening time"));
              },
            }),
          ]}
        >
          <TimePicker format="HH:mm" />
        </FormInput>

        <FormInput
          label="Status:"
          name="status"
          valuePropName="checked"
        >
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