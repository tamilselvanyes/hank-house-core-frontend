import React from 'react';

interface CartItem {
  quantity: number;
  price: number;
}

interface OrderSummaryProps {
  cartItems: CartItem;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems }) => {
  return (
    <div className="order-summary">
      <h3>Items: {cartItems.quantity}</h3>
      <h3>Total: ${cartItems.price}</h3>
      {/* You can add more details or format the display as needed */}
    </div>
  );
};

export default OrderSummary;
