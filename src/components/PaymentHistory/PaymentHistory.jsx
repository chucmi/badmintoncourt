import React, {useState, useEffect} from "react";
import { getPayments } from "../../services/paymentAPI";

const PaymentHistory = () => {
  // const dataFake = [
  //   {
  //     id: 1,
  //     final_price: 70000,
  //     booking_order_id: 1,
  //     istournament: true
  //   },
  //   {
  //     id: 2,
  //     final_price: 70000,
  //     booking_order_id: 2,
  //     istournament: true
  //   },
  //   {
  //     id: 3,
  //     final_price: 70000,
  //     booking_order_id: 3,
  //     istournament: false
  //   }
  // ];

  const [payments, setPayments] = useState([]);
  useEffect(() => {
    const fetchPayments = async () => {
      const data = await getPayments();
      if (data) {
        
        setPayments(data);
      }
    };
    fetchPayments();
  }, []);
  return (
    <div className="flex flex-col h-fit pt-16 justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Payment History</h1>
      <div className="w-3/4 bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Final Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Booking Order
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tournament
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.final_price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.booking_order_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.istournament ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentHistory;
