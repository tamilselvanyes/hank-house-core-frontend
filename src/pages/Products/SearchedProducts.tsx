import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

interface PropTypes {
  products: any;
}

const SearchedProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      {location.state.products.length !== 0 ? (
        <section className="px-5 py-5">
          <h2 className="text-3xl">Products you searched for!</h2>
          <div className="grid grid-cols-4 gap-4">
            {location.state.products.map((p: any) => (
              <ProductCard product={p} />
            ))}
          </div>
        </section>
      ) : (
        <div>
          <h1 className="p-5 text-3xl mt-4">No products found!</h1>
          <button
            className="cnt-btn mt-4"
            onClick={() => {
              navigate('/products');
            }}
          >
            <HiOutlineArrowNarrowLeft className="icon" /> Continue
            Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchedProducts;
