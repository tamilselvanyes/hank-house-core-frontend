import React from 'react';
import { Product } from '../Products/Model';

interface ItemsProps {
  product: Product;
  quantity: number;
  price: number;
  size: string;
}

const Items = (props: ItemsProps) => {
  return (
    <div className="bg-slate-300 rounded-md w-[100%] h-[80px]">
      <div className="flex justify-between items-center p-3">
        <div>
          <p>{props.product.title}</p>
          <p>Size: {props.size}</p>
        </div>
        <div>
          <p>Quantity: {props.quantity}</p>
          <p>Price: ${props.quantity * props.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Items;
