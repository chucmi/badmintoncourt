import React from "react";
import { Col, Row, Button, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/CartItem/CartItem";
import CartReport from "../../components/CartReport/CartReport";
import { clearCart } from "../../redux/cartSlice"; // Import the actions

const { Title } = Typography;

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Row className="py-10">
        <Col span={2} />
        <Col span={11}>
          <Row className="border-b-2 border-black">
            <Col>
              <Title level={3}>GIỎ HÀNG</Title>
            </Col>
            <Col span={15} />
            <Col>
              <Title level={4}>{cartItems.length} sản phẩm</Title>
            </Col>
            <Col className="pl-5">
              <Button type="primary" danger onClick={handleClearCart}>
                Xoá hết
              </Button>
            </Col>
          </Row>
          {cartItems.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </Col>
        <Col span={2} />
        <Col span={7}>
          <CartReport />
        </Col>
      </Row>
    </>
  );
}
