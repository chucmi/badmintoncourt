import React from "react";
import { FaMapMarkerAlt, FaPhone, FaDollarSign } from "react-icons/fa";

const CourtCard = ({ court }) => {
  return (
    <div className="flex flex-col md:flex-row items-start bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden w-full h-auto p-4">
      <img
        className="object-cover w-full md:w-48 h-full md:h-auto"
        src="/src/assets/1.png"
        alt={court.name}
      />
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
          <p className="font-normal">{court.phone | "NoData!"}</p>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <FaDollarSign className="mr-2" />
          <p className="font-normal">{court.price | "NoData!"}</p>
        </div>
        <p className="font-normal text-gray-700">{court.description}</p>
      </div>
    </div>
  );
};

export default CourtCard;
