import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import CourtCard from "./CourtCard";
import RecommendedCard from "./Recommend";
import { getYards } from "../../services/yardAPI";

const sampleData = [
  {
    id: 1,
    name: "Premium Badminton Court",
    address: "123 Main St",
    phone: "123-456-7890",
    price: "$30/hour",
    image: "/src/assets/1.png",
    description:
      "Enjoy playing on our premium badminton court with top-notch facilities and equipment.",
  },
  {
    id: 2,
    name: "Standard Badminton Court",
    address: "456 Oak St",
    phone: "987-654-3210",
    price: "$20/hour",
    image: "/src/assets/1.png",
    description:
      "A standard court perfect for casual games and training sessions.",
  },
  {
    id: 3,
    name: "Budget Badminton Court",
    address: "789 Pine St",
    phone: "555-555-5555",
    price: "$15/hour",
    image: "/src/assets/1.png",
    description:
      "An affordable option for those who just want to play for fun.",
  },
  {
    id: 4,
    name: "Luxury Badminton Court",
    address: "321 Elm St",
    phone: "111-222-3333",
    price: "$50/hour",
    image: "/src/assets/1.png",
    description:
      "Experience the luxury of playing on a top-tier court with all the amenities.",
  },
  {
    id: 5,
    name: "Professional Badminton Court",
    address: "555 Maple St",
    phone: "999-888-7777",
    price: "$40/hour",
    image: "/src/assets/1.png",
    description:
      "Designed for professional athletes with high-performance facilities.",
  },
  {
    id: 6,
    name: "Community Badminton Court",
    address: "222 Willow St",
    phone: "888-777-6666",
    price: "$25/hour",
    image: "/src/assets/1.png",
    description:
      "A community court accessible to all with excellent facilities.",
  },
  {
    id: 7,
    name: "City Badminton Court",
    address: "333 Cedar St",
    phone: "777-666-5555",
    price: "$35/hour",
    image: "/src/assets/1.png",
    description: "A city court with great lighting and well-maintained courts.",
  },
  {
    id: 8,
    name: "University Badminton Court",
    address: "444 Birch St",
    phone: "666-555-4444",
    price: "$10/hour",
    image: "/src/assets/1.png",
    description:
      "A budget-friendly court located within the university premises.",
  },
  {
    id: 9,
    name: "High School Badminton Court",
    address: "555 Spruce St",
    phone: "555-444-3333",
    price: "$5/hour",
    image: "/src/assets/1.png",
    description:
      "A basic court available for high school students and the public.",
  },
  {
    id: 10,
    name: "Club Badminton Court",
    address: "666 Fir St",
    phone: "444-333-2222",
    price: "$45/hour",
    image: "/src/assets/1.png",
    description: "A private club court with exclusive amenities for members.",
  },
];
const ListCourt = () => {
  const [courts, setCourts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchYards = async () => {
      const data = await getYards(currentPage - 1);
      if (data) {
        setCourts(data);
        setTotalPages(data.totalPages);
      }
    };
    fetchYards();
  }, [currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-4 ">
          <div className="col-span-3">
            <div className="grid grid-cols-1 ">
              {courts.map((court) => (
                <div key={court.id} className="h-full">
                  <CourtCard court={court} />
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 mx-2 rounded focus:outline-none ${currentPage === 1 ? "bg-gray-200 text-gray-700 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 mx-2 rounded focus:outline-none ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={courts.length < 5}
                className={`px-4 py-2 mx-2 rounded focus:outline-none ${courts.length < 5 ? "bg-gray-200 text-gray-700 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
          <div className="col-span-1">
            <div className="border rounded p-4">
              <h3 className="text-lg font-bold mb-4">Recommended Courts</h3>
              <div className="grid grid-cols-1 ">
                {sampleData.slice(0, 4).map((court) => (
                  <div key={court.id}>
                    <RecommendedCard court={court} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListCourt;
