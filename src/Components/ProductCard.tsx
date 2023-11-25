import React, { useState } from 'react';
import { BsHeart } from 'react-icons/bs';
import { Product } from '../pages/Products/Model';
import { useNavigate } from 'react-router-dom';

export interface ProductCardProps {
  product: Product;
}

const ProductCard = (props: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState();
  const navigate = useNavigate();
  console.log(props.product);
  return (
    <div
      className="w-80 h-[580px] mt-10  p-3 rounded-lg bg-[#f4f6f4] flex flex-col items-center gap-2 cursor-pointer"
      onClick={() => {
        navigate(`/product/${props.product.id}`);
      }}
    >
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
