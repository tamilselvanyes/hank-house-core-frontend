import React, { useEffect, useState } from 'react';
import { Product } from '../Products/Model';
import { IoIosClose } from 'react-icons/io';
import { IoAdd } from 'react-icons/io5';
import { useAppContainerSlice } from '../AppContainer/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppContainerState } from '../AppContainer/slice/selector';
import { Cookies, useCookies } from 'react-cookie';

// interface ItemsProps {
//   product: Product;
//   quantity: number;
//   price: number;
//   size: string;
// }

interface ItemsProps {
  cartId: string;
  productId: string;
  quantity: string;
  size?: string;
  price?: string;
}

const Items = (props: ItemsProps) => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const [product, setProduct] = useState<any>();

  const dispatch = useDispatch();
  const { appContainerActions } = useAppContainerSlice();
  const appContainerStates = useSelector(selectAppContainerState);
  const { cart, productList } = appContainerStates;

  useEffect(() => {
    const product = productList.find(
      (prod) => prod.id === props.productId
    );
    setProduct(product);
  });

  console.log('product image path', product?.images[0]);

  return (
    <div className="bg-slate-300 rounded-md w-[100%] h-[fit] mb-3">
      <div className="p-3 py-3">
        <div className="w-[100%] flex flex-row justify-end">
          <IoIosClose
            onClick={() => {
              //call the delete cart button
              const userId = cookies.user_id;
              const body = {
                userId: userId,
                cartId: props.cartId,
              };
              dispatch(appContainerActions.removeCartItem(body));
            }}
          />
        </div>

        <div>
          {product !== undefined && (
            <img
              src={require(`../../assets/images/products/${product?.images[0]}`)}
              alt="product img"
              width={'80px'}
              height={'40px'}
            />
          )}

          <div className="flex justify-between">
            <h4 className="italic font-light">
              Title:
              <span className="text-md font-sans font-medium not-italic">
                {product?.title}
              </span>
            </h4>
            <div>
              <h4 className="italic font-light">
                Qty:&nbsp;
                {props.quantity > '1' && (
                  <span
                    className="font-normal text-lg cursor-pointer"
                    onClick={() => {
                      //event to reduce quantity
                      const userId = cookies.user_id;
                      const body = {
                        userId: userId,
                        id: props.cartId,
                        action: 'decrease',
                      };
                      if (props.quantity > '1') {
                        dispatch(
                          appContainerActions.updateCartItemQuantity(
                            body
                          )
                        );
                      }
                    }}
                  >
                    -
                  </span>
                )}
                <span className="text-md font-sans font-medium not-italic">
                  {' '}
                  {props.quantity}{' '}
                </span>
                <span
                  className="font-normal text-lg cursor-pointer"
                  onClick={() => {
                    //call to increase quantity
                    const userId = cookies.user_id;
                    const body = {
                      userId: userId,
                      id: props.cartId,
                      action: 'increase',
                    };
                    dispatch(
                      appContainerActions.updateCartItemQuantity(body)
                    );
                  }}
                >
                  +
                </span>
              </h4>
            </div>
          </div>
          <div className="flex justify-between ">
            <h4 className="italic font-light">
              Size:
              <span className="text-md font-sans font-medium not-italic">
                {product?.variants[0].size}
              </span>
            </h4>
            <h4 className="italic font-light">
              Price:
              <span className="text-md font-sans font-medium not-italic">
                ${product?.variants[0].price}
              </span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
