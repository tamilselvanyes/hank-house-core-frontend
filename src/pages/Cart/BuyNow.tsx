import React, { useEffect, useState } from 'react';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate, useLocation } from 'react-router-dom';
import Items from './Items';
import { useLabels } from '@headlessui/react/dist/components/label/label';

const BuyNow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [subTotal, setSubTotal] = useState<number>();
  const [total, setTotal] = useState<number>();
  useEffect(() => {
    console.log(location.state);
    setSubTotal(location.state.quantity * location.state.price);
  }, []);

  const handleShipping = (e: any) => {
    const shipping = e.target.value;
    console.log(shipping);
    if (shipping === 'standard') {
      subTotal && setTotal(5 + subTotal);
    } else if (shipping === 'express') {
      subTotal && setTotal(10 + subTotal);
    } else {
      subTotal && setTotal(20 + subTotal);
    }
  };
  return (
    <div className="w-[100%] p-4">
      <div className="main-container">
        <div className="left-container">
          <h2>Shopping Cart</h2>
          <div className="divider"></div>
          <div className="headings">
            <div className="left-heading">
              <h3>Products Details</h3>
            </div>
            {/* <div className="right-heading">
              <h3>Quantity</h3>
              <h3>Price</h3>
              <h3>Total</h3>
            </div> */}
          </div>
          <div className="items-container p-6">
            <Items
              product={location.state.product}
              price={location.state.price}
              quantity={location.state.quantity}
              size={location.state.size}
            />
          </div>
          <button
            className="cnt-btn"
            onClick={() => {
              navigate('/products');
            }}
          >
            <HiOutlineArrowNarrowLeft className="icon" /> Continue
            Shopping
          </button>
        </div>
        <div className="right-container">
          <h2>Order Summary</h2>
          <div className="divider"></div>
          <div className="headings">
            <h3>items Cost</h3>
            <h3>${subTotal}</h3>
          </div>
          <div className="shipping-container">
            <h3>shipping</h3>
            <select
              name="shippingMethod"
              id="shippingMethod"
              onChange={(e) => {
                handleShipping(e);
              }}
            >
              <option value="standard" defaultChecked>
                Standard Delivery - $5
              </option>
              <option value="express">Express Shipping - $10</option>
              <option value="overnight">
                Overnight Shipping - $20
              </option>
            </select>
          </div>
          <div className="promo-container">
            <h3>promo code</h3>
            <input type="text" placeholder="Enter Promo Code" />
            <button className="apply-btn">apply</button>
            <div className="divider"></div>
          </div>
          <div className="headings">
            <h3>Total cost</h3>
            <h3>${total?.toFixed(2)}</h3>
          </div>
          <button className="checkout-btn">checkout</button>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
