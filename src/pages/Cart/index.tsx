import React from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

const Cart = () => {
  return (
    <div className="w-100 p-4">
      <div className="main-container">
        <div className="left-container">
          <h2>Shopping Cart</h2>
          <div className="divider"></div>
          <div className="headings">
            <div className="left-heading">
              <h3>Products Details</h3>
            </div>
            <div className="right-heading">
              <h3>Quantity</h3>
              <h3>Price</h3>
              <h3>Total</h3>
            </div>
          </div>
          <div className="items-container"></div>
          <button className="cnt-btn">
            <HiOutlineArrowNarrowLeft className="icon" /> Continue Shopping
          </button>
        </div>
        <div className="right-container">
          <h2>Order Summary</h2>
          <div className="divider"></div>
          <div className="headings">
            <h3>
              items <span>3</span>
            </h3>
            <h3>$567</h3>
          </div>
          <div className="shipping-container">
            <h3>shipping</h3>
            <select name="shippingMethod" id="shippingMethod">
              <option value="standard">Standard Delivery - $5</option>
              <option value="express">Express Shipping - $10</option>
              <option value="overnight">Overnight Shipping - $20</option>
            </select>
          </div>
          <div className="promo-container">
            <h3>promo code</h3>
            <input type="text" placeholder="Enter Promo Code" />
            <button className="apply-btn">apply</button>
            <div className="divider"></div>
          </div>
          <div className="headings">
            <h3>total cost</h3>
            <h3>$577</h3>
          </div>

          <button className="checkout-btn">checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
