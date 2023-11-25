import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar';
import heroPoster from '../../assets/images/hero-img2.png';
// import categoryMen from '../../assets/images/category-men.png';
// import categoryWomen from '../../assets/images/category-women.png';
// import categoryKid from '../../assets/images/category-kid.jpeg';
import CategoryCard from '../../Components/CategoryCard';
import { Categories } from '../../constant/index';
import { useNavigate } from 'react-router-dom';
import ReviewSection from '../../Components/ReviewSection';
import { Product } from '../Products/Model';
import { getProducts } from '../../utils/helpers';
import ProductCard from '../../Components/ProductCard';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>();
  useEffect(() => {
    const getAllProducts = async () => {
      const productFromDB: Product[] = await getProducts();
      setProducts(productFromDB);
    };

    getAllProducts();
  }, []);
  return (
    <div className="w-full">
      <div className="mt-2  p-4 hero-img h-96 flex justify-end">
        {/* <img src={heroPoster} alt="Hero poster" /> */}
        <div className="pr-10">
          <p className=" text-4xl  text-[#245114] pb-6">
            Wear your favourite dress <br /> for your favourite
            Occasion{' '}
          </p>
          <button
            className="bg-[#245114] hover:bg-[#228706] text-white font-bold py-2 px-4 rounded-full w-40"
            onClick={() => {
              navigate('/products');
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
      <section className="px-5">
        <h2 className="text-3xl">Shop our top categories</h2>
        <div className="flex gap-5">
          {Categories.map((category: any) => (
            <CategoryCard
              categoryId={category.categoryId}
              categoryName={category.categoryName}
              categoryImg={category.categoryImg}
            />
          ))}
        </div>
      </section>
      <section className="px-5 mt-3">
        <h2
          className="text-3xl"
          onClick={() => {
            navigate('/products/Men');
          }}
        >
          Shop trending for Men
        </h2>
        <div className="flex gap-5 overflow-hidden">
          {products != undefined &&
            products
              .filter((product: any) => product.category === 'Men')
              .map(
                (p: any, index) =>
                  index < 5 && <ProductCard product={p} />
              )}
        </div>
      </section>
      <section className="px-5 mt-3">
        <h2
          className="text-3xl"
          onClick={() => {
            navigate('/products/Women');
          }}
        >
          Shop trending for Women
        </h2>
        <div className="flex gap-5 overflow-hidden">
          {products != undefined &&
            products
              .filter((product: any) => product.category === 'Women')
              .map(
                (p: any, index) =>
                  index < 5 && <ProductCard product={p} />
              )}
        </div>
      </section>
      <section className="px-5">
        <ReviewSection />
      </section>
    </div>
  );
};

export default Home;
