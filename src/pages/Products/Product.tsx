import React, { useEffect, useState } from 'react';
import { getProductbyId } from '../../utils/helpers';
import { useNavigate, useParams } from 'react-router-dom';
import { Product, Variant } from './Model';
import { BsHeart } from 'react-icons/bs';
import { BiCart } from 'react-icons/bi';

import Test from './Test';
import { Carousel } from '@material-tailwind/react';

const ProductPage = () => {
  const [productItem, setProductItem] = useState<Product>();
  const [price, setPrice] = useState<Variant>();
  const [quantity, setQuantity] = useState<number>(0);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getAllProducts = async () => {
      if (params.id != undefined) {
        const productFromDB: Product = await getProductbyId(
          params.id
        );
        setProductItem(productFromDB);
      }
    };

    getAllProducts();
  }, []);

  return (
    <div className="p-7">
      <div className="flex gap-5">
        <div className="w-[50%]">
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt="1"
            className="object-cover"
          />
        </div>
        <div className="w-[50%]">
          <div className="flex justify-between items-center">
            <p className="text-2xl">{productItem?.title}</p>
            <BsHeart className="cursor-pointer" />
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
            {productItem?.variants.map((v) => (
              <span className="text-md font-light">
                {v.color} &nbsp; &nbsp;
              </span>
            ))}
          </p>
          <p className="font-semibold mt-2">
            Sizes Available: &nbsp;
            {productItem?.variants.map((v) => (
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
            <button className="flex items-center gap-2 hover:text-lg font-bold py-2 px-4 rounded">
              Add to Cart
              <BiCart />
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
                navigate('/buy-now', {
                  state: {
                    product: productItem,
                    quantity: quantity === 0 ? 1 : quantity,
                    price:
                      price?.price || productItem?.variants[0].price,
                    size:
                      price?.size || productItem?.variants[0].size,
                  },
                });
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
