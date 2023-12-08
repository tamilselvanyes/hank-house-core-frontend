import React, { useEffect, useState } from 'react';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate, useLocation } from 'react-router-dom';
import Items from './Items';
import { selectAppContainerState } from '../AppContainer/slice/selector';
import { useSelector } from 'react-redux';
import { useAppContainerSlice } from '../AppContainer/slice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { promoCodes } from '../../utils/constant';

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [subTotal, setSubTotal] = useState<number>();
  const [total, setTotal] = useState<number>();
  const [discountedTotal, setDiscountedTotal] = useState<number>();
  const [delivery, setDelivery] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [qty, setQty] = useState(0);
  const [percent, setPercent] = useState('');

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
    
    totalPrice!==0 && setTotal(totalPrice + 5);
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
            <h3>${subTotal?.toFixed(2)}</h3>
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
            <input
              type="text"
              placeholder="Enter Promo Code"
              value={promoCode}
              onChange={(e) => {
                setPercent('');
                setPromoApplied(false);
                setPromoCode(e.currentTarget.value);
              }}
            />
            <button
              className="apply-btn"
              onClick={() => {
                if (promoCode !== '') {
                  const code = promoCodes.filter(
                    (p) => p.code === promoCode.toLowerCase()
                  );
                  if (
                    code.length !== 0 &&
                    code[0].code === promoCode.toLowerCase()
                  ) {
                    setPromoApplied(true);
                    total !== undefined &&
                      setDiscountedTotal(total * code[0].discount);
                    setPercent(code[0].percent);
                    toast.success('Promo code applied successful!');
                  } else {
                    toast.error(`Enter valid promo code`);
                  }
                } else {
                  toast.error(`Please enter promo code`);
                }
              }}
            >
              apply
            </button>
            <div className="divider"></div>
          </div>
          {promoApplied && (
            <div className="headings">
              <h3>Promo Code Applied</h3>
              <p className="font-light">
                {promoCode}({percent})
              </p>
            </div>
          )}
          <div className="headings">
            <h3>Total cost</h3>
            <div className="flex gap-1">
              {promoApplied && <p>${discountedTotal?.toFixed(2)}</p>}
              <p
                className={
                  promoApplied ? 'line-through' : 'no-underline'
                }
              >
                ${total?.toFixed(2)}
              </p>
            </div>
          </div>
          <button
            className="checkout-btn"
            onClick={() =>
              navigate('/checkout', {
                state: {
                  price: promoApplied ? discountedTotal : total,
                  delivery: delivery,
                  quantity: qty,
                  promoCode:promoCode
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
