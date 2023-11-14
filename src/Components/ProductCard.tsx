import React, { useState } from 'react';
import { BsHeart } from 'react-icons/bs';

export interface ProductCardProps {
  productTitle: string;
  productDesc: string;
  productImg: string;
  productPrice: number;
}

const ProductCard = (props: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState();
  return (
    <div className="w-80 h-[580px] mt-10  p-3 rounded-lg bg-[#f4f6f4] flex flex-col items-center gap-2 cursor-pointer">
      <img
        src={props.productImg}
        alt="product"
        className="h-[420px] object-cover"
      />
      <div className="w-[100%]">
        <p className="text-lg">{props.productTitle}</p>
        <p className="italic text-sm text-slate-600">
          {props.productDesc}
        </p>
        <p>${props.productPrice}</p>
        <div className="flex align-middle justify-between">
          <button onClick={() => {}}>
            <BsHeart />
          </button>
          <button className="bg-[#228706] p-2 rounded-md text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
