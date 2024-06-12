import { Button, Card, Col, Divider, List, Row, Typography } from "antd";
const { Text } = Typography;

const orderItems = [
  { name: "Sản cầu lông...", price: "40.000 đ", quantity: 1 },
  { name: "Sản cầu lông...", price: "40.000 đ", quantity: 1 },
  { name: "Sản cầu lông...", price: "40.000 đ", quantity: 1 },
];

const totalAmount = "120.000 đ";
export default function CartReport() {
  return (
    <Card
      title="ĐƠN HÀNG"
      bordered={false}
      style={{ width: "26rem", margin: "0 auto", textAlign: "center" }}
    >
      <List
        itemLayout="horizontal"
        dataSource={orderItems}
        renderItem={(item) => (
          <List.Item>
            <Text strong>
              x{item.quantity} {item.name}
            </Text>
            <Text>{item.price}</Text>
          </List.Item>
        )}
      />
      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text strong>Tổng :</Text>
        <Text strong  style={{color: "red"}}>{totalAmount}</Text>
      </div>
      <Button type="primary" block style={{ marginTop: 16 }}>
        Thanh toán
      </Button>
    </Card>
  );
}
