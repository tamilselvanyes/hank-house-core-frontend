import React, { useEffect } from 'react';
import { BiShoppingBag } from 'react-icons/bi';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppContainerSlice } from '../AppContainer/slice';
import { selectAppContainerState } from '../AppContainer/slice/selector';
import { useCookies } from 'react-cookie';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

  const dispatch = useDispatch();
  const { appContainerActions } = useAppContainerSlice();
  const appContainerStates = useSelector(selectAppContainerState);
  const { cart, orders } = appContainerStates;

  useEffect(() => {
    console.log('here is the place where i add orders');
  }, []);

  function createOrder() {
    if (cart.length !== 0) {
      const body = {
        userId: cookies.user_id,
        orders: cart,
      };
      dispatch(appContainerActions.createOrders(body));
    }
    navigate('/products');
  }

  return (
    <div className="pt-10">
      <div className="confirmation-page text-center">
        <div className="flex items-center mb-4 justify-center">
          <BiShoppingBag className="text-4xl" />
        </div>
        <h2 className="font-bold text-2xl">
          Order booked Successfully
        </h2>
        <p>
          Thank you for your purchase! Your payment was successful.
        </p>
        <p>"Embrace the timeless elegance of traditional attire."</p>
        <button
          className="cnt-btn mt-4"
          onClick={() => createOrder()}
        >
          <HiOutlineArrowNarrowLeft className="icon" /> Continue
          Shopping
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
