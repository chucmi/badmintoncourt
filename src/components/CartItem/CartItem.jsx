// import React from "react";
// import { Row, Col, InputNumber, Button, Typography, Image, Select } from "antd";
// import { CloseOutlined } from "@ant-design/icons";
// import NoDataImg from "../../assets/nodata.png";

// const { Text } = Typography;

// const CartItem = ({ item }) => {
//   return (
//     <Row
//       gutter={[16, 16]}
//       align="middle"
//       style={{
//         borderBottom: "2px solid #000",
//         padding: "16px",
//         position: "relative",
//       }}
//     >
//       <Col style={{ position: "absolute", top: "8px", right: "8px" }}>
//         <Button type="text" icon={<CloseOutlined />} />
//       </Col>
//       <Col span={6}>
//         <Image
//           width={100}
//           height={100}
//           src={item.image || NoDataImg}
//           alt={item.name || "No Data"}
//           style={{ border: "2px solid #000" }}
//         />
//       </Col>
//       <Col span={10} style={{ textAlign: "center" }}>
//         <Text strong>{item.name || "No Data"}</Text>
//       </Col>
//       <Select>
//         {item.slots.map((slot) => (
//           <Select.Option value={slot.id}>{slot.value}</Select.Option>
//         ))}
//       </Select>
//       <Col span={4} style={{ textAlign: "center" }}>
//         <Text>{item.price} đ</Text>
//       </Col>
//     </Row>
//   );
// };

// export default CartItem;
import React, { useState } from "react";
import { Row, Col, InputNumber, Button, Typography, Image, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import NoDataImg from "../../assets/nodata.png";

const { Text } = Typography;

const CartItem = ({ item }) => {
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  const selectedSlot = item.slots.find((slot) => slot.id === selectedSlotId);

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
      <Select
        value={selectedSlotId}
        onChange={(value) => setSelectedSlotId(value)}
      >
        {item.slots.map((slot) => (
          <Select.Option value={slot.id}>{slot.value}</Select.Option>
        ))}
      </Select>
      <Col span={4} style={{ textAlign: "center" }}>
        <Text>{selectedSlot ? selectedSlot.price : "0.000"} đ</Text>
      </Col>
    </Row>
  );
};

export default CartItem;
