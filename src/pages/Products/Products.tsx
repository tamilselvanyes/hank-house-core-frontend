import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProductCard from '../../Components/ProductCard';
import {
  Products as ProductsItems,
  IProductsTypes,
} from '../../constant';
import { getProducts } from '../../utils/helpers';
import { Product } from './Model';

const Products = () => {
  // const [selectedPrice, setSelectedPrice] = useState();
  const [products, setProducts] = useState<Product[]>();
  const params = useParams();
  const location = useLocation();
  useEffect(() => {
    const getAllProducts = async () => {
      const productFromDB: Product[] = await getProducts();
      setProducts(productFromDB);
    };

    getAllProducts();
  }, []);
  return (
    <div className="w-full p-6">
      <div className="grid grid-cols-12 gap-6">
        <select
          name="select1"
          className="bg-[#808080] text-black font-bold rounded-full w-fit px-1"
        >
          <option value="option1">Price</option>
          <option value="option2">Low to High</option>
          <option value="option3">High to Low</option>
        </select>

        {/* <Listbox value={selectedPrice} onChange={setSelectedPrice}>
          <Listbox.Button>{selectedPerson.name}</Listbox.Button>
          <Listbox.Options>
            {people.map((person) => (
              <Listbox.Option
                key={person.id}
                value={person}
                disabled={person.unavailable}
              >
                {person.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox> */}

        {/* <select
          name="select2"
          className="bg-[#808080] text-black font-bold rounded-full w-13"
        >
          <option value="optionA">Rating</option>
          <option value="optionB">Highest</option>
          <option value="optionC">Lowest</option>
        </select> */}

        <select
          name="select3"
          className="bg-[#808080] text-black font-bold rounded-full w-[112px] px-1"
        >
          <option value="choiceX">Material</option>
          <option value="choiceY">Silk</option>
          <option value="choiceZ">Cotton</option>
        </select>

        <select
          name="select4"
          className="bg-[#808080] text-black font-bold rounded-full w-[112px] px-1"
        >
          <option value="rightOption">Sort By</option>
          <option value="anotherRightOption">Price</option>
        </select>
      </div>

      <section className="px-5 py-5">
        <h2 className="text-3xl">Products for you!</h2>
        <div className="grid grid-cols-4 gap-4">
          {location.pathname === '/products' && products != undefined
            ? products.map((p: any) => <ProductCard product={p} />)
            : products != undefined &&
              products
                .filter(
                  (product: any) => product.category === params.id
                )
                .map((p: any) => <ProductCard product={p} />)}
        </div>
      </section>
    </div>
  );
};

export default Products;
