import React from 'react';
import { Product } from '../Products/Model';

interface ItemsProps {
  product: Product;
  quantity: number;
  price: number;
  size: string;
}

const ItemsBuyNow = (props: ItemsProps) => {
  return (
    <div className="bg-slate-300 rounded-md w-[100%] h-[fit] ">
      <div className="p-3 py-3">
        {/* <div className="w-[100%] flex flex-row justify-end">
          <IoIosClose
            onClick={() => {
              //call the delete cart button
            }}
          />
        </div> */}
        <img
          src={require(`../../assets/images/products/${props.product.images[0]}`)}
          alt="product img"
          width={'80px'}
          height={'40px'}
        />
        <div className="flex justify-between">
          <h4 className="italic font-light">
            Title:
            <span className="text-md font-sans font-medium not-italic">
              {props.product.title}
            </span>
          </h4>
          <div>
            <h4 className="italic font-light">
              Quantity:&nbsp;
              {/* <span
                className="font-normal text-lg cursor-pointer"
                onClick={() => {
                  //event to reduce quantity
                }}
              >
                -
              </span> */}
              <span className="text-md font-sans font-medium not-italic">
                {' '}
                {props.quantity}{' '}
              </span>
              {/* <span
                className="font-normal text-lg cursor-pointer"
                onClick={() => {
                  //call to increase quantity
                }}
              >
                +
              </span> */}
            </h4>
          </div>
        </div>
        <div className="flex justify-between ">
          <h4 className="italic font-light">
            Size:
            <span className="text-md font-sans font-medium not-italic">
              {props.size}
            </span>
          </h4>
          <h4 className="italic font-light">
            Price:
            <span className="text-md font-sans font-medium not-italic">
              {props.price}
            </span>
          </h4>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default ItemsBuyNow;
