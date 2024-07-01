import React, { useEffect, useState } from 'react';
import { getTransactionOfUser } from '../../services/paymentAPI';
import { account } from '../../services/authAPI'

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    

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

    const toggleTournamentStatus = (index) => {
        const updatedTransactions = [...transactions];
        updatedTransactions[index].istournament = !updatedTransactions[index].istournament;
        setTransactions(updatedTransactions);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTransactions = transactions.filter((transaction) =>
        Object.values(transaction).some((value) =>
            typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Transaction History</h1>
            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tournament</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredTransactions.map((transaction, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="px-6 py-4 whitespace-nowrap">{transaction.booking_order_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{transaction.yard_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(transaction.booking_at).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{`${transaction.slot_start_time}`}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{`${transaction.slot_end_time}`}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{transaction.final_price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                        <input
                                            type="checkbox"
                                            id={`toggle${index}`}
                                            name={`toggle${index}`}
                                            checked={transaction.istournament}
                                            onChange={() => toggleTournamentStatus(index)}
                                            className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer  ${transaction.istournament ? 'bg-green-500' : 'bg-red-500'}`}
                                            readOnly
                                        />
                                        <label
                                            htmlFor={`toggle${index}`}
                                            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                        ></label>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionHistory;
