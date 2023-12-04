import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppContainerSlice } from '../AppContainer/slice';
import { selectAppContainerState } from '../AppContainer/slice/selector';

interface OrderItemsProps {
  productId: string;
  quantity: number;
}

const OrderItems = (props: OrderItemsProps) => {
  const dispatch = useDispatch();
  const { appContainerActions } = useAppContainerSlice();
  const appContainerStates = useSelector(selectAppContainerState);
  const { productList } = appContainerStates;

  const [product, setProduct] = useState<any>();

  useEffect(() => {
    const product = productList.find(
      (prod) => prod.id === props.productId
    );
    setProduct(product);
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={require('../../assets/images/category-men.png')}
            alt="Product"
            className="h-16 w-16 object-cover mr-4"
          />
          <div>
            <h2 className="text-xl font-medium">{product?.title}</h2>
            <p className="text-gray-600">
              Size: {product?.variants[0].size}
            </p>
          </div>
        </div>
        <div>
          <p className="text-gray-800 text-xl">
            ${product?.variants[0].price}
          </p>
          <p className="text-gray-600">Qty: {props.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItems;
