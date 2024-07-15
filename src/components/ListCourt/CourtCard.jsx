import { Button, Carousel } from "antd";
import React from "react";
import { FaMapMarkerAlt, FaPhone, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ArrayToString, getMinMaxPrice } from "../../utils/text";

const CourtCard = ({ court }) => {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/yard/${court.id}`);
  };
  return (
    <div className="flex flex-col md:flex-row items-start bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden w-full h-56 p-4">
      <div className="object-fit w-full md:w-60 h-full md:h-auto ">
        {court.images.length > 0 ? (
          <Carousel autoplay className="object-cover w-56 h-36">
            {court.images.map((image, index) => (
              <img
                key={index}
                alt={`court-${index}`}
                src={image.image}
                className="object-cover w-56 h-36"
              />
            ))}
          </Carousel>
        ) : (
          <div className="object-cover w-56 h-36">
            <img
              alt="court"
              src="/src/assets/1.png"
              className="object-cover w-56 h-36"
            />
          </div>
        )}
      </div>
      <div className="p-4 pl-10 flex-col justify-start h-full w-full text-left">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900">
          {court.name}
        </h5>
        <div className="flex items-center text-gray-700 mb-2 ">
          <FaMapMarkerAlt className="mr-2" />
          <p className="font-normal ">{court.address}</p>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaPhone className="mr-2" />
          <p className="font-normal">
            {ArrayToString(court.telephones) || "Không có dữ liệu!"}
          </p>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaDollarSign className="mr-2" />
          <p className="font-normal">
            {getMinMaxPrice(court.slots) || "Không có dữ liệu!"}
          </p>
        </div>
        <div className="h-12">
          <p className="font-normal text-gray-700 text-wrap">
            {court.description}
          </p>
        </div>
      </div>
      <div className="p-4">
        <Button
          type="primary"
          className="font-semibold h-10"
          onClick={handleViewDetail}
          disabled={!court.status}
        >
          Đặt sân ngay
        </Button>
      </div>
    </div>
  );
};

export default CourtCard;
