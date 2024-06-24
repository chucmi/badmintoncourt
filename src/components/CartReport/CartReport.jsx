import { Button, Card, Divider, List, Typography, notification } from "antd";
import { useSelector } from "react-redux";
import { createBookingOrdersBulk } from "../../services/orderAPI";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;

const totalAmount = "0.000 đ";
export default function CartReport() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    userId = JSON.parse(atob(token.split(".")[1])).id;
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      notification.warning({
        message: "Giỏ hàng trống",
        description:
          "Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.",
      });
      return;
    }

    if (cartItems.length > 0 && token === null) {
      navigate("/login");
      return;
    }

    const orderItems = cartItems.map((item) => ({
      yard_id: item.id,
      user_id: userId,
    }));

    try {
      await createBookingOrdersBulk(orderItems);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

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
      <Button
        type="primary"
        block
        style={{ marginTop: 16 }}
        onClick={handleCheckout}
      >
        Thanh toán
      </Button>
    </Card>
  );
}
