import { Button, Card, Col, Divider, List, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
const { Text } = Typography;

const orderItems = [
  { name: "Sân cầu lông...", price: "40.000 đ", quantity: 1 },
  { name: "Sân cầu lông...", price: "40.000 đ", quantity: 1 },
  { name: "Sân cầu lông...", price: "40.000 đ", quantity: 1 },
];

const totalAmount = "0.000 đ";
export default function CartReport() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <Card
      title="ĐƠN HÀNG"
      bordered={false}
      style={{ width: "26rem", margin: "0 auto", textAlign: "center" }}
    >
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item>
            <Text strong>x1 {item.name}</Text>
            <Text>{item.price || "0.000 đ"}</Text>
          </List.Item>
        )}
      />
      <Divider style={{ border: "1px solid black" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text strong>Tổng :</Text>
        <Text strong style={{ color: "red" }}>
          {totalAmount}
        </Text>
      </div>
      <Button type="primary" block style={{ marginTop: 16 }}>
        Thanh toán
      </Button>
    </Card>
  );
}
