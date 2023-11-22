import React from 'react';

interface WishlistItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface WishlistCardProps {
  item: WishlistItem;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ item }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={item.image} alt={item.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{item.name}</div>
        <p className="text-gray-700 text-base">{item.description}</p>
        <p className="text-gray-900 text-xl mt-2">${item.price}</p>
      </div>
      <div className="flex justify-between mt-4">
        <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add to Cart
        </button>
        <button className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Remove
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
