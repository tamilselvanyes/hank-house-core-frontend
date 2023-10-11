import React from 'react';
import NavBar from '../../Components/NavBar';
import  heroPoster  from '../../assets/images/hero-img.png';

const Home = () => {
  return (
    <div className="w-full">
      <NavBar />
      <div className='mt-2 p-4'>
        <img src={heroPoster} alt="Hero poster" />
      </div>
    </div>
  );
};

export default Home;
