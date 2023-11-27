import React from 'react';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
    const navigate = useNavigate();
  return (
    <div className="confirmation-page">
      <h2>Payment Successful</h2>
      <p>Thank you for your purchase! Your payment was successful.</p>
      <button className="cnt-btn" onClick={() => navigate('/products')}>
        <HiOutlineArrowNarrowLeft className="icon" /> Continue Shopping
      </button>
    </div>
  );
};

export default ConfirmationPage;
