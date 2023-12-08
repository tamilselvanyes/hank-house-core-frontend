import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { Product } from '../pages/Products/Model';
import { getProductbyId } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { useAppContainerSlice } from '../pages/AppContainer/slice';
import { selectAppContainerState } from '../pages/AppContainer/slice/selector';

interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
}

interface WishlistCardProps {
  item: WishlistItem;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ item }) => {
  const [product, setProduct] = useState<any>();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isCartItem, setCartItem] = useState(false);

  const { appContainerActions } = useAppContainerSlice();
  const disptach = useDispatch();
  const appContainerStates = useSelector(selectAppContainerState);
  const { wishList, cart, productList } = appContainerStates;

  useEffect(() => {
    setProduct(
      productList.filter(
        (product) => product.id === item.productId
      )[0]
    );

    setCartItem(
      cart
        .map((cartItem: any) => cartItem.productId)
        .includes(item.productId)
    );
  }, []);
  useEffect(() => {
    setProduct(
      productList.filter(
        (product) => product.id === item.productId
      )[0]
    );

    setCartItem(
      cart
        .map((cartItem: any) => cartItem.productId)
        .includes(item.productId)
    );
  }, [cart]);

  return (
    <div className="w-80 h-[fit] mt-10  p-3 rounded-lg bg-[#f4f6f4] flex flex-col items-center gap-3 cursor-pointer">
      {/* <img
        src={''}
        alt="product"
        className="h-[420px] object-cover"
      /> */}
      {product != undefined && (
        <img
          src={require(`../assets/images/products/${product.images[0]}`)}
          alt="product"
          className="h-[420px] object-cover"
        />
      )}
      <div className="w-[100%]">
        <p className="text-lg">{product?.title}</p>
        <p className="italic text-sm text-slate-600">
          {product?.description}
        </p>
        <p>$ {product?.variants[0].price} </p>
        <div className="flex align-middle justify-between mt-2">
          <button
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              const userId = cookies.user_id;
              if (!isCartItem) {
                const newCart = {
                  userId: userId,
                  productId: item.productId,
                };
                disptach(appContainerActions.createCartItem(newCart));
              } else {
                const isProductInCart = cart.filter(
                  (cart: any) => cart.productId === item.productId
                )[0];
                disptach(
                  appContainerActions.removeCartItem({
                    userId: userId,
                    cartId: isProductInCart.id,
                  })
                );
              }
            }}
          >
            {isCartItem ? 'Remove from Cart' : 'Add To Cart'}
          </button>
          <button
            className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              const userId = cookies.user_id;
              disptach(
                appContainerActions.removeWishList({
                  userId: userId,
                  wishlistId: item.id,
                })
              );
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
