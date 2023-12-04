import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import {
  Products as ProductsItems,
  IProductsTypes,
} from '../../constant';
import { getProducts } from '../../utils/helpers';
import { Product } from './Model';
import { useDispatch, useSelector } from 'react-redux';
import { useAppContainerSlice } from '../AppContainer/slice';
import { selectAppContainerState } from '../AppContainer/slice/selector';

const Products = () => {
  // const [selectedPrice, setSelectedPrice] = useState();
  const [sortedProducts, setSortedProducts] = useState<any>();
  const [selectedSort, setSelectedSort] = useState(false);
  const params = useParams();
  const location = useLocation();
  const disptach = useDispatch();
  const { appContainerActions } = useAppContainerSlice();

  const appContainerStates = useSelector(selectAppContainerState);

  const { productList } = appContainerStates;

  // console.log('product list in products page', productList);

  function handleSort(e: any) {
    const sortType = e.target.value;

    if (sortType === 'lowtohigh') {
      setSortedProducts(
        [...sortedProducts].sort((a, b) => {
          console.log('a,b in sort', a, b);
          const priceA = a.variants[0].price;
          const priceB = b.variants[0].price;
          return priceA - priceB;
        })
      );
    } else if (sortType === 'hightolow') {
      setSortedProducts(
        [...sortedProducts].sort((a, b) => {
          const priceA = a.variants[0].price;
          const priceB = b.variants[0].price;
          return priceB - priceA;
        })
      );
    }
  }

  useEffect(() => {
    setSortedProducts(productList);
  }, [productList]);
  console.log('sorted products', sortedProducts);
  return (
    <div className="w-full p-6">
      <div className="grid grid-cols-12 gap-6">
        <select
          name="select1"
          className="bg-[#808080] text-black font-bold rounded-md w-fit px-1"
          onChange={(e) => {
            setSelectedSort(true);
            handleSort(e);
          }}
        >
          <option value="option1">Price</option>
          <option value="lowtohigh">Low to High</option>
          <option value="hightolow">High to Low</option>
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
        {/* 
        <select
          name="select3"
          className="bg-[#808080] text-black font-bold rounded-full w-[112px] px-1"
        >
          <option value="choiceX">Material</option>
          <option value="choiceY">Silk</option>
          <option value="choiceZ">Cotton</option>
        </select> */}

        {/* <select
          name="select4"
          className="bg-[#808080] text-black font-bold rounded-full w-[112px] px-1"
        >
          <option value="rightOption">Sort By</option>
          <option value="anotherRightOption">Price</option>
        </select> */}
      </div>

      <section className="px-5 py-5">
        <h2 className="text-3xl">Products for you!</h2>
        {selectedSort ? (
          <div className="grid grid-cols-4 gap-4">
            {sortedProducts.map((p: any) => (
              <ProductCard product={p} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {location.pathname === '/products' &&
            productList != undefined
              ? productList.map((p: any) => (
                  <ProductCard product={p} />
                ))
              : productList != undefined &&
                productList
                  .filter(
                    (product: any) => product.category === params.id
                  )
                  .map((p: any) => <ProductCard product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
