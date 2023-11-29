import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { Product } from '../pages/Products/Model';
import { getProductbyId } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { useAppContainerSlice } from '../pages/AppContainer/slice';
import { selectAppContainerState } from '../pages/AppContainer/slice/selector';

interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
}

interface WishlistCardProps {
  item: WishlistItem;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ item }) => {
  const [product, setProduct] = useState<Product>();
  const [cookies, setCookie, removeCookie] = useCookies();

  const { appContainerActions } = useAppContainerSlice();
  const disptach = useDispatch();
  const appContainerStates = useSelector(selectAppContainerState);
  const { wishList } = appContainerStates;

  useEffect(() => {
    const getProduct = async () => {
      const productId = item.productId;
      const productFromDB: Product = await getProductbyId(productId);
      productFromDB !== undefined && setProduct(productFromDB);
    };

    getProduct();
  }, []);
  return (
    <div className="w-80 h-[580px] mt-10  p-3 rounded-lg bg-[#f4f6f4] flex flex-col items-center gap-3 cursor-pointer">
      <img
        src={''}
        alt="product"
        className="h-[420px] object-cover"
      />
      <img
        src={''}
        alt="product"
        className="h-[420px] object-cover"
      />
      <div className="w-[100%]">
        <p className="text-lg">{product?.title}</p>
        <p className="italic text-sm text-slate-600">
          {product?.description}
        </p>
        <p>$ {product?.variants[0].price} </p>
        <div className="flex align-middle justify-between mt-2">
          <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
          <button
            className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              const userId = cookies.user_id;
              console.log('item id', item.id);
              disptach(
                appContainerActions.removeWishList({
                  userId: userId,
                  wishlistId: item.id,
                })
              );
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
