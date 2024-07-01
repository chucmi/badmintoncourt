import { CloseOutlined, EditOutlined } from "@mui/icons-material";
import { Card, Tooltip } from "antd";
import { formatTime } from "../../utils/time";

export default function SlotItem({
  slot,
  handleOnEditSlot,
  handleOnDeleteSlot,
}) {
  return (
    <Card
      hoverable
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "auto",
        height: 40,
        borderRadius: 20,
        backgroundColor: slot.status === "true" ? "#f0f0f0" : "#f74d56",
        border: "1px solid #d9d9d9",
      }}
      body={{ padding: "0", display: "flex", alignItems: "center" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        Slot:{formatTime(slot.start_time)} - {formatTime(slot.end_time)} |
        Price:{slot.price.toLocaleString("vi-VN")}đ
        <Tooltip title="Edit">
          <a onClick={() => handleOnEditSlot(slot)}>
            <EditOutlined key="edit" />
          </a>
        </Tooltip>
        <Tooltip title="Delete">
          <a>
            <CloseOutlined key="delete" />
          </a>
        </Tooltip>
      </div>
    </Card>
  );
}
