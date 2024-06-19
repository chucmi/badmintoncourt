
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const RecommendedCard = ({ court }) => {
  return (
    <div className="bg-white shadow-md rounded overflow-hidden mb-4 border border-gray-200">
      <img src="/src/assets/1.png" alt={court.name} className="w-full h-32 object-cover" />
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
