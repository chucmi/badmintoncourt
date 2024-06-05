import { Form } from "antd";

const FormInput = ({ label, name, rules, children }) => (
  <Form.Item label={label} name={name} rules={rules}>
    {children}
  </Form.Item>
);

export default FormInput;
