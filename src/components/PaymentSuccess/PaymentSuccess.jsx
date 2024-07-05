import React, { useEffect } from 'react';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white pt-10">
      <div className="w-full max-w-md p-4">
        <Result
          status="success"
          title="Payment Successful!"
          subTitle={
            <>
              <p>Thank you for your payment!</p>
              <p>Your badminton court booking has been confirmed.</p>
            </>
          }
        />
        <div className="mt-4 flex justify-center space-x-4">
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Go Home
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
