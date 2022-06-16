import React from 'react';
import Carousel from './Carousel';

const Banner = () => {
  return (
    <div className="bg-bannerImg">
      <div className="h-80 d-flex pt-3 items-center justify-center flex-col container mx-auto ">
        <h1 className="font-bold text-white text-2xl mt-20 text-center sm:text-5xl">
          ROLEX CRYPTO
        </h1>
        <h2 className="text-gray-300 text-xl mt-5 font-serif text-center sm:text-lg">
          Get All The Info Regarding Your Favorite Crypto Currency
        </h2>
      </div>
      <Carousel />
    </div>
  );
}

export default Banner