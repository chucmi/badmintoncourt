import React, { useEffect, useState } from "react";
import { getTransactionOfUser } from "../../services/paymentAPI";
import { account } from "../../services/authAPI";
import { Button, Form, Modal, notification, Tag } from "antd";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import { createFeedback } from "../../services/feedbackAPI";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [feedbackForm] = Form.useForm();
  const [selectPayment, setSelectPayment] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const userData = await account();
      if (userData) {
        const data = await getTransactionOfUser(userData.id);
        if (data) {
          setTransactions(data);
        }
      }
    };

    fetchTransactions();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = () => {
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setTransactions(sortedTransactions);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSaveFeedback = async (values) => {
    const data = {
      ...values,
      user_id: JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id,
      payment_id: selectPayment.id,
    };
    try {
      await createFeedback(data);
      setShowModal(false);
      feedbackForm.resetFields();
      notification.success({
        message: "Gửi đánh giá thành công",
        description: "Đánh giá đã được gửi thành công.",
      });
    } catch (error) {
      notification.error({
        message: error?.message || "Some thing wrong. Please try later!",
      });
    }
  };

  return (
    <>
      <div className="container mx-auto my-10">
        <h1 className="text-2xl font-bold mb-5">Transaction History</h1>
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mr-4"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th
                  className="px-16 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={handleSort}
                >
                  {sortOrder === "asc" ? "▲" : "▼"} Mã thanh toán
                </th>
                <th className="px-16 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên sân
                </th>
                <th className="px-16 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Từ
                </th>
                <th className="px-16 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đến
                </th>
                <th className="px-16 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá tiền
                </th>
                <th className="px-16 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-16 py-4 whitespace-nowrap">
                    {transaction.id}
                  </td>
                  <td className="px-16 py-4 whitespace-nowrap">
                    {transaction.booking_order.yard.yard_name}
                  </td>
                  <td className="px-16 py-4 whitespace-nowrap">
                    {transaction.booking_order.tournament_start} lúc{" "}
                    {transaction.booking_order.slot.start_time}
                  </td>
                  <td className="px-16 py-4 whitespace-nowrap">
                    {transaction.booking_order.tournament_end} lúc{" "}
                    {transaction.booking_order.slot.end_time}
                  </td>
                  <td className="px-16 py-4 whitespace-nowrap">
                    {(transaction.final_price / 100).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td className="px-16 py-4 whitespace-nowrap">
                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                      {transaction.checkin.status === true ? (
                        <Button
                          type="primary"
                          onClick={() => {
                            setSelectPayment(transaction);
                            setShowModal(true);
                          }}
                        >
                          Feedback
                        </Button>
                      ) : (
                        <Tag color="orange">Waiting</Tag>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        title="Feedback"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <FeedbackForm
          form={feedbackForm}
          handleSaveFeedback={handleSaveFeedback}
        />
      </Modal>
    </>
  );
};

export default TransactionHistory;
