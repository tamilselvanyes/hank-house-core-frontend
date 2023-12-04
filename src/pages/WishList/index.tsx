import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import WishlistCard from '../../components/WishlistCard';
import { useDispatch, useSelector } from 'react-redux';
import { useAppContainerSlice } from '../AppContainer/slice/index';
import { selectAppContainerState } from '../AppContainer/slice/selector';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const WishList = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [wishlistProducts, setWishlistProducts] = useState<any>();
  const navigate = useNavigate()
  const { appContainerActions } = useAppContainerSlice();
  // const disptach = useDispatch();
  const appContainerStates = useSelector(selectAppContainerState);
  const { wishList } = appContainerStates;

  useEffect(() => {}, []);

  return (
    <div className="container mx-auto my-8">
      {wishList.length !== 0 ? (
        <>
          <h2 className="text-3xl font-bold mb-4 text-center">
            My Wishlist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {/* <div className="grid grid-cols-12 gap-6"> */}
            {wishList !== undefined &&
              wishList.map((item: any) => (
                <WishlistCard item={item} />
              ))}
          </div>
        </>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-4 text-center">
            Your Wishlist is empty
          </h2>
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
      )}
    </div>
  );
};

export default WishList;
