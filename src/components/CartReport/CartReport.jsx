import { Button, Card, Divider, List, Typography, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createBookingOrdersBulk } from "../../services/orderAPI";
import { useNavigate } from "react-router-dom";
import { clearCartPayment } from "../../redux/cartSlice";
const { Text } = Typography;

export default function CartReport() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      slot_id: item.slot_id,
      tourament_start: item.tournament_start,
      tourament_end: item.tournament_end,
    }));

    try {
      await createBookingOrdersBulk(orderItems);
      dispatch(clearCartPayment());
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const totalAmount =
    cartItems
      .reduce((total, item) => total + item.price * item.date_count, 0)
      .toLocaleString("vi-VN") + " đ";

  return (
    <Card
      title="ĐƠN HÀNG"
      bordered={false}
      style={{ width: "38rem", margin: "0 auto", textAlign: "center" }}
    >
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item>
            <Text strong>x1 {item.name}</Text>
            <Text className="font-semibold">
              {item.slot_start} - {item.slot_end}
            </Text>
            <Text className="font-bold">
              {item.price.toLocaleString("vi-VN") + " đ"}{" "}
              {"x " + item.date_count + "ngày"}
              {" = " +
                (item.price * item.date_count).toLocaleString("vi-VN") +
                " đ"}
            </Text>
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
