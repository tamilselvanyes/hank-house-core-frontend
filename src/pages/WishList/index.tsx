import React from 'react';
import WishlistCard from '../../Components/WishlistCard';

const WishList = () => {
  const wishlistItems = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Lorem ipsum dolor sit amet.',
      price: 19.99,
      image: 'product1.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Consectetur adipiscing elit.',
      price: 29.99,
      image: 'product2.jpg',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Sed do eiusmod tempor incididunt.',
      price: 39.99,
      image: 'product3.jpg',
    },
  ];
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-4 text-center">
        My Wishlist
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlistItems.map((item) => (
          <WishlistCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default WishList;
