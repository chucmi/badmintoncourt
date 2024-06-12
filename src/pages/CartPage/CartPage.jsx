import { Col, Row } from "antd";
import React from "react";
import CartItem from "../../components/CartItem/CartItem";
import CartReport from "../../components/CartReport/CartReport";
import Title from "antd/es/typography/Title";

const items = [
  {
    name: "Sân cầu lông Nhật Thiện, Thủ Đức, HCM",
    price: "40.000",
    quantity: 1,
    image: "path_to_image",
  },
  {
    name: "Sân cầu lông Nhật Thiện, Thủ Đức, HCM",
    price: "40.000",
    quantity: 1,
    image: "path_to_image",
  },
  {
    name: "Sân cầu lông Nhật Thiện, Thủ Đức, HCM",
    price: "40.000",
    quantity: 1,
    image: "path_to_image",
  },
];

export default function CartPage() {
  return (
    <>
      <Row>
        <Col span={2} />

        <Col span={11}>
          <Row className="border-b-2 border-black">
            <Col>
              <Title level={3}>GIỎ HÀNG</Title>
            </Col>
            <Col span={15} />
            <Col>
              <Title level={4}>4 sản phẩm</Title>
            </Col>
          </Row>

          {items.map((item, index) => (
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
