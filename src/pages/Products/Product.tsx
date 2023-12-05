import React, { useEffect, useState } from 'react';
import {
  getAllReviewsbyId,
  getProductbyId,
} from '../../utils/helpers';
import { useNavigate, useParams } from 'react-router-dom';
import { Product, ReviewModel, Variant } from './Model';
import { BsHeart } from 'react-icons/bs';
import { BiCart } from 'react-icons/bi';

import Test from './Test';
import { Carousel } from '@material-tailwind/react';
import Review from '../../components/Review';
import AddReview from '../../components/AddReview';
import { useDispatch, useSelector } from 'react-redux';
import { useAppContainerSlice } from '../AppContainer/slice';
import { selectAppContainerState } from '../AppContainer/slice/selector';
import { RiHeart3Fill } from 'react-icons/ri';
import { BsCartCheckFill } from 'react-icons/bs';
import { useCookies } from 'react-cookie';

const ProductPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const [productItem, setProductItem] = useState<any>();
  const [price, setPrice] = useState<Variant>();
  const [quantity, setQuantity] = useState<number>(0);
  // const [reviews, setReviews] = useState<ReviewModel[]>();
  const params = useParams();
  const [prodId, setProdId] = useState<string>();

  const disptach = useDispatch();
  const { appContainerActions } = useAppContainerSlice();
  const appContainerStates = useSelector(selectAppContainerState);
  const { wishList, cart, productList, reviews } = appContainerStates;
  const [isWishlistItem, setIsWishlistItem] =
    useState<boolean>(false);
  const [isCartItem, setCartItem] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setProductItem(
      productList.filter((product) => product.id === params.id)[0]
    );

    disptach(appContainerActions.getReviews(params.id));

    setCartItem(
      cart
        .map((cartItem: any) => cartItem.productId)
        .includes(productItem?.id)
    );

    // const getReviews = async () => {
    //   if (params.id !== undefined) {
    //     const reviews = await getAllReviewsbyId(params.id);
    //     setReviews(reviews.data);
    //   }
    // };
    // getReviews();
  });

  useEffect(() => {
    setIsWishlistItem(
      wishList
        .map((wishlist: any) => wishlist.productId)
        .includes(params.id)
    );
    setCartItem(
      cart
        .map((cartItem: any) => cartItem.productId)
        .includes(params.id)
    );
  }, [wishList, cart]);

  const handleCart = async () => {
    const userId = cookies.user_id;
    if (!userId) {
      navigate('/login');
    } else {
      if (!isCartItem) {
        const newCart = {
          userId: userId,
          productId: productItem?.id,
        };
        disptach(appContainerActions.createCartItem(newCart));
      } else {
        const isProductInCart = cart.filter(
          (cart: any) => cart.productId === productItem.id
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

  const handleWishlist = async () => {
    const userId = cookies.user_id;
    if (!userId) {
      navigate('/login');
    } else {
      const isProductInWishlist = wishList.filter(
        (wish: any) => wish.productId === productItem?.id
      )[0];
      const newWishlist = {
        userId: userId,
        productId: productItem?.id,
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
  return (
    <div className="p-7">
      <div className="flex gap-3">
        <div className="w-[50%]">
          {productItem && (
            <img
              src={require(`../../assets/images/${productItem.images[0]}`)}
              alt="1"
              className="object-cover w-[75%] h-[fit]"
            />
          )}
        </div>
        <div className="w-[50%]">
          <div className="flex justify-between">
            <p className="text-2xl">{productItem?.title}</p>
            <div
              className="cursor-pointer"
              onClick={() => {
                handleWishlist();
              }}
            >
              {isWishlistItem ? (
                <RiHeart3Fill className="text-red-700" />
              ) : (
                <BsHeart />
              )}
            </div>
          </div>
          <p className="text-sm font-light">
            <span className="font-semibold">Vendor: </span>
            {productItem?.vendor}
          </p>
          <div className="mt-3">
            <p className="font-semibold">Description:</p>
            <p className="text-md font-light">
              {productItem?.description}
            </p>
          </div>
          <p className="font-semibold mt-2">
            Colors Available: &nbsp;
            {productItem?.variants.map((v: any) => (
              <span className="text-md font-light">
                {v.color} &nbsp; &nbsp;
              </span>
            ))}
          </p>
          <p className="font-semibold mt-2">
            Sizes Available: &nbsp;
            {productItem?.variants.map((v: any) => (
              <span
                className="text-md font-light cursor-pointer"
                onClick={() => {
                  setPrice(v);
                }}
              >
                {v.size} &nbsp; &nbsp;
              </span>
            ))}
          </p>
          {price && (
            <p className="text-md font-light">
              Selected Size: {price?.size}
            </p>
          )}
          <div className="flex justify-around items-center mt-4">
            <p className="font-semibold  text-2xl">
              <span className="font-bold text-2xl">
                ${price?.price || productItem?.variants[0].price}
              </span>
            </p>
            <button
              className="flex items-center gap-2 hover:text-lg font-bold py-2 px-4 rounded"
              onClick={() => {
                handleCart();
              }}
            >
              {isCartItem ? 'Remove from Cart' : 'Add To Cart'}
              {isCartItem ? <BsCartCheckFill /> : <BiCart />}
            </button>
          </div>
          <div className="flex justify-around items-center mt-4">
            <div className="bg-gray-300  text-white font-bold py-2 px-4 rounded flex items-center gap-3">
              <p
                className="font-semibold cursor-pointer"
                onClick={() => {
                  setQuantity(quantity <= 0 ? 0 : quantity - 1);
                }}
              >
                -
              </p>
              <p className="text-black">{quantity}</p>
              <p
                className="font-semibold text-black cursor-pointer"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </p>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                const token = cookies.token;
                if (token) {
                  navigate('/buy-now', {
                    state: {
                      product: productItem,
                      quantity: quantity === 0 ? 1 : quantity,
                      price:
                        price?.price ||
                        productItem?.variants[0].price,
                      size:
                        price?.size || productItem?.variants[0].size,
                    },
                  });
                } else {
                  navigate('/login');
                }
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <section className="mt-5">
        <div>
          <h1 className="text-2xl">Reviews</h1>
          {reviews !== undefined &&
            reviews.map((r) => {
              return (
                <Review
                  name={r.userName}
                  comment={r.review}
                  rating={r.stars}
                />
              );
            })}
        </div>
        <div className="mt-4">
          <h1>Add a Review</h1>
          <AddReview productId={productItem?.id} />
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
