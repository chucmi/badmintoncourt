import {
  Button,
  Form,
  Input,
  Select,
  TimePicker,
  Switch,
  notification,
  Modal,
} from "antd";
import { useState, useEffect } from "react";
import FormInput from "../FormInput/FormInput";
import { getProvinces } from "../../services/provinceAPI";
import { getYardDetail, updateYard } from "../../services/yardAPI";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import SlotForm from "../SlotForm/SlotForm";
import { createSlot, updateSlot } from "../../services/slotAPI";
import SlotItem from "../SlotItem/SlotItem";

export default function CourtUpdate() {
  const [form] = Form.useForm();
  const [court, setCourt] = useState(null);
  const { yardid } = useParams();
  const [provinces, setProvinces] = useState([]);
  const [isSlotModalVisible, setIsSlotModalVisible] = useState(false);
  const [slotForm] = Form.useForm();
  const [selectedSlot, setSelectedSlot] = useState(null); // New state for selected slot
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        if (data) {
          setProvinces(data);
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  const fetchCourt = async () => {
    try {
      const data = await getYardDetail(yardid);
      if (data) {
        setCourt(data);
      }
    } catch (error) {
      console.error("Error fetching court details:", error);
    }
  };

  useEffect(() => {
    fetchCourt();
  }, [yardid]);

  useEffect(() => {
    if (court) {
      form.setFieldsValue({
        courtName: court.name,
        address: court.address,
        description: court.description,
        province_id: court.province_id,
        status: court.status,
        openingTime: dayjs(court.open_time, "HH:mm:ss"),
        closingTime: dayjs(court.close_time, "HH:mm:ss"),
      });
    }
  }, [court, provinces, form]);

  const onFinish = async (values) => {
    const formatTime = (time) => time.format("HH:mm:ss");

    const data = {
      name: values.courtName,
      address: values.address,
      description: values.description,
      province_id: values.province_id,
      status: values.status,
      open_time: formatTime(values.openingTime),
      close_time: formatTime(values.closingTime),
      host_id: JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id,
    };

    try {
      await updateYard(court.id, data);
      notification.success({
        message: "Cập nhật sân thành công",
        description: "Sân của bạn đã được cập nhật thành công.",
      });
    } catch (error) {
      notification.error({
        message: error?.message || "Some thing wrong. Please try later!",
      });
    }
  };

  const handleSaveSlot = async (values) => {
    const formatTime = (time) => time.format("HH:mm:ss");

    const data = {
      ...values,
      start_time: formatTime(values.start_time),
      end_time: formatTime(values.end_time),
    };

    try {
      if (selectedSlot) {
        await updateSlot(selectedSlot.id, data); // Update slot if it exists
        notification.success({
          message: "Slot updated successfully",
          description: "The slot has been updated successfully.",
        });
      } else {
        await createSlot(court.id, data); // Create slot if it doesn't exist
        notification.success({
          message: "Slot created successfully",
          description: "The slot has been created successfully.",
        });
      }
      setIsSlotModalVisible(false);
      slotForm.resetFields();
      setSelectedSlot(null); // Reset selected slot after saving
      await fetchCourt(); // Fetch updated court details
    } catch (error) {
      notification.error({
        message:
          error?.message ||
          `Failed to ${selectedSlot ? "update" : "create"} slot. Please try later.`,
      });
    }
  };

  const handleEditSlot = (slot) => {
    setSelectedSlot(slot);
    setIsSlotModalVisible(true);
  };

  return (
    <>
      <div className="font-bold text-2xl mb-4 text-center mt-6">
        Update Your Court
      </div>
      {court && (
        <Form
          className="mx-44"
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Court Name:"
            name="courtName"
            rules={[{ required: true, message: "Please enter the court name" }]}
          >
            <Input placeholder="Enter court name" />
          </Form.Item>

          <Form.Item
            label="Address:"
            name="address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>

          <Form.Item
            label="Province:"
            name="province_id"
            rules={[{ required: true, message: "Please select the province" }]}
          >
            <select className="w-full h-10 border-2 rounded-lg">
              {provinces.map((province) => (
                <option key={province.province_id} value={province.province_id}>
                  {province.province_name}
                </option>
              ))}
            </select>
          </Form.Item>

          <Form.Item
            label="Description:"
            name="description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input.TextArea placeholder="Enter description" rows={4} />
          </Form.Item>

          <div className="flex">
            <Form.Item
              label="Opening Time:"
              name="openingTime"
              rules={[
                { required: true, message: "Please select the opening time" },
                {
                  validator: (_, value) =>
                    value && value.isValid()
                      ? Promise.resolve()
                      : Promise.reject(new Error("Please select a valid time")),
                },
              ]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>

            <div className="w-8" />

            <Form.Item
              label="Closing Time:"
              name="closingTime"
              rules={[
                { required: true, message: "Please select the closing time" },
                {
                  validator: (_, value) =>
                    value && value.isValid()
                      ? Promise.resolve()
                      : Promise.reject(new Error("Please select a valid time")),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const openingTime = getFieldValue("openingTime");
                    if (!value || !openingTime || value.isAfter(openingTime)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Closing time must be after opening time")
                    );
                  },
                }),
              ]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>
          </div>

          <Form.Item label="Status:" name="status" valuePropName="checked">
            <Switch checkedChildren="Open" unCheckedChildren="Closed" />
          </Form.Item>
          <div className="pb-6">
            <div className="flex pb-5 gap-2">
              {court.slots.map((slot) => (
                <SlotItem
                  key={slot.id}
                  slot={slot}
                  handleOnEditSlot={() => handleEditSlot(slot)}
                />
              ))}
            </div>

            <Button
              type="default"
              onClick={() => setIsSlotModalVisible(true)}
              style={{ marginLeft: 10 }}
            >
              Create Slot
            </Button>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
            <Button
              type="default"
              onClick={() => navigate(-1)}
              style={{ marginLeft: 10 }}
            >
              Trở về
            </Button>
          </Form.Item>
        </Form>
      )}
      <Modal
        title={selectedSlot ? "Update Slot" : "Create Slot"}
        open={isSlotModalVisible}
        onCancel={() => {
          setIsSlotModalVisible(false);
          setSelectedSlot(null);
        }}
        footer={null}
      >
        <SlotForm
          form={slotForm}
          handleSaveSlot={handleSaveSlot}
          slot={selectedSlot}
        />
      </Modal>
    </>
  );
}
