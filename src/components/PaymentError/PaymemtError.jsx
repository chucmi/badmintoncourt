import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const PaymentError = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); 
    }, 5000); 

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <Result
      status="error"
      title="Payment Error"
      subTitle="Sorry, there was an issue with your payment. Please try again."
      extra={<Button type="primary" onClick={() => navigate('/home')}>Try Again</Button>}
    />
  );
};

export default PaymentError;
