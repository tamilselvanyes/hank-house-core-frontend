import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import WishlistCard from "../../components/WishlistCard";
import { getWishlist } from "../../utils/helpers";

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

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-4 text-center">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* <div className="grid grid-cols-12 gap-6"> */}
        {wishlistProducts !== undefined &&
          wishlistProducts.map((item: any) => <WishlistCard item={item} />)}
      </div>
    </div>
  );
};

export default WishList;
