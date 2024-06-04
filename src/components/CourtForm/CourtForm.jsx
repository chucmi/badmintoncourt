import { Form, Input } from "antd";
import FormInput from "../FormInput/FormInput";

export default function CourtForm() {
  return (
    <>
      <Form>
        <FormInput
          label={"Court Name"}
          name={"courtName"}
          rules={[{ required: true }]}
        >
          <Input />
        </FormInput>
      </Form>
    </>
  );
}
