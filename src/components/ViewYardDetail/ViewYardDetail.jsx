import React from "react";
import { TinyColor } from "@ctrl/tinycolor";
import { Button, ConfigProvider } from "antd";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const viewYardDetail = () => {
  const slideImages = [
    {
      url: "https://shopvnb.com/uploads/tin_tuc/review-san-cau-long-quan-12-san-cau-long-nhat-pham.webp",
      caption: "First Slide",
    },
    {
      url: "https://shopvnb.com/uploads/tin_tuc/review-san-cau-long-quan-12-san-cau-long-nhat-pham.webp",
      caption: "Second Slide",
    },
    {
      url: "https://shopvnb.com/uploads/tin_tuc/review-san-cau-long-quan-12-san-cau-long-nhat-pham.webp",
      caption: "Third Slide",
    },
    {
      url: "https://shopvnb.com/uploads/tin_tuc/review-san-cau-long-quan-12-san-cau-long-nhat-pham.webp",
      caption: "Fourth Slide",
    },
  ];

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "291px",
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

  return (
    <>
      <div className="flex h-fit pt-16  justify-center">
        <div
          style={{
            width: "528px",
            height: "291px",
            boxSizing: "border-box",
            marginRight: "40px",
            position: "inherit",
          }}
          className="slide-container "
        >
          <Fade>
            {slideImages.map((image, index) => (
              <div
                key={index}
                style={{ ...divStyle, backgroundImage: `url(${image.url})` }}
                className="border-2 rounded-2xl border-black "
              >
                <div style={bannerStyle} >
                  <span>{image.caption}</span>
                </div>
              </div>
            ))}
          </Fade>
        </div>
        <div className="border-2 rounded-2xl border-black bg-white p-5 ml-10 w-[528px] h-[291px]">
          <div className="text-left">
            <h2 className="font-bold">
              SÂN CẦU LÔNG QUỐC KHÁNH, XUÂN LỘC, ĐỒNG NAI
            </h2>
            <div className="pt-3">
              <p>
                <span className="font-bold">📌 Location: </span>Suối Cát, XÃ SUỐI
                CÁT, HUYỆN XUÂN LỘC, Đồng Nai
              </p>
              <p>
                <span className="font-bold">⏰ Time-Available: </span>5:00 - 21:00
              </p>
              <p>
                <span className="font-bold">📞 PhoneNumber: </span>035x 2xx 2xx
              </p>
              <p>
                <span className="font-bold">💶 Price: </span>40.000 đ - 60.000 đ
              </p>
              <div className="flex items-center">
                <span className="font-bold">✅ Time:</span>
                <div className="border-2 rounded-2xl border-black px-2 ml-2">
                  5am - 9pm
                </div>
              </div>
              <p>
                <span className="font-bold">💲 Giá tạm tính: </span>40.000 đ
              </p>
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
                <Button type="primary" size="large">
                  Đặt hàng ngay
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
              >
                <Button type="primary" size="large" className="w-32">
                  🛒
                </Button>
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-44">
        <h1 className="text-cyan-600 font-bold text-left pl-48">
          CÁC SÂN CẦU LÔNG KHÁC DÀNH CHO BẠN
        </h1>
        <div className="flex justify-evenly">
          {slideImages.map((image, index) => (
            <div key={index} className="w-64 pt-10">
              <div className="relative">
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-[150px] object-cover border-2 rounded-2xl"
                />
                <div style={bannerStyle}>
                  <span>{image.caption}</span>
                </div>
              </div>
              <span className="block text-center mt-2 font-bold size-auto">
                {image.caption}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default viewYardDetail;
