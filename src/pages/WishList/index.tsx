<<<<<<< Updated upstream
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import WishlistCard from '../../Components/WishlistCard';
import { getWishlist } from '../../utils/helpers';

const WishList = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [wishlistProducts, setWishlistProducts] = useState<any>();

  useEffect(() => {
    const getWishListItems = async () => {
      const userId = cookies.user_id;
      const response = await getWishlist(userId);
      setWishlistProducts(response.data);
    };

    getWishListItems();
  }, []);
=======
import React, { useEffect } from "react";
import WishlistCard from "../../components/WishlistCard";

const WishList = () => {
  const wishlistItems = [
    {
      id: 1,
      name: "Product 1",
      description: "Lorem ipsum dolor sit amet.",
      price: 19.99,
      image: "product1.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Consectetur adipiscing elit.",
      price: 29.99,
      image: "product2.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Sed do eiusmod tempor incididunt.",
      price: 39.99,
      image: "product3.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Sed do eiusmod tempor incididunt.",
      price: 39.99,
      image: "product3.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Sed do eiusmod tempor incididunt.",
      price: 39.99,
      image: "product3.jpg",
    },
  ];
>>>>>>> Stashed changes

  useEffect(() => {
    // get wishlisted items from DB and populate it here
  }, []);
  return (
    <div className="container mx-auto my-8">
<<<<<<< Updated upstream
      <h2 className="text-3xl font-bold mb-4 text-center">
        My Wishlist
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
=======
      <h2 className="text-3xl font-bold mb-4 text-center">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
>>>>>>> Stashed changes
        {/* <div className="grid grid-cols-12 gap-6"> */}
        {wishlistProducts !== undefined &&
          wishlistProducts.map((item: any) => (
            <WishlistCard item={item} />
          ))}
      </div>
    </div>
  );
};

export default WishList;
