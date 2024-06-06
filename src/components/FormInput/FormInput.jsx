import { Form } from "antd";

const FormInput = ({ label, name, rules, children, valuePropName }) => (
  <Form.Item label={label} name={name} rules={rules} valuePropName={valuePropName}>
    {children}
  </Form.Item>
);

export default FormInput;
