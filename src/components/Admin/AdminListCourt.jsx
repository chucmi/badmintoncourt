import React, { useEffect, useState } from "react";
import { getYards } from "../../services/yardAPI";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';

const YardList = () => {
  const [courts, setCourts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourt, setCurrentCourt] = useState(null);

  useEffect(() => {
    const fetchYards = async () => {
      setLoading(true);
      try {
        const data = await getYards(currentPage - 1);
        setCourts(data);
        setTotalPages(data.totalPages);
      } catch (e) {
        setError('Failed to fetch yards.');
      } finally {
        setLoading(false);
      }
    };
    fetchYards();
  }, [currentPage]);

  const paginate = (pageNumber) => {
    setLoading(true);
    setCurrentPage(pageNumber);
  };

  const openModal = (court) => {
    setCurrentCourt(court);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCourt(null);
  };

  const handleSave = async (updatedCourt) => {
    // Perform the save operation here (e.g., call an API to save the changes)
    // After saving, fetch the updated list of yards
    closeModal();
    setLoading(true);
    try {
      const data = await getYards(currentPage - 1);
      setCourts(data);
    } catch (e) {
      setError('Failed to fetch yards.');
    } finally {
      setLoading(false);
    }
  };

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
            {courts.map((court) => (
              <li key={court.id} className="mb-4 p-4 border rounded shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold">{court.name}</p>
                    <p className="text-gray-600">{court.address}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => openModal(court)}
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                    >
                      Edit
                    </button>
                    {/* <button onClick={() => handleDelete(court.id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">Delete</button> */}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center space-x-2">
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
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Court"
        ariaHideApp={false}
      >
        {currentCourt && (
          <div>
            <h2>Edit {currentCourt.name}</h2>
            {/* Include form fields to edit the court details */}
            <input
              type="text"
              value={currentCourt.name}
              onChange={(e) => setCurrentCourt({ ...currentCourt, name: e.target.value })}
            />
            <input
              type="text"
              value={currentCourt.address}
              onChange={(e) => setCurrentCourt({ ...currentCourt, address: e.target.value })}
            />
            <button onClick={() => handleSave(currentCourt)}>Save</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default YardList;
