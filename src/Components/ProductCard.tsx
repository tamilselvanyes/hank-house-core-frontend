import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { BsHeart } from 'react-icons/bs';
import { RiHeart3Fill } from 'react-icons/ri';
import { Product } from '../pages/Products/Model';
import { useNavigate } from 'react-router-dom';
import {
  createWishlist,
  getWishlist,
  removeFromWishlist,
} from '../utils/helpers';

export interface ProductCardProps {
  product: Product;
}

const ProductCard = (props: ProductCardProps) => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const [wishlisted, setWishlisted] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleWishlist = async () => {
    const userId = cookies.user_id;
    if (!userId) {
      navigate('/login');
    } else {
      const wishList = await getWishlist(userId);
      if (!wishlisted) {
        const makeWishList = await createWishlist(
          userId,
          props.product.id
        );
        if (makeWishList.status == 201) setWishlisted(true);
      } else {
        const deleteItem = await removeFromWishlist(props.product.id);
        setWishlisted(false);
      }
    }
  };

  const handleCart = async () => {
    const userId = cookies.user_id;
    if (!userId) {
      navigate('/login');
    } else {
      // const
    }
  };

  useEffect(() => {
    const getWishlisted = async () => {
      const userId = cookies.user_id;
      const response = await getWishlist(userId);
      const isProductIdIncluded = response.data.some(
        (item: any) => item.productId === props.product.id
      );
      isProductIdIncluded && setWishlisted(true);
    };

    getWishlisted();
  }, [wishlisted]);

  return (
    <div className="w-80 h-[580px] mt-10  p-3 rounded-lg bg-[#f4f6f4] flex flex-col items-center gap-2 cursor-pointer">
      <img
        src={props.product.images[0]}
        alt="product"
        className="h-[420px] object-cover"
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
              {wishlisted ? <RiHeart3Fill /> : <BsHeart />}
            </button>
          </div>
          <button className="bg-[#228706] p-2 rounded-md text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
