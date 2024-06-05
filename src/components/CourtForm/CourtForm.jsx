import { Button, Form, Input } from "antd";
import FormInput from "../FormInput/FormInput";

export default function CourtForm() {
  return (
    <>
      <Form>
        <div className="font-bold text-2xl">Add Your Court</div>
        <FormInput
          label={"Court Name:"}
          name={"Court Name"}
          rules={[{ required: true }]}
        >
          <Input />
        </FormInput>

        <FormInput>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormInput>
      </Form>
    </>
  );
}
