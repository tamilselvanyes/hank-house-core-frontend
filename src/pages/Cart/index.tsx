import React, { useEffect, useState } from 'react';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate, useLocation } from 'react-router-dom';
import Items from './Items';
import { selectAppContainerState } from '../AppContainer/slice/selector';
import { useSelector } from 'react-redux';
import { useAppContainerSlice } from '../AppContainer/slice';

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [subTotal, setSubTotal] = useState<number>();
  const [total, setTotal] = useState<number>();
  const [delivery, setDelivery] = useState('');
  const [qty, setQty] = useState(0);

  const { appContainerActions } = useAppContainerSlice();
  const appContainerStates = useSelector(selectAppContainerState);
  const { cart, productList } = appContainerStates;

  useEffect(() => {
    calcultePrice();
  }, []);
  useEffect(() => {
    calcultePrice();
  }, [cart]);

  function calcultePrice() {
    let totalPrice: number = 0;
    let qty = 0;
    cart.forEach((cartItem) => {
      // Find the corresponding product based on productId
      const product = productList.find(
        (p) => p.id === cartItem.productId
      );
      if (product) {
        totalPrice += cartItem.quantity * product.variants[0].price;
        qty += cartItem.quantity;
      }
    });
    setSubTotal(totalPrice);
    setQty(qty);
  }

  const handleShipping = (e: any) => {
    const shipping = e.target.value;
    console.log(shipping);
    if (shipping === 'standard') {
      subTotal && setTotal(5 + subTotal);
      setDelivery('standard');
    } else if (shipping === 'express') {
      subTotal && setTotal(10 + subTotal);
      setDelivery('express');
    } else {
      subTotal && setTotal(20 + subTotal);
      setDelivery('overnight');
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
          <div className="items-container p-6 ">
            {cart.map((item: any) => (
              <Items
                cartId={item.id}
                productId={item.productId}
                quantity={item.quantity}
                key={item.id}
              />
            ))}
            {cart.length === 0 && (
              <h2 className="text-center">
                Please add items to Cart
              </h2>
            )}
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
          <button
            className="checkout-btn"
            onClick={() =>
              navigate('/checkout', {
                state: {
                  price: total,
                  delivery: delivery,
                  quantity: qty,
                },
              })
            }
          >
            checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
