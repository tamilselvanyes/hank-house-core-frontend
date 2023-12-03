import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BsHeart } from 'react-icons/bs';
import { RiHeart3Fill } from 'react-icons/ri';
import { Product } from '../pages/Products/Model';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppContainerState } from '../pages/AppContainer/slice/selector';
import { useAppContainerSlice } from '../pages/AppContainer/slice';

export interface ProductCardProps {
  product: Product;
}

const ProductCard = (props: ProductCardProps) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const disptach = useDispatch();
  const { appContainerActions } = useAppContainerSlice();
  const appContainerStates = useSelector(selectAppContainerState);
  const { wishList, cart } = appContainerStates;
  const [isWishlistItem, setIsWishlistItem] =
    useState<boolean>(false);
  const [isCartItem, setCartItem] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsWishlistItem(
      wishList
        .map((wishlist: any) => wishlist.productId)
        .includes(props.product.id)
    );
    setCartItem(
      cart
        .map((cartItem: any) => cartItem.productId)
        .includes(props.product.id)
    );
  }, [wishList, cart]);

  const handleWishlist = async () => {
    const userId = cookies.user_id;
    if (!userId) {
      navigate('/login');
    } else {
      const isProductInWishlist = wishList.filter(
        (wish: any) => wish.productId === props.product.id
      )[0];
      const newWishlist = {
        userId: userId,
        productId: props.product.id,
      };

      if (!isProductInWishlist) {
        disptach(appContainerActions.createWishlist(newWishlist));
      } else {
        disptach(
          appContainerActions.removeWishList({
            userId: userId,
            wishlistId: isProductInWishlist.id,
          })
        );
      }
    }
  };

  const handleCart = async () => {
    const userId = cookies.user_id;
    if (!userId) {
      navigate('/login');
    } else {
      if (!isCartItem) {
        const newCart = {
          userId: userId,
          productId: props.product.id,
        };
        disptach(appContainerActions.createCartItem(newCart));
      } else {
        const isProductInCart = cart.filter(
          (cart: any) => cart.productId === props.product.id
        )[0];
        disptach(
          appContainerActions.removeCartItem({
            userId: userId,
            cartId: isProductInCart.id,
          })
        );
      }
    }
  };

  return (
    <div className="w-80 h-[580px] mt-10  p-3 rounded-lg bg-[#f4f6f4] flex flex-col items-center gap-2 cursor-pointer">
      <img
        src={require(`../assets/images/${props.product.images[0]}`)}
        alt="product"
        className="h-[420px] object-cover"
        onClick={() => {
          navigate(`/product/${props.product.id}`);
        }}
      />
      <div className="w-[100%]">
        <p className="text-lg">{props.product.title}</p>
        <p className="italic text-sm text-slate-600">
          {props.product.description}
        </p>
        <p>$ {props.product.variants[0].price} </p>
        <div className="flex align-middle justify-between">
          <div
            onClick={() => {
              handleWishlist();
            }}
          >
            <button>
              {isWishlistItem ? (
                <RiHeart3Fill className="text-red-700" />
              ) : (
                <BsHeart />
              )}
            </button>
          </div>
          <button
            className="bg-[#228706] p-2 rounded-md text-white"
            onClick={() => {
              handleCart();
            }}
          >
            {isCartItem ? 'Remove from Cart' : 'Add To Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
