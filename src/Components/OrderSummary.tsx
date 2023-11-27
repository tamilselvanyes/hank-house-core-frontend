import React from 'react';

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummaryProps {
  cartItems: CartItem[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems }) => {
  return (
    <div className="order-summary">
      <h3>Items: {cartItems.length}</h3>
      <h3>Total: ${cartItems.reduce((total, item) => total + item.quantity * item.price, 0)}</h3>
      {/* You can add more details or format the display as needed */}
    </div>
  );
};

export default OrderSummary;
