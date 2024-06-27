import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getYards, getYards2 } from "../../services/yardAPI";
import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader

const YardList = () => {
  const [courts, setCourts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const courtsPerPage = 4;

  useEffect(() => {
    const fetchYards = async () => {
      try {
        const data = await getYards();
        setCourts(data);
      } catch (e) {
        setError('Failed to fetch yards.');
      } finally {
        setLoading(false);
      }
    };
    fetchYards();
  }, []);

  const totalPages = Math.ceil(courts.length / courtsPerPage);
  const indexOfLastCourt = currentPage * courtsPerPage;
  const indexOfFirstCourt = indexOfLastCourt - courtsPerPage;
  const currentCourts = courts.slice(indexOfFirstCourt, indexOfLastCourt);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const handleDelete = async (id) => {
  //   await deleteYard(id);
  //   setCourts(courts.filter(court => court.id !== id));
  // }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Yard Management</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <span className="text-xl font-semibold text-red-500">{error}</span>
        </div>
      ) : (
        <>
          <ul className="mt-4">
            {currentCourts.map((court) => (
              <li key={court.id} className="mb-4 p-4 border rounded shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold">{court.name}</p>
                    <p className="text-gray-600">{court.address}</p>
                  </div>
                  <div className="flex space-x-4">
                    <Link
                      to={`/edit/${court.id}`}
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                    >
                      Edit
                    </Link>
                    {/* <button onClick={() => handleDelete(court.id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">Delete</button> */}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`py-2 px-4 rounded ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default YardList;
