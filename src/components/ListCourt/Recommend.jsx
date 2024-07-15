import { Carousel } from "antd";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RecommendedCard = ({ court }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white shadow-md rounded overflow-hidden mb-4 border border-gray-200"
      onClick={() => navigate(`/yard/${court.id}`)}
    >
      {court.images.length > 0 ? (
        <Carousel autoplay className="w-full h-32 object-cover">
          {court.images.map((image, index) => (
            <img
              key={index}
              alt={`court-${index}`}
              src={image.image}
              className="w-full h-32 object-cover"
            />
          ))}
        </Carousel>
      ) : (
        <img
          src="/src/assets/1.png"
          alt={court.name}
          className="w-full h-32 object-cover"
        />
      )}
      <div className="p-4 text-left">
        <h4 className="text-md font-semibold mb-1">{court.name}</h4>
        <div className="flex items-center text-gray-700">
          <FaMapMarkerAlt className="mr-2" />
          <p className="text-sm">{court.address}</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendedCard;
