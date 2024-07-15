import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  ConfigProvider,
  Spin,
  Select,
  DatePicker,
  Skeleton,
  Carousel,
  Typography,
} from "antd";
import { Fade } from "react-slideshow-image";
import { TinyColor } from "@ctrl/tinycolor";
import {
  getRandomYard,
  getYardDetail,
  getYardDetailActiveSlot,
} from "../../services/yardAPI";
import { addToCart } from "../../redux/cartSlice"; // Adjust the path accordingly
import "react-slideshow-image/dist/styles.css";
import { formatDate, formatTime } from "../../utils/time";
import { ArrayToString } from "../../utils/text";
import Paragraph from "antd/es/typography/Paragraph";

const ViewYardDetail = () => {
  const { yardid } = useParams();
  const dispatch = useDispatch();
  const [courtDetail, setCourtDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingType, setBookingType] = useState("inday"); // Default booking type
  const [selectedDates, setSelectedDates] = useState(["", ""]);
  const [recommendedCourts, setRecommendedCourts] = useState([]);
  const navigate = useNavigate();
  const fetchCourtDetail = async () => {
    try {
      const data = await getYardDetailActiveSlot(yardid);
      setCourtDetail(data);
    } catch (error) {
      setError(error.message || "Something went wrong. Please try later!");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendedCourts = async () => {
    console.log("fetching recommended courts");
    try {
      const data = await getRandomYard(4);
      setRecommendedCourts(data);
    } catch (error) {
      setError(error.message || "Something went wrong. Please try later!");
    }
  };

  useEffect(() => {
    fetchCourtDetail();
    fetchRecommendedCourts();
  }, []);

  const handleAddToCart = () => {
    if (!selectedSlot) {
      alert("Please select a slot!");
      return;
    }
    const selectedSlotDetail = courtDetail.slots.find(
      (slot) => slot.id === selectedSlot
    );

    let tournament_start, tournament_end;
    let booking_type_text;
    let dateCount = 1;

    if (bookingType === "inday") {
      // For 'inday' booking type, start and end time are set to current date and time
      tournament_start = formatDate(new Date().toISOString());
      tournament_end = formatDate(new Date().toISOString());
      booking_type_text = "Đặt trong ngày";
    } else if (bookingType === "longterm") {
      // For 'longterm' booking type, get start and end time from DatePicker
      // Assuming you have a state to store DatePicker selected dates
      // Replace 'selectedDates' with the actual state storing selected dates
      // Ensure you handle undefined case if dates are not selected
      tournament_start = selectedDates ? selectedDates[0] : null;
      tournament_end = selectedDates ? selectedDates[1] : null;
      if (tournament_start && tournament_end) {
        const start = new Date(tournament_start);
        const end = new Date(tournament_end);
        const differenceInTime = end.getTime() - start.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert milliseconds to days
        dateCount = differenceInDays;
      }
      booking_type_text = "Đặt dài hạn";
    }

    dispatch(
      addToCart({
        id: courtDetail.id,
        name: courtDetail.name,
        address: courtDetail.address,
        open_time: courtDetail.open_time,
        close_time: courtDetail.close_time,
        phone: courtDetail.phone,
        price: selectedSlotDetail.price,
        tournament_start,
        tournament_end,
        booking_type: bookingType,
        booking_type_text: booking_type_text,
        slot_id: selectedSlotDetail.id,
        slot_start: formatTime(selectedSlotDetail.start_time),
        slot_end: formatTime(selectedSlotDetail.end_time),
        date_count: dateCount,
        images: courtDetail.images,
      })
    );
  };

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "320px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  };

  const bannerStyle = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50px",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
  };

  const colors2 = ["#99FFCC", "#CCFF99", "#FFFF66"];
  const colors3 = ["#33FFFF", "#30dd8a", "#CCFF00"];
  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  if (loading) {
    return (
      <Skeleton
        className="pt-16"
        active
        loading={loading}
        paragraph={{ rows: 16 }}
      />
    );
  }

  return (
    <>
      <div className="flex h-fit pt-16 justify-center">
        <div
          style={{
            width: "528px",
            height: "320px",
            boxSizing: "border-box",
            marginRight: "40px",
            position: "inherit",
          }}
          className="slide-container"
        >
          {courtDetail.images.length > 0 ? (
            <Fade>
              {courtDetail.images.map((image, index) => (
                <div
                  key={index}
                  style={{
                    ...divStyle,
                    backgroundImage: `url(${image.image})`,
                  }}
                  className="border-2 rounded-2xl border-black"
                >
                  <div style={bannerStyle}>
                    <span>{courtDetail.name}</span>
                  </div>
                </div>
              ))}
            </Fade>
          ) : (
            <div className="object-cover ">
              <img
                alt="court"
                src="/src/assets/1.png"
                className="object-cover "
              />
            </div>
          )}
        </div>
        <div className="border-2 rounded-2xl border-black bg-white p-5 ml-10 w-[528px] h-[320px]">
          <div className="text-left">
            <h2 className="font-bold">{courtDetail.name}</h2>
            <div className="pt-3">
              <p>
                <span className="font-bold">📌 Địa chỉ: </span>
                {courtDetail.address}
              </p>
              <p>
                <span className="font-bold">⏰ Giờ mở cửa: </span>
                {formatTime(courtDetail.open_time)} -{" "}
                {formatTime(courtDetail.close_time)}
              </p>
              <p>
                <span className="font-bold">📞 Số điện thoại: </span>
                {ArrayToString(courtDetail.telephones) || "Không có dữ liệu"}
              </p>
              <div className="flex items-center">
                <span className="font-bold">⏲ Lúc: </span>
                <Select
                  style={{ width: 200, marginLeft: 10 }}
                  placeholder="Chọn thời gian"
                  onChange={(value) => setSelectedSlot(value)}
                >
                  {courtDetail.slots.map((slot) => (
                    <Select.Option key={slot.id} value={slot.id}>
                      {`${formatTime(slot.start_time)} - ${formatTime(
                        slot.end_time
                      )}: ${slot.price.toLocaleString("vi-VN")} đ`}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className="flex items-center pt-3">
                <span className="font-bold">Hình thức đặt: </span>
                <Select
                  style={{ width: 150, marginLeft: 10 }}
                  value={bookingType}
                  onChange={(value) => setBookingType(value)}
                >
                  <Select.Option value="inday">Đặt trong ngày</Select.Option>
                  <Select.Option value="longterm">Đặt dài hạn</Select.Option>
                </Select>
              </div>
              {bookingType === "longterm" && (
                <div className="pt-3">
                  <DatePicker.RangePicker
                    onChange={(dates, dateStrings) => {
                      console.log("Selected Dates:", dates, dateStrings);
                      setSelectedDates(dateStrings); // Store Date objects
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-evenly">
            <div>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimary: `linear-gradient(116deg,  ${colors3.join(
                        ", "
                      )})`,
                      colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(
                        colors3
                      ).join(", ")})`,
                      colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(
                        colors3
                      ).join(", ")})`,
                      lineWidth: 0,
                    },
                  },
                }}
              ></ConfigProvider>
            </div>
          </div>

          <div className="flex pt-10 justify-evenly">
            <div>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimary: `linear-gradient(116deg,  ${colors3.join(
                        ", "
                      )})`,
                      colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(
                        colors3
                      ).join(", ")})`,
                      colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(
                        colors3
                      ).join(", ")})`,
                      lineWidth: 0,
                    },
                  },
                }}
              >
                <Button type="primary" size="large" onClick={handleAddToCart}>
                  Đặt sân ngay
                </Button>
              </ConfigProvider>
            </div>
            <div>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimary: `linear-gradient(116deg,  ${colors2.join(
                        ", "
                      )})`,
                      colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(
                        colors2
                      ).join(", ")})`,
                      colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(
                        colors2
                      ).join(", ")})`,
                      lineWidth: 0,
                    },
                  },
                }}
              ></ConfigProvider>
            </div>
          </div>
        </div>
      </div>
      <div className="px-20 container pt-20">
        <Paragraph className="text-3xl text-left font-semibold text-blue-400">
          Thông tin thêm:
        </Paragraph>

        <Paragraph className="text-left font-semibold text-xl ">
          {courtDetail.description}
        </Paragraph>
      </div>

      <div className="pt-44 pb-12">
        <h1 className="text-cyan-600 font-bold text-left pl-48 pb-4">
          CÁC SÂN CẦU LÔNG KHÁC DÀNH CHO BẠN
        </h1>
        <div className="flex justify-evenly">
          {recommendedCourts.map((court, index) => (
            <>
              <div className="flex flex-col gap-2">
                <div
                  key={index}
                  className="h-48 w-72"
                  onClick={() => (window.location.href = `/yard/${court.id}`)}
                >
                  {court.images.length > 0 ? (
                    <Carousel autoplay className="object-cover h-full w-full">
                      {court.images.map((image, index) => (
                        <img
                          key={index}
                          alt={`court-${index}`}
                          src={image.image}
                          className="object-cover h-48 w-72 rounded-2xl"
                        />
                      ))}
                    </Carousel>
                  ) : (
                    <img
                      className="h-full w-full object-cover rounded-2xl"
                      src="/src/assets/1.png"
                      alt={`slide-${index}`}
                    />
                  )}
                </div>
                <div className="font-semibold">{court.name}</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewYardDetail;
