import React from "react";
import { Row, Col, InputNumber, Button, Typography, Image } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import NoDataImg from "../../assets/nodata.png";

const { Text } = Typography;

const CartItem = ({ item }) => {
  return (
    <Row
      gutter={[16, 16]}
      align="middle"
      style={{
        borderBottom: "2px solid #000",
        padding: "16px",
        position: "relative",
      }}
    >
      <Col style={{ position: "absolute", top: "8px", right: "8px" }}>
        <Button type="text" icon={<CloseOutlined />} />
      </Col>
      <Col span={6}>
        <Image
          width={100}
          height={100}
          src={item.image || NoDataImg}
          alt={item.name || "No Data"}
          style={{ border: "2px solid #000" }}
        />
      </Col>
      <Col span={10} style={{ textAlign: "center" }}>
        <Text strong>{item.name || "No Data"}</Text>
      </Col>
      <Col span={4} style={{ textAlign: "center" }}>
        <InputNumber min={1} defaultValue={item.quantity} />
      </Col>
      <Col span={4} style={{ textAlign: "center" }}>
        <Text>{item.price} đ</Text>
      </Col>
    </Row>
  );
};

export default CartItem;
