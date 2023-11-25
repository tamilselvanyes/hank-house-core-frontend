import React from 'react';
import Flickity from 'react-flickity-component';

// import '../styles.css';
import 'flickity/css/flickity.css';

function Carousel() {
  return (
    <Flickity>
      <img src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80" className='w-32'/>
      <img src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80" />
    </Flickity>
  );
}

function Test() {
  return (
    <div className="h-fit w-full">
      <h1>React Flickity</h1>
      <Carousel />
    </div>
  );
}

export default Test;
