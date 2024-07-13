import React, { useState } from "react";
import { Row, Col, Button, Typography, Image, Select, Carousel } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice";
import NoDataImg from "../../assets/1.png";

const { Text } = Typography;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleRemove = () => {
    dispatch(removeFromCart({ id: item.id }));
  };

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
        <Button type="text" icon={<CloseOutlined />} onClick={handleRemove} />
      </Col>
      <Col span={4}>
        {item.images.length > 0 ? (
          <Carousel>
            {item.images.map((image, index) => (
              <Image
                key={index}
                src={image.image}
                alt={item.name}
                width={100}
                height={100}
              />
            ))}
          </Carousel>
        ) : (
          <Image src={NoDataImg} alt={item.name} width={100} height={100} />
        )}
      </Col>
      <Col span={6} style={{ textAlign: "center" }}>
        <Text strong>{item.name || "Không có dữ liệu"}</Text>
      </Col>
      <Col span={8} style={{ textAlign: "center" }}>
        <Row>
          <Text className="">
            Từ: {item.tournament_start} đến: {item.tournament_end}
          </Text>
        </Row>
        <Row>
          <Text className="">
            Lúc: {item.slot_start} tới: {item.slot_end}
          </Text>
        </Row>
      </Col>

      <Col span={4} style={{ textAlign: "center" }}>
        <Text className="text-red-600 font-semibold">
          {item.price.toLocaleString("vi-VN")}đ / ngày
        </Text>
      </Col>
    </Row>
  );
};

export default CartItem;
