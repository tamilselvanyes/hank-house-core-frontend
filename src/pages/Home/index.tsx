import React from 'react';
import NavBar from '../../Components/NavBar';
import heroPoster from '../../assets/images/hero-img2.png';
import categoryMen from '../../assets/images/category-men.png'
import categoryWomen from '../../assets/images/category-women.png'
import categoryKid from '../../assets/images/category-kid.jpeg'
import CategoryCard from '../../Components/CategoryCard';

const Home = () => {
  return (
    <div className="w-full">
      <NavBar />
      <div className="mt-2 p-4 hero-img h-96 flex justify-end">
        {/* <img src={heroPoster} alt="Hero poster" /> */}
        <div className="pt-12 pr-10">
          <p className=" text-4xl  text-[#245114] pb-6">
            Wear your favourite dress <br /> for your favourite
            Occasion{' '}
          </p>
          <button className="bg-[#245114] hover:bg-[#228706] text-white font-bold py-2 px-4 rounded-full w-40">
            Buy Now
          </button>
        </div>
      </div>
      <section className="px-5">
        <h2 className="text-3xl">Shop our top categories</h2>
        <div className="flex gap-5">
          <CategoryCard
            categoryName="Men"
            categoryImg={categoryMen}
          />
           <CategoryCard
            categoryName="Women"
            categoryImg={categoryWomen}
          />
           <CategoryCard
            categoryName="Kids"
            categoryImg={categoryKid}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
