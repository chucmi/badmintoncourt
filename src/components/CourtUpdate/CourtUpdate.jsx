import {
  Button,
  Form,
  Input,
  Select,
  TimePicker,
  Switch,
  notification,
  Modal,
  Upload,
  Image,
  Tag,
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
import { CloseOutlined, UploadOutlined } from "@mui/icons-material";
import { storage } from "../../services/firebase/UploadImgSvc";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  createYardImage,
  deleteYardImage,
  getYardImages,
} from "../../services/yardImageAPI";
import PhoneForm from "../PhoneForm/PhoneForm";
import { createPhone, deletePhone } from "../../services/phoneAPI";

export default function CourtUpdate({ isAdmin = true }) {
  const [form] = Form.useForm();
  const [court, setCourt] = useState(null);
  const { yardid } = useParams();
  const [provinces, setProvinces] = useState([]);
  const [isSlotModalVisible, setIsSlotModalVisible] = useState(false);
  const [isPhoneModalVisible, setIsPhoneModalVisible] = useState(false);
  const [slotForm] = Form.useForm();
  const [phoneForm] = Form.useForm();
  const [selectedSlot, setSelectedSlot] = useState(null); // New state for selected slot
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
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
  useEffect(() => {
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
  }, []);

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
      status: isAdmin ? values.status : false,
      open_time: formatTime(values.openingTime),
      close_time: formatTime(values.closingTime),
      host_id: court.host_id,
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

  const handleSavePhone = async (values) => {
    const data = {
      yard_id: yardid,
      telephone: values.telephone,
    };
    try {
      await createPhone(data);
      notification.success({
        message: "Thêm só điện thoại thành công",
        description: "Số điện thoại đã được thêm thành công.",
      });
      setIsPhoneModalVisible(false);
      phoneForm.resetFields();
      await fetchCourt(); // Fetch updated court details
    } catch (error) {
      notification.error({
        message: error?.message || "Some thing wrong. Please try later!",
      });
    }
    onFinish(form.getFieldsValue());
  };

  const handleDeletePhone = async (id) => {
    try {
      await deletePhone(id);
      notification.success({
        message: "Xóa số điện thoại thành công",
        description: "Số điện thoại đã được xóa thành công.",
      });
      await fetchCourt(); // Fetch updated court details
    } catch (error) {
      notification.error({
        message: error?.message || "Some thing wrong. Please try later!",
      });
    }
    onFinish(form.getFieldsValue());
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
    onFinish(form.getFieldsValue());
  };

  const handleEditSlot = (slot) => {
    setSelectedSlot(slot);
    setIsSlotModalVisible(true);
  };

  const [uploading, setUploading] = useState(false);

  const handleImageChange = (info) => {
    setImage(info.target.files[0]);
  };
  const handleImageUpload = async () => {
    const img = image;
    if (img) {
      try {
        setUploading(true);
        const storageRef = ref(storage, `images/${img.name}${Math.random()}`);
        await uploadBytes(storageRef, img);
        const url = await getDownloadURL(storageRef);
        const data = {
          yard_id: yardid,
          img: url,
        };
        await createYardImage(data);
        fetchCourt();
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
        setImage(null);
      }
    }
    onFinish(form.getFieldsValue());
  };

  const handleDeleteImage = async (imageId) => {
    try {
      // Call your delete image API here
      await deleteYardImage(imageId);
      notification.success({
        message: "Xóa ảnh thành công",
        description: "Ảnh đã được xóa thành công.",
      });
      fetchCourt(); // Fetch updated court details
    } catch (error) {
      notification.error({
        message: error?.message || "Some thing wrong. Please try later!",
      });
    }
    onFinish(form.getFieldsValue());
  };

  return (
    <>
      <div className="font-bold text-2xl mb-4 text-center mt-6">
        Chỉnh sửa {court?.name}
      </div>
      {court && (
        <Form
          className="mx-44"
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Tên sân:"
            name="courtName"
            rules={[{ required: true, message: "Please enter the court name" }]}
          >
            <Input disabled={isAdmin} placeholder="Enter court name" />
          </Form.Item>

          <Form.Item
            label="Địa chỉ:"
            name="address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input disabled={isAdmin} placeholder="Enter address" />
          </Form.Item>

          <Form.Item
            label="Tỉnh:"
            name="province_id"
            rules={[{ required: true, message: "Please select the province" }]}
          >
            <select
              disabled={isAdmin}
              className="w-full h-10 border-2 rounded-lg"
            >
              {provinces.map((province) => (
                <option key={province.province_id} value={province.province_id}>
                  {province.province_name}
                </option>
              ))}
            </select>
          </Form.Item>

          <Form.Item
            label="Mô tả:"
            name="description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input.TextArea
              disabled={isAdmin}
              placeholder="Enter description"
              rows={4}
            />
          </Form.Item>

          <div className="flex">
            <Form.Item
              label="Giờ mở cửa:"
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
              <TimePicker disabled={isAdmin} format="HH:mm" />
            </Form.Item>

            <div className="w-8" />

            <Form.Item
              label="Giờ đóng cửa:"
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
              <TimePicker disabled={isAdmin} format="HH:mm" />
            </Form.Item>
          </div>

          <Form.Item label="Trạng thái:" name="status" valuePropName="checked">
            <Switch
              checkedChildren="Open"
              unCheckedChildren="Closed"
              disabled={!isAdmin}
            />
          </Form.Item>
          <div className="pb-6">
            <div className="flex pb-5 gap-2">
              {court.telephones.map((phone) => (
                <div>
                  <Tag color="blue">
                    <div className="flex gap-2">
                      {phone.telephone}
                      {isAdmin === false ? (
                        <a onClick={() => handleDeletePhone(phone.id)}>
                          <CloseOutlined key="delete" />
                        </a>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Tag>
                </div>
              ))}
            </div>
            {isAdmin === false ? (
              <Button
                type="default"
                onClick={() => setIsPhoneModalVisible(true)}
                style={{ marginLeft: 10 }}
              >
                Add Phone
              </Button>
            ) : (
              <></>
            )}
          </div>
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

            {isAdmin === false ? (
              <Button
                type="default"
                onClick={() => setIsSlotModalVisible(true)}
                style={{ marginLeft: 10 }}
              >
                Create Slot
              </Button>
            ) : (
              <></>
            )}
          </div>
          <div className="pb-6">
            <div>
              <h4>Hình ảnh:</h4>
              <div className="flex gap-5 p-3">
                {court.images.map((img) => (
                  <div
                    key={img.id}
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <Image src={img.image} width={100} height={100} />
                    {isAdmin === false ? (
                      <CloseOutlined
                        onClick={() => handleDeleteImage(img.id)}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          cursor: "pointer",
                          color: "red",
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {isAdmin === false ? (
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                <Button disabled={uploading} onClick={handleImageUpload}>
                  {uploading ? "Đang tải lên ..." : "Đăng Ảnh"}
                </Button>
              </div>
            ) : (
              <></>
            )}
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
      <Modal
        title="Add Phone"
        open={isPhoneModalVisible}
        onCancel={() => setIsPhoneModalVisible(false)}
        footer={null}
      >
        <PhoneForm form={phoneForm} handleSavePhone={handleSavePhone} />
      </Modal>
    </>
  );
}
