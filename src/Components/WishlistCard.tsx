import React, { useEffect, useState } from 'react';
import { Product } from '../pages/Products/Model';
import { getProductbyId } from '../utils/helpers';

interface WishlistItem {
  userId: string;
  productId: string;
}

interface WishlistCardProps {
  item: WishlistItem;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ item }) => {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const getProduct = async () => {
      const productId = item.productId;
      const productFromDB: Product = await getProductbyId(productId);
      console.log('the wishlisted product', productFromDB);
      productFromDB !== undefined && setProduct(productFromDB);
    };

    getProduct();
  }, []);
  return (
    // <div className="max-w-sm rounded overflow-hidden shadow-lg">
    //   <img className="w-full" src={item.image} alt={item.name} />
    //   <div className="px-6 py-4">
    //     <div className="font-bold text-xl mb-2">{item.name}</div>
    //     <p className="text-gray-700 text-base">{item.description}</p>
    //     <p className="text-gray-900 text-xl mt-2">${item.price}</p>
    //   </div>
    //   <div className="flex justify-between mt-4">
    //     <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    //       Add to Cart
    //     </button>
    //     <button className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
    //       Remove
    //     </button>
    //   </div>
    // </div>
    <div
      className="w-80 h-[580px] mt-10  p-3 rounded-lg bg-[#f4f6f4] flex flex-col items-center gap-3 cursor-pointer"
      // onClick={() => {
      //   navigate(`/product/${props.product.id}`);
      // }}
    >
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
          <button className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
