import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProductCard from '../../Components/ProductCard';
import {
  Products as ProductsItems,
  IProductsTypes,
} from '../../constant';

const Products = () => {
  const [selectedPrice, setSelectedPrice] = useState();
  const [products, setProducts] = useState();
  const params = useParams();
  const location = useLocation();
  if (params !== undefined) {
    console.log('params check---', params, location);
    const categoryId = params.id;
  }
  useEffect(() => {
    // get the products according to the category here
    // console.log('get the products according to the category')
  }, []);
  return (
    <div className="w-full p-6">
      {/* <div className="mt-2 p-4 hero-img h-96 flex justify-end"> */}
      {/* <img src={heroPoster} alt="Hero poster" /> */}
      {/* <div className="pt-12 pr-10">
          <p className=" text-4xl  text-[#245114] pb-6">
            Wear your favourite dress <br /> for your favourite
            Occasion{' '}
          </p>
          <button className="bg-[#245114] hover:bg-[#228706] text-white font-bold py-2 px-4 rounded-full w-40">
            Buy Now
          </button>
        </div> */}
      {/* </div> */}

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
          {location.pathname === '/products'
            ? ProductsItems.map((p) => (
                <ProductCard
                  key={p.productTitle}
                  productTitle={p.productTitle}
                  productDesc={p.productDesc}
                  productImg={p.productImg}
                  productPrice={p.productPrice}
                />
              ))
            : ProductsItems.filter(
                (product: IProductsTypes) =>
                  product.productCategoryId === params.id
              ).map((p) => (
                <ProductCard
                  key={p.productTitle}
                  productTitle={p.productTitle}
                  productDesc={p.productDesc}
                  productImg={p.productImg}
                  productPrice={p.productPrice}
                />
              ))}
        </div>
      </section>
    </div>
  );
};

export default Products;
